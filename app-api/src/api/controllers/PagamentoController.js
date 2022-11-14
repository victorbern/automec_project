const { json } = require("body-parser");
const qs = require("qs");
const AppError = require("../errors/AppError");
const OrdemServicoController = require("./OrdemServicoController");
const PagamentoServiceDAO = require("../services/PagamentoServiceDAO");
const OrdemServicoServiceDAO = require("../services/OrdemServicoServiceDAO");
const VeiculoServiceDAO = require("../services/VeiculoServiceDAO");
const ProdutoServiceDAO = require("../services/ProdutoServiceDAO");
const ClienteServiceDAO = require("../services/ClienteServiceDAO");
const VendaDiretaServiceDAO = require("../services/VendaDiretaServiceDAO");

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };

        // Busca todos os pagamentos cadastrados no banco de dados
        let pagamentos = await new PagamentoServiceDAO(req.connection)
            .buscarTodos()
            .catch((error) => {
                throw new AppError(error, 400);
            });

        // Caso nenhum pagamento seja encontrado, exibe como resultado um aviso dizendo isso
        if (!pagamentos) {
            json.result[0] =
                "Não foram encontrados pagamentos com estes parâmetros";
            res.json(json);
            return;
        }

        // Paga cada pagamento encontrado, pegaremos seus dados específicos e adicionaremos ao json
        for (let i in pagamentos) {
            // Cria uma variável para armazenar os dados de cada pagamento, para facilitar a inserção no json
            let pagamento;

            // Define os parâmetros de cada pagamento
            pagamento = {
                idPagamento: pagamentos[i].idPagamento,
                subtotal: pagamentos[i].subtotal,
                total: pagamentos[i].total,
                formaPagamento: pagamentos[i].formaPagamento,
                desconto: pagamentos[i].desconto,
                dataHora: pagamentos[i].dataHora,
                vendaDireta: [],
                ordensServico: [],
            };

            // Busca no banco os dados referentes à tabela de DetalhePagamento referente a cada pagamento
            let detalhePagamento = await new PagamentoServiceDAO(req.connection)
                .buscarDetalhePagamento(pagamentos[i].idPagamento)
                .catch((error) => {
                    throw new AppError(error, 500);
                });

            if (detalhePagamento) {
                // Cada pagamento pode ter 0 ou várias instâncias de DetalhePagamento, pois cada uma representa uma ordem de serviço diferente
                for (let j in detalhePagamento) {
                    // Como cada pagamento pode ter 0 ou várias ordens de serviço associadas, criamos uma variável para organizar os dados de cada OS
                    let ordemServico = null;
                    // Buscamos no banco de dados os valores referentes à ordem de serviço associada a cada pagamento
                    ordemServico = await new OrdemServicoServiceDAO(
                        req.connection
                    )
                        .buscarPorId(detalhePagamento[j].idOrdemServico)
                        .catch((error) => {
                            throw new AppError(error, 500);
                        });
                    if (ordemServico) {
                        let detalheOS = await new OrdemServicoServiceDAO(
                            req.connection
                        )
                            .buscarOSDetalhes(ordemServico.idOrdemServico)
                            .catch((error) => {
                                throw new AppError(error, 500);
                            });
                        // Buscamos no banco de dados os valores referentes ao cliente desta ordem de serviço especificada
                        let cliente = await new ClienteServiceDAO(
                            req.connection
                        ).buscarPorId(ordemServico.idCliente);
                        // Buscamos no banco de dados os valores referentes ao veículo desta ordem de serviço especificada
                        let veiculo = await new VeiculoServiceDAO(
                            req.connection
                        ).buscaEspecificaPlaca(ordemServico.placaVeiculo);
                        // Estou exibindo todos os dados de cliente e de veículo, porque caso um deles seja nulo,
                        //  eu exibir apenas um atributo (como cliente.nomeCliente) vai quebrar o backend
                        pagamento.ordensServico.push({
                            idOrdemServico: ordemServico.idOrdemServico,
                            total: ordemServico.total,
                            dataOS: detalheOS.dataOS,
                            km: ordemServico.km,
                            cliente: cliente,
                            veiculo: veiculo,
                        });
                    }
                }
            }
            // Busca todas as vendas diretas que possuam aquele pagamento associado
            let vendaDireta = await new VendaDiretaServiceDAO(
                req.connection
            ).buscarPorPagamento(pagamentos[i].idPagamento);
            let vendas;

            if (vendaDireta) {
                vendas = await new VendaDiretaServiceDAO(
                    req.connection
                ).buscarVendasPorVendaDireta(vendaDireta.idVendaDireta);
            }
            let jsonVendas = [];
            for (let i in vendas) {
                let produto = await new ProdutoServiceDAO(req.connection)
                    .buscaEspecificaCodigoBarras(vendas[i].codigoBarras)
                    .catch((error) => {
                        throw new AppError(error, 500);
                    });
                jsonVendas.push({
                    codigoBarras: vendas[i].codigoBarras,
                    descricao: produto.descricao,
                    quantidadeVendida: vendas[i].quantidadeVendida,
                    precoTotal: vendas[i].precoTotal,
                    precoUnitario: vendas[i].precoUnitario,
                });
            }
            pagamento.vendaDireta = jsonVendas;

            // Adiciona o pagamento recem salvo em 'pagamento' no json.result
            json.result.push(pagamento);
        }

        res.json(json);
    },

    buscarPorId: async (req, res) => {
        let json = { error: "", result: {} };
        let idPagamento = req.params.id;

        if (!idPagamento) {
            throw new AppError("Campos não enviados", 400);
        }

        let pagamento = await new PagamentoServiceDAO(req.connection)
            .buscarPorId(idPagamento)
            .catch((error) => {
                throw new AppError(error, 500);
            });

        if (!pagamento) {
            json.result = "Pagamento não encontrado para o id especificado";
            res.json(json);
            return;
        }
        json.result = {
            idPagamento: pagamento.idPagamento,
            subtotal: pagamento.subtotal,
            total: pagamento.total,
            formaPagamento: pagamento.formaPagamento,
            desconto: pagamento.desconto,
            dataHora: pagamento.dataHora,
            vendaDireta: [],
            ordensServico: [],
        };

        let detalhePagamento = await new PagamentoServiceDAO(req.connection)
            .buscarDetalhePagamento(idPagamento)
            .catch((error) => {
                json.error = error;
            });
        if (detalhePagamento) {
            for (let i in detalhePagamento) {
                let ordemServico = await new OrdemServicoServiceDAO(
                    req.connection
                )
                    .buscarPorId(detalhePagamento[i].idOrdemServico)
                    .catch((error) => {
                        throw new AppError(error, 500);
                    });
                if (ordemServico) {
                    let detalheOS = await new OrdemServicoServiceDAO(
                        req.connection
                    )
                        .buscarOSDetalhes(ordemServico.idOrdemServico)
                        .catch((error) => {
                            throw new AppError(error, 500);
                        });
                    let cliente = await new ClienteServiceDAO(
                        req.connection
                    ).buscarPorId(ordemServico.idCliente);
                    let veiculo = await new VeiculoServiceDAO(
                        req.connection
                    ).buscaEspecificaPlaca(ordemServico.placaVeiculo);
                    // Estou exibindo todos os dados de cliente e de veículo, porque caso um deles seja nulo,
                    //  eu exibir apenas um atributo (como cliente.nomeCliente) vai quebrar o backend
                    json.result.ordensServico.push({
                        idOrdemServico: ordemServico.idOrdemServico,
                        total: ordemServico.total,
                        dataOS: detalheOS.dataOS,
                        km: ordemServico.km,
                        cliente: cliente,
                        veiculo: veiculo,
                    });
                }
            }
        }
        // Busca todas as vendas diretas que possuam aquele pagamento associado
        let vendaDireta = await new VendaDiretaServiceDAO(
            req.connection
        ).buscarPorPagamento(idPagamento);
        let vendas;
        if (vendaDireta) {
            vendas = await new VendaDiretaServiceDAO(
                req.connection
            ).buscarVendasPorVendaDireta(vendaDireta.idVendaDireta);
        }
        let jsonVendas = [];
        for (let i in vendas) {
            let produto = await new ProdutoServiceDAO(req.connection)
                .buscaEspecificaCodigoBarras(vendas[i].codigoBarras)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            jsonVendas.push({
                codigoBarras: vendas[i].codigoBarras,
                descricao: produto.descricao,
                quantidadeVendida: vendas[i].quantidadeVendida,
                precoTotal: vendas[i].precoTotal,
                precoUnitario: vendas[i].precoUnitario,
            });
        }
        json.result.vendaDireta = jsonVendas;
        res.json(json);
    },

    buscaPorValor: async (req, res) => {
        let json = { error: "", result: [] };
        let valor = req.params.valor;

        let pagamentos = await new PagamentoServiceDAO(req.connection)
            .buscarPorValor(valor)
            .catch((error) => {
                throw new AppError(error, 500);
            });

        if (!pagamentos) {
            res.json(json);
            return;
        }
        for (let i in pagamentos) {
            // Cria uma variável para armazenar os dados de cada pagamento, para facilitar a inserção no json
            let pagamento;

            // Define os parâmetros de cada pagamento
            pagamento = {
                idPagamento: pagamentos[i].idPagamento,
                subtotal: pagamentos[i].subtotal,
                total: pagamentos[i].total,
                formaPagamento: pagamentos[i].formaPagamento,
                desconto: pagamentos[i].desconto,
                dataHora: pagamentos[i].dataHora,
                vendaDireta: [],
                ordensServico: [],
            };

            // Busca no banco os dados referentes à tabela de DetalhePagamento referente a cada pagamento
            let detalhePagamento = await new PagamentoServiceDAO(req.connection)
                .buscarDetalhePagamento(pagamentos[i].idPagamento)
                .catch((error) => {
                    throw new AppError(error, 500);
                });

            if (detalhePagamento) {
                // Cada pagamento pode ter 0 ou várias instâncias de DetalhePagamento, pois cada uma representa uma ordem de serviço diferente
                for (let j in detalhePagamento) {
                    // Como cada pagamento pode ter 0 ou várias ordens de serviço associadas, criamos uma variável para organizar os dados de cada OS
                    let ordemServico = null;
                    // Buscamos no banco de dados os valores referentes à ordem de serviço associada a cada pagamento
                    ordemServico = await new OrdemServicoServiceDAO(
                        req.connection
                    )
                        .buscarPorId(detalhePagamento[j].idOrdemServico)
                        .catch((error) => {
                            throw new AppError(error, 500);
                        });
                    if (ordemServico) {
                        let detalheOS = await new OrdemServicoServiceDAO(
                            req.connection
                        )
                            .buscarOSDetalhes(ordemServico.idOrdemServico)
                            .catch((error) => {
                                throw new AppError(error, 500);
                            });
                        // Buscamos no banco de dados os valores referentes ao cliente desta ordem de serviço especificada
                        let cliente = await new ClienteServiceDAO(
                            req.connection
                        ).buscarPorId(ordemServico.idCliente);
                        // Buscamos no banco de dados os valores referentes ao veículo desta ordem de serviço especificada
                        let veiculo = await new VeiculoServiceDAO(
                            req.connection
                        ).buscaEspecificaPlaca(ordemServico.placaVeiculo);
                        // Estou exibindo todos os dados de cliente e de veículo, porque caso um deles seja nulo,
                        //  eu exibir apenas um atributo (como cliente.nomeCliente) vai quebrar o backend
                        pagamento.ordensServico.push({
                            idOrdemServico: ordemServico.idOrdemServico,
                            total: ordemServico.total,
                            dataOS: detalheOS.dataOS,
                            km: ordemServico.km,
                            cliente: cliente,
                            veiculo: veiculo,
                        });
                    }
                }
            }
            // Busca todas as vendas diretas que possuam aquele pagamento associado
            let vendaDireta = await new VendaDiretaServiceDAO(
                req.connection
            ).buscarPorPagamento(pagamentos[i].idPagamento);
            let vendas;

            if (vendaDireta) {
                vendas = await new VendaDiretaServiceDAO(
                    req.connection
                ).buscarVendasPorVendaDireta(vendaDireta.idVendaDireta);
            }
            let jsonVendas = [];
            for (let i in vendas) {
                let produto = await new ProdutoServiceDAO(req.connection)
                    .buscaEspecificaCodigoBarras(vendas[i].codigoBarras)
                    .catch((error) => {
                        throw new AppError(error, 500);
                    });
                jsonVendas.push({
                    codigoBarras: vendas[i].codigoBarras,
                    descricao: produto.descricao,
                    quantidadeVendida: vendas[i].quantidadeVendida,
                    precoTotal: vendas[i].precoTotal,
                    precoUnitario: vendas[i].precoUnitario,
                });
            }
            pagamento.vendaDireta = jsonVendas;

            // Adiciona o pagamento recem salvo em 'pagamento' no json.result
            json.result.push(pagamento);
        }
        res.json(json);
    },

    inserirPagamento: async (req, res) => {
        let json = { error: "", result: {} };

        let valores = req.body;
        valores = qs.parse(valores);

        let subtotal = valores.subtotal;
        let total = valores.total;
        let formaPagamento = valores.formaPagamento;
        let desconto = valores.desconto;

        let ordensServico = valores.ordensServico;
        let vendaDireta = valores.vendaDireta;
        for (let i in ordensServico) {
            if (
                !(await new OrdemServicoServiceDAO(req.connection).isPaga(
                    ordensServico[i].idOrdemServico
                ))
            ) {
                throw new AppError(
                    "Você está tentando pagar uma ordem de serviço já paga",
                    400
                );
            }
        }
        if (!desconto) {
            desconto = 0;
        }
        if (subtotal && total && formaPagamento) {
            let IdPagamento = await new PagamentoServiceDAO(req.connection)
                .inserirPagamento(subtotal, total, formaPagamento, desconto)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            if (ordensServico) {
                for (let i in ordensServico) {
                    // Atribuir o valor isPaga = true na ordem de serviço vendida
                    await new OrdemServicoServiceDAO(req.connection)
                        .alterarStatus(ordensServico[i].idOrdemServico, true)
                        .catch((error) => {
                            throw new AppError(error, 500);
                        });
                    // Alterar estoque dos produtos vendidos pela OS
                    let osDetalhes = await new OrdemServicoServiceDAO(
                        req.connection
                    )
                        .buscarOSDetalhes(ordensServico[i].idOrdemServico)
                        .catch((error) => {
                            throw new AppError(error, 500);
                        });
                    let vendas = await new OrdemServicoServiceDAO(
                        req.connection
                    )
                        .buscarVendaPorOSDetalhes(osDetalhes.idOSDetalhes)
                        .catch((error) => {
                            throw new AppError(error, 500);
                        });
                    for (let j in vendas) {
                        await new ProdutoServiceDAO(req.connection)
                            .alterarEstoque(
                                vendas[j].codigoBarras,
                                vendas[j].quantidadeVendida * -1
                            )
                            .catch((error) => {
                                throw new AppError(error, 500);
                            });
                    }
                    // Fim da remoção dos produtos vendidos do estoque
                    // Fim da atribuição do valor isPaga = false da ordem de serviço que foi cancelada
                    await new PagamentoServiceDAO(req.connection)
                        .inserirDetalhePagamento(
                            ordensServico[i].idOrdemServico,
                            IdPagamento
                        )
                        .catch((error) => {
                            throw new AppError(error, 500);
                        });
                }
            }
            if (vendaDireta) {
                let IdVendaDireta = await new VendaDiretaServiceDAO(
                    req.connection
                )
                    .inserirVendaDireta(IdPagamento, vendaDireta.total)
                    .catch((error) => {
                        throw new AppError(error, 500);
                    });
                let produtos = vendaDireta.produtos;
                if (produtos) {
                    for (let i in produtos) {
                        await new VendaDiretaServiceDAO(req.connection)
                            .inserirProduto_has_VendaDireta(
                                IdVendaDireta,
                                produtos[i].codigoBarras,
                                produtos[i].quantidadeVendida,
                                produtos[i].precoTotal,
                                produtos[i].precoUnitario
                            )
                            .catch((error) => {
                                throw new AppError(error, 500);
                            });
                    }
                }
            }
            json.result = { idPagamento: IdPagamento };
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    // alterarPagamento: async (req, res) => {
    //     let json = { error: "", result: {} };

    //     let valores = req.body;
    //     valores = qs.parse(valores);

    //     let idPagamento = req.params.id;
    //     let subtotal = valores.subtotal;
    //     let total = valores.total;
    //     let formaPagamento = valores.formaPagamento;
    //     let desconto = valores.desconto;
    //     let ordensServico = valores.ordensServico;
    //     let vendasDiretas = valores.vendasDiretas;

    //     if (subtotal && total && formaPagamento) {
    //         await new PagamentoServiceDAO(req.connection).alterarPagamento(
    //             idPagamento,
    //             subtotal,
    //             total,
    //             desconto,
    //             formaPagamento
    //         ).catch((error) => {
    //             throw new AppError(error, 500);
    //         });
    //         let detalhePagamento =
    //             await new PagamentoServiceDAO(req.connection).buscarDetalhePagamento(
    //                 idPagamento
    //             ).catch((error) => {
    //                 throw new AppError(error, 500);
    //             });
    //         for (let i in detalhePagamento) {
    //         }
    //     } else {
    //         throw new AppError("Campos não enviados", 400);
    //     }

    //     res.json(json);
    // },

    excluirPagamento: async (req, res) => {
        let json = { error: "", result: {} };

        let idPagamento = req.params.id;

        if (idPagamento) {
            let detalhePagamento = await new PagamentoServiceDAO(req.connection)
                .buscarDetalhePagamento(idPagamento)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            for (let i in detalhePagamento) {
                // Atribuição do valor isPaga = false para ordem de serviço do pagamento cancelado e devolução dos produtos ao estoque
                await new OrdemServicoServiceDAO(connection)
                    .alterarStatus(detalhePagamento[i].idOrdemServico, false)
                    .catch((error) => {
                        throw new AppError(error, 500);
                    });
                // Alterar estoque dos produtos vendidos pela OS
                let osDetalhes = await new OrdemServicoServiceDAO(connection)
                    .buscarOSDetalhes(detalhePagamento[i].idOrdemServico)
                    .catch((error) => {
                        throw new AppError(error, 500);
                    });
                let vendas = await new OrdemServicoServiceDAO(connection)
                    .buscarVendaPorOSDetalhes(osDetalhes.idOSDetalhes)
                    .catch((error) => {
                        throw new AppError(error, 500);
                    });
                for (let j in vendas) {
                    await new ProdutoServiceDAO(connection)
                        .alterarEstoque(
                            vendas[j].codigoBarras,
                            vendas[j].quantidadeVendida
                        )
                        .catch((error) => {
                            throw new AppError(error, 500);
                        });
                }
                // Fim da alteração no estoque dos produtos vendidos
                // Fim da atribuição do valor isPaga = false da ordem de serviço que foi cancelada
                await new PagamentoServiceDAO(req.connection)
                    .excluirDetalhePagamento(
                        idPagamento,
                        detalhePagamento[i].idOrdemServico
                    )
                    .catch((error) => {
                        throw new AppError(error, 500);
                    });
            }
            let vendaDireta = await new VendaDiretaServiceDAO(
                req.connection
            ).buscarPorPagamento(idPagamento);

            console.log();

            if (vendaDireta) {
                // Percorre todas as vendas de venda direta para excluir Produto_has_VendaDireta uma por uma
                let vendas = await new VendaDiretaServiceDAO(req.connection)
                    .buscarVendasPorVendaDireta(vendaDireta.idVendaDireta)
                    .catch((error) => {
                        throw new AppError(error, 500);
                    });
                for (let i in vendas) {
                    await new VendaDiretaServiceDAO(req.connection)
                        .excluirProdutoVendaDireta(
                            vendaDireta.idVendaDireta,
                            vendas[i].codigoBarras
                        )
                        .catch((error) => {
                            throw new AppError(error, 500);
                        });
                    await new ProdutoServiceDAO(req.connection)
                        .alterarEstoque(
                            vendas[i].codigoBarras,
                            vendas[i].quantidadeVendida
                        )
                        .catch((error) => {
                            throw new AppError(error, 500);
                        });
                }
                await new VendaDiretaServiceDAO(req.connection)
                    .excluirVendaDireta(vendaDireta.idVendaDireta)
                    .catch((error) => {
                        throw new AppError(error, 500);
                    });
            }
            await new PagamentoServiceDAO(req.connection)
                .excluirPagamento(idPagamento)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            json.result = "Pagamento excluido com sucesso!";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },
};

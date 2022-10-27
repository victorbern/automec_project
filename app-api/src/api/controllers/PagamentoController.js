const { json } = require("body-parser");
const ClienteService = require("../services/ClienteService");
const OrdemServicoService = require("../services/OrdemServicoService");
const PagamentoService = require("../services/PagamentoService");
const VeiculoService = require("../services/VeiculoService");
const VendaDiretaService = require("../services/VendaDiretaService");
const qs = require("qs");
const AppError = require("../errors/AppError");
const ProdutoService = require("../services/ProdutoService");
const OrdemServicoController = require("./OrdemServicoController");

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };

        // Busca todos os pagamentos cadastrados no banco de dados
        let pagamentos = await PagamentoService.buscarTodos().catch((error) => {
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
            let detalhePagamento =
                await PagamentoService.buscarDetalhePagamento(
                    pagamentos[i].idPagamento
                ).catch((error) => {
                    throw new AppError(error, 500);
                });

            if (detalhePagamento) {
                // Cada pagamento pode ter 0 ou várias instâncias de DetalhePagamento, pois cada uma representa uma ordem de serviço diferente
                for (let j in detalhePagamento) {
                    // Como cada pagamento pode ter 0 ou várias ordens de serviço associadas, criamos uma variável para organizar os dados de cada OS
                    let ordemServico = null;
                    // Buscamos no banco de dados os valores referentes à ordem de serviço associada a cada pagamento
                    ordemServico = await OrdemServicoService.buscarPorId(
                        detalhePagamento[j].idOrdemServico
                    ).catch((error) => {
                        throw new AppError(error, 500);
                    });
                    if (ordemServico) {
                        // Buscamos no banco de dados os valores referentes ao cliente desta ordem de serviço especificada
                        let cliente = await ClienteService.buscarPorId(
                            ordemServico.idCliente
                        );
                        // Buscamos no banco de dados os valores referentes ao veículo desta ordem de serviço especificada
                        let veiculo = await VeiculoService.buscaEspecificaPlaca(
                            ordemServico.placaVeiculo
                        );
                        // Estou exibindo todos os dados de cliente e de veículo, porque caso um deles seja nulo,
                        //  eu exibir apenas um atributo (como cliente.nomeCliente) vai quebrar o backend
                        pagamento.ordensServico.push({
                            idOrdemServico: ordemServico.idOrdemServico,
                            total: ordemServico.total,
                            km: ordemServico.km,
                            cliente: cliente,
                            veiculo: veiculo,
                        });
                    }
                }
            }
            // Busca todas as vendas diretas que possuam aquele pagamento associado
            let vendaDireta = await VendaDiretaService.buscarPorPagamento(
                pagamentos[i].idPagamento
            );
            let vendas;

            if (vendaDireta) {
                vendas = await VendaDiretaService.buscarVendasPorVendaDireta(
                    vendaDireta.idVendaDireta
                );
            }
            let jsonVendas = [];
            for (let i in vendas) {
                let produto = await ProdutoService.buscaEspecificaCodigoBarras(
                    vendas[i].codigoBarras
                ).catch((error) => {
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

        let pagamento = await PagamentoService.buscarPorId(idPagamento).catch(
            (error) => {
                throw new AppError(error, 500);
            }
        );

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

        let detalhePagamento = await PagamentoService.buscarDetalhePagamento(
            idPagamento
        ).catch((error) => {
            json.error = error;
        });
        if (detalhePagamento) {
            for (let i in detalhePagamento) {
                let ordemServico = await OrdemServicoService.buscarPorId(
                    detalhePagamento[i].idOrdemServico
                ).catch((error) => {
                    throw new AppError(error, 500);
                });
                if (ordemServico) {
                    let cliente = await ClienteService.buscarPorId(
                        ordemServico.idCliente
                    );
                    let veiculo = await VeiculoService.buscaEspecificaPlaca(
                        ordemServico.placaVeiculo
                    );
                    // Estou exibindo todos os dados de cliente e de veículo, porque caso um deles seja nulo,
                    //  eu exibir apenas um atributo (como cliente.nomeCliente) vai quebrar o backend
                    json.result.ordensServico = {
                        idOrdemServico: ordemServico.idOrdemServico,
                        total: ordemServico.total,
                        km: ordemServico.km,
                        cliente: cliente,
                        veiculo: veiculo,
                    };
                }
            }
        }
        // Busca todas as vendas diretas que possuam aquele pagamento associado
        let vendaDireta = await VendaDiretaService.buscarPorPagamento(
            idPagamento
        );
        let vendas;
        if (vendaDireta) {
            vendas = await VendaDiretaService.buscarVendasPorVendaDireta(
                vendaDireta.idVendaDireta
            );
        }
        let jsonVendas = [];
        for (let i in vendas) {
            let produto = await ProdutoService.buscaEspecificaCodigoBarras(
                vendas[i].codigoBarras
            ).catch((error) => {
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
                !(await OrdemServicoService.isPaga(
                    ordensServico[i].idOrdemServico
                ))
            ) {
                throw new AppError(
                    "Você está tentando pagar uma ordem de serviço já paga",
                    400
                );
            }
        }
        if (subtotal && total && formaPagamento) {
            let IdPagamento = await PagamentoService.inserirPagamento(
                subtotal,
                total,
                formaPagamento,
                desconto
            ).catch((error) => {
                throw new AppError(error, 500);
            });
            if (ordensServico) {
                for (let i in ordensServico) {
                    await OrdemServicoController.fecharOrdemServicoPaga(
                        ordensServico[i].idOrdemServico
                    );
                    await PagamentoService.inserirDetalhePagamento(
                        ordensServico[i].idOrdemServico,
                        IdPagamento
                    ).catch((error) => {
                        throw new AppError(error, 500);
                    });
                }
            }
            if (vendaDireta) {
                let IdVendaDireta = await VendaDiretaService.inserirVendaDireta(
                    IdPagamento,
                    vendaDireta.total
                ).catch((error) => {
                    throw new AppError(error, 500);
                });
                let produtos = vendaDireta.produtos;
                if (produtos) {
                    for (let i in produtos) {
                        await VendaDiretaService.inserirProduto_has_VendaDireta(
                            IdVendaDireta,
                            produtos[i].codigoBarras,
                            produtos[i].quantidadeVendida,
                            produtos[i].precoTotal,
                            produtos[i].precoUnitario
                        ).catch((error) => {
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
    //         await PagamentoService.alterarPagamento(
    //             idPagamento,
    //             subtotal,
    //             total,
    //             desconto,
    //             formaPagamento
    //         ).catch((error) => {
    //             throw new AppError(error, 500);
    //         });
    //         let detalhePagamento =
    //             await PagamentoService.buscarDetalhePagamento(
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
            let detalhePagamento =
                await PagamentoService.buscarDetalhePagamento(
                    idPagamento
                ).catch((error) => {
                    throw new AppError(error, 500);
                });
            for (let i in detalhePagamento) {
                await OrdemServicoController.abrirOrdemServicoPaga(
                    detalhePagamento[i].idOrdemServico
                );
                await PagamentoService.excluirDetalhePagamento(
                    idPagamento,
                    detalhePagamento[i].idOrdemServico
                ).catch((error) => {
                    throw new AppError(error, 500);
                });
            }
            let vendaDireta = await VendaDiretaService.buscarPorPagamento(
                idPagamento
            );

            console.log();

            if (vendaDireta) {
                // Percorre todas as vendas de venda direta para excluir Produto_has_VendaDireta uma por uma
                let vendas =
                    await VendaDiretaService.buscarVendasPorVendaDireta(
                        vendaDireta.idVendaDireta
                    ).catch((error) => {
                        throw new AppError(error, 500);
                    });
                for (let i in vendas) {
                    await VendaDiretaService.excluirProdutoVendaDireta(
                        vendaDireta.idVendaDireta,
                        vendas[i].codigoBarras
                    ).catch((error) => {
                        throw new AppError(error, 500);
                    });
                    await ProdutoService.alterarEstoque(
                        vendas[i].codigoBarras,
                        vendas[i].quantidadeVendida
                    ).catch((error) => {
                        throw new AppError(error, 500);
                    });
                }
                await VendaDiretaService.excluirVendaDireta(
                    vendaDireta.idVendaDireta
                ).catch((error) => {
                    throw new AppError(error, 500);
                });
            }
            await PagamentoService.excluirPagamento(idPagamento).catch(
                (error) => {
                    throw new AppError(error, 500);
                }
            );
            json.result = "Pagamento excluido com sucesso!";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },
};

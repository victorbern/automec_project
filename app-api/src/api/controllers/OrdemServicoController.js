const { json } = require("body-parser");
const ClienteService = require("../services/ClienteService");
const OrdemServicoService = require("../services/OrdemServicoService");
const qs = require("qs");
const ProdutoService = require("../services/ProdutoService");
const VeiculoService = require("../services/VeiculoService");
const FuncionarioService = require("../services/FuncionarioService");
const ServicoService = require("../services/ServicoService");

module.exports = {
    // Busca todas as ordens de serviço no banco de dados
    buscarTodos: async (req, res) => {
        // Cria o json que será devolvido no response
        let json = { error: "", result: [] };

        // Busca todas as ordens de serviços cadastradas no banco de dados
        let ordens = await OrdemServicoService.buscarTodos().catch((error) => {
            json.error = error;
        });

        // Se existir alguma ordem de serviço cadastrada, entra no if. Senão, devolve um json vazio.
        if (!ordens) {
            json.result[0] = "Não foram encontradas nenhuma ordem de serviço";
        }
        // Percorre cada ordm de serviço cadastrada no banco
        for (let i in ordens) {
            // Para cada ordem de serviço cadastrada, busca todos os dados do cliente e salva na variável 'cliente'
            let cliente = await ClienteService.buscarPorId(
                ordens[i].idCliente
            ).catch((error) => {
                json.result = "";
                json.error = error;
            });
            // Para cada ordem de serviço cadastrada, busca todos os dados do veiculo e salva na variável 'veiculo'
            let veiculo = await VeiculoService.buscaEspecificaPlaca(
                ordens[i].placaVeiculo
            ).catch((error) => {
                json.result = "";
                json.error = error;
            });
            // Busca os dados da tabela OSDetalhes para cada ordem de serviço
            let osDetalhes = await OrdemServicoService.buscarOSDetalhes(
                ordens[i].idOrdemServico
            ).catch((error) => {
                json.result = "";
                json.error = error;
            });
            let vendas, executaFuncao;
            if (osDetalhes) {
                // Busca de todas as instancias de Produto_has_OSDetalhes salvas no banco, ou seja, todas as vendas de produtos desta ordem de serviço e salva em 'vendas'
                vendas = await OrdemServicoService.buscarVendaPorOSDetalhes(
                    osDetalhes.idOSDetalhes
                );
                // Busca de todas as instancias de ExecutaFuncao salvas no banco, ou seja, todos os serviços executados desta ordem de servico e salva em 'executaFuncao'
                executaFuncao =
                    await OrdemServicoService.buscarExecutaFuncaoGeral(
                        osDetalhes.idOSDetalhes
                    );
            }
            // instancia uma variavel para armazenar os dados de cada produto em um json
            let produtos = [];
            if (vendas) {
                for (let i in vendas) {
                    // Para cada venda cadastrada, busca todos os dados de produto e salva na variável 'produto'
                    let produto = await ProdutoService.buscarPorId(
                        vendas[i].idProduto
                    );
                    produtos.push({
                        idProduto: vendas[i].idProduto,
                        codigoBarras: produto.codigoBarras,
                        descricao: produto.descricao,
                        quantidadeVendida: vendas[i].quantidadeVendida,
                        precoTotal: vendas[i].precoTotal,
                    });
                }
            }

            // instancia uma variável para armazenas os dados de cada servico executado em um json
            let servicos = [];
            if (executaFuncao) {
                for (let i in executaFuncao) {
                    // Para cada execução de servico cadastrada, busca todos os dados de servico e salva na variável 'servico'
                    let servico = await ServicoService.buscarPorId(
                        executaFuncao[i].idServico
                    );
                    // Para cada execução de servico cadastrada, busca todos os dados de funcionário e salva na variável 'funcionário'
                    let funcionario = await FuncionarioService.buscarPorId(
                        executaFuncao[i].idFuncionario
                    );
                    servicos.push({
                        idServico: executaFuncao[i].idServico,
                        descricaoServico: servico.descricaoServico,
                        precoServico: servico.precoServico,
                        observacao: executaFuncao[i].observacao,
                        idFuncionario: funcionario.idFuncionario,
                        nomeFuncionario: funcionario.nomeFuncionario,
                    });
                }
            }
            json.result.push({
                idOrdemServico: ordens[i].idOrdemServico,
                total: ordens[i].total,
                km: ordens[i].km,
                isFinalizada: ordens[i].isFinalizada,
                isPaga: ordens[i].isPaga,
                cliente: cliente,
                veiculo: veiculo,
                data: osDetalhes.dataOS,
                produtos: produtos,
                servicos: servicos,
            });
        }
        res.json(json);
    },

    // Busca uma ordem de serviço com base no seu id
    buscarPorId: async (req, res) => {
        // Cria o json que será devolvido no response
        let json = { error: "", result: [] };

        // Salva na variável 'idOrdemServico' o id recebido na request
        let idOrdemServico = req.params.id;

        if (!idOrdemServico) {
            json.error = "Campo id faltante";
        }
        // Busca a ordem de serviço que possui aquele id e salva na variável 'ordem'
        let ordem = await OrdemServicoService.buscarPorId(idOrdemServico);

        if (!ordem) {
            json.result.push(
                "Ordem de serviço não encontrada para o id especificado"
            );
            res.json(json);
            return;
        }
        // Busca todos os dados do cliente desta ordem
        let cliente = await ClienteService.buscarPorId(ordem.idCliente);

        // Busca todos os dados do veiculo desta ordem
        let veiculo = await VeiculoService.buscaEspecificaPlaca(
            ordem.placaVeiculo
        );
        let osDetalhes = await OrdemServicoService.buscarOSDetalhes(
            ordem.idOrdemServico
        );
        let vendas, executaFuncao;
        if (osDetalhes) {
            vendas = await OrdemServicoService.buscarVendaPorOSDetalhes(
                osDetalhes.idOSDetalhes
            );
            executaFuncao = await OrdemServicoService.buscarExecutaFuncaoGeral(
                osDetalhes.idOSDetalhes
            );
        }
        let produtos = [];
        if (vendas) {
            for (let i in vendas) {
                let produto = await ProdutoService.buscarPorId(
                    vendas[i].idProduto
                );
                produtos.push({
                    idProduto: vendas[i].idProduto,
                    codigoBarras: produto.codigoBarras,
                    descricao: produto.descricao,
                    quantidadeVendida: vendas[i].quantidadeVendida,
                    precoTotal: produto.precoTotal,
                });
            }
        }

        let servicos = [];
        if (executaFuncao) {
            for (let i in executaFuncao) {
                let servico = await ServicoService.buscarPorId(
                    executaFuncao[i].idServico
                );
                let funcionario = await FuncionarioService.buscarPorId(
                    executaFuncao[i].idFuncionario
                );
                servicos.push({
                    idServico: executaFuncao[i].idServico,
                    descricaoServico: servico.descricaoServico,
                    precoServico: servico.precoServico,
                    observacao: executaFuncao[i].observacao,
                    idFuncionario: funcionario.idFuncionario,
                    nomeFuncionario: funcionario.nomeFuncionario,
                });
            }
        }
        json.result.push({
            idOrdemServico: ordem.idOrdemServico,
            total: ordem.total,
            km: ordem.km,
            isFinalizada: ordem.isFinalizada,
            isPaga: ordem.isPaga,
            cliente: cliente,
            veiculo: veiculo,
            data: osDetalhes.dataOS,
            produtos: produtos,
            servicos: servicos,
        });

        res.json(json);
    },

    // Busca as ordens de serviço com base no seu id, no seu cliente (nome) e/ou no seu veiculo (placa)
    buscaPorValor: async (req, res) => {
        // Cria o json que será devolvido no respone
        let json = { error: "", result: [] };
        let valor = req.params.valor;

        let clientes = await ClienteService.buscarPorNomeCliente(valor);
        let veiculos = await VeiculoService.buscarPorPlaca(valor);
        let ordens = [];

        // Adicionar verificação para ver se valor é numérico
        ordem = await OrdemServicoService.buscarPorId(valor);
        if (ordem) {
            ordens.push(ordem);
        }
        for (let i in clientes) {
            ordem = await OrdemServicoService.buscaPorIdCliente(
                clientes[i].idCliente
            );
            if (ordem) {
                ordens.push(ordem);
            }
        }
        for (let i in veiculos) {
            ordem = await OrdemServicoService.buscaPorPlacaVeiculo(
                veiculos[i].placaVeiculo
            );
            if (ordem) {
                ordens.push(ordem);
            }
        }
        // json = this.adicionarOSJson(json, ordens);
        // Remove objetos duplicados
        ordens = ordens.filter(function (a) {
            return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        }, Object.create(null));
        for (let i in ordens) {
            let cliente = await ClienteService.buscarPorId(ordens[i].idCliente);
            let veiculo = await VeiculoService.buscaEspecificaPlaca(
                ordens[i].placaVeiculo
            );
            let osDetalhes = await OrdemServicoService.buscarOSDetalhes(
                ordens[i].idOrdemServico
            );
            let vendas, executaFuncao;
            if (osDetalhes) {
                vendas = await OrdemServicoService.buscarVendaPorOSDetalhes(
                    osDetalhes.idOSDetalhes
                );
                executaFuncao =
                    await OrdemServicoService.buscarExecutaFuncaoGeral(
                        osDetalhes.idOSDetalhes
                    );
            }

            let produtos = [];
            if (vendas) {
                for (let i in vendas) {
                    let produto = await ProdutoService.buscarPorId(
                        vendas[i].idProduto
                    );
                    produtos.push({
                        idProduto: vendas[i].idProduto,
                        codigoBarras: produto.codigoBarras,
                        descricao: produto.descricao,
                        quantidadeVendida: vendas[i].quantidadeVendida,
                        precoTotal: vendas[i].precoTotal,
                    });
                }
            }
            let servicos = [];
            if (executaFuncao) {
                for (let i in executaFuncao) {
                    let servico = await ServicoService.buscarPorId(
                        executaFuncao[i].idServico
                    );
                    let funcionario = await FuncionarioService.buscarPorId(
                        executaFuncao[i].idFuncionario
                    );
                    servicos.push({
                        idServico: executaFuncao[i].idServico,
                        descricaoServico: servico.descricaoServico,
                        precoServico: servico.precoServico,
                        observacao: executaFuncao[i].observacao,
                        idFuncionario: funcionario.idFuncionario,
                        nomeFuncionario: funcionario.nomeFuncionario,
                    });
                }
            }
            json.result.push({
                idOrdemServico: ordens[i].idOrdemServico,
                total: ordens[i].total,
                km: ordens[i].km,
                isFinalizada: ordens[i].isFinalizada,
                isPaga: ordens[i].isPaga,
                cliente: cliente,
                veiculo: veiculo,
                data: osDetalhes.dataOS,
                produtos: produtos,
                servicos: servicos,
            });
        }

        res.json(json);
    },

    inserirOrdemServico: async (req, res) => {
        // Cria o json que será devolvido no response
        let json = { error: "", result: "" };

        let valores = req.body;
        valores = qs.parse(valores);

        let idCliente = valores.idCliente;
        let placaVeiculo = valores.placaVeiculo;
        let total = valores.total;
        let km = valores.km;

        if (idCliente && placaVeiculo) {
            let idOrdemServico = await OrdemServicoService.inserirOrdemServico(
                idCliente,
                placaVeiculo,
                total,
                km
            ).catch((error) => {
                json.error = error;
            });
            if (idOrdemServico) {
                let idOSDetalhes = await OrdemServicoService.inserirOSDetalhes(
                    idOrdemServico
                );
                if (valores.produtos) {
                    for (let i in valores.produtos) {
                        let idProduto = valores.produtos[i].idProduto * 1;
                        let quantidadeVendida =
                            valores.produtos[i].quantidadeVendida * 1;
                        let precoTotal = valores.produtos[i].precoTotal * 1;
                        await OrdemServicoService.inserirProdutoHasOSDetalhes(
                            idProduto,
                            idOSDetalhes,
                            quantidadeVendida,
                            precoTotal
                        ).catch((error) => {
                            json.error = error;
                        });
                        await ProdutoService.alterarEstoque(
                            idProduto,
                            quantidadeVendida * -1
                        ).catch((error) => {
                            json.error = error;
                        });
                    }
                }
                if (valores.servicos) {
                    for (let i in valores.servicos) {
                        let idServico = valores.servicos[i].idServico;
                        let idFuncionario = valores.servicos[i].idFuncionario;
                        let observacao = valores.servicos[i].observacao;
                        await OrdemServicoService.inserirExecutaFuncao(
                            idServico,
                            idFuncionario,
                            observacao,
                            idOSDetalhes
                        ).catch((error) => {
                            json.error = error;
                        });
                    }
                }
            }
            json.result = "Dados enviados";
        } else {
            json.error = "Campos não enviados";
        }
        res.json(json);
    },

    alterarOrdemServico: async (req, res) => {
        // Cria o json que será devolvido no response
        let json = { error: "", result: {} };

        let valores = req.body;
        valores = qs.parse(valores);

        let idOrdemServico = req.params.id;
        let idCliente = valores.idCliente;
        let placaVeiculo = valores.placaVeiculo;
        let total = valores.total;
        let km = valores.km;
        let produtos = valores.produtos;
        let servicos = valores.servicos;

        if (idOrdemServico && idCliente && placaVeiculo) {
            await OrdemServicoService.alterarOrdemServico(
                idOrdemServico,
                idCliente,
                placaVeiculo,
                total,
                km
            ).catch((error) => {
                json.error = error;
            }); // Altera os dados da ordem de serviço
            let osDetalhes = await OrdemServicoService.buscarOSDetalhes(
                idOrdemServico
            );

            if (osDetalhes) {
                // Verificar se houve alterações em Produto_has_OSDetalhes
                let vendas = await OrdemServicoService.buscarVendaPorOSDetalhes(
                    osDetalhes.idOSDetalhes
                );
                let produtosCadastrados = [];
                if (vendas) {
                    for (let i in vendas) {
                        produtosCadastrados.push({
                            idProduto: vendas[i].idProduto,
                            quantidadeVendida: vendas[i].quantidadeVendida,
                            precoTotal: vendas[i].precoTotal,
                        });
                    }
                    if (
                        qs.stringify(produtos) !==
                        qs.stringify(produtosCadastrados)
                    ) {
                        for (let i in produtosCadastrados) {
                            let produtoExiste = false;
                            for (let j in produtos) {
                                if (
                                    produtosCadastrados[i].idProduto ==
                                    produtos[j].idProduto
                                ) {
                                    produtoExiste = true;
                                }
                            }
                            if (!produtoExiste) {
                                await OrdemServicoService.excluirProdutoOSDetalhes(
                                    osDetalhes.idOSDetalhes,
                                    produtosCadastrados[i].idProduto
                                );
                            }
                        }
                        for (let i in produtos) {
                            let venda =
                                await OrdemServicoService.buscarProdutoOSDetalhes(
                                    osDetalhes.idOSDetalhes,
                                    produtos[i].idProduto
                                );
                            if (!venda) {
                                await OrdemServicoService.inserirProdutoHasOSDetalhes(
                                    produtos[i].idProduto,
                                    osDetalhes.idOSDetalhes,
                                    produtos[i].quantidadeVendida,
                                    produtos[i].precoTotal
                                );
                                break;
                            }
                            if (
                                venda.quantidadeVendida !==
                                    produtos[i].quantidadeVendida ||
                                venda.precoTotal !== produtos[i].precoTotal
                            ) {
                                await OrdemServicoService.alterarProdutoOSDetalhes(
                                    osDetalhes.idOSDetalhes,
                                    produtos[i].idProduto,
                                    produtos[i].quantidadeVendida,
                                    produtos[i].precoTotal
                                );
                            }
                        }
                    }
                }
                let executaFuncao =
                    await OrdemServicoService.buscarExecutaFuncaoGeral(
                        osDetalhes.idOSDetalhes
                    );

                if (executaFuncao) {
                    let servicosCadastrados = [];
                    for (let i in executaFuncao) {
                        servicosCadastrados.push({
                            idServico: executaFuncao[i].idServico,
                            idFuncionario: executaFuncao[i].idFuncionario,
                            observacao: executaFuncao[i].observacao,
                        });
                    }
                    if (
                        qs.stringify(servicosCadastrados) !==
                        qs.stringify(servicos)
                    ) {
                        for (let i in servicosCadastrados) {
                            let servicoExiste = false;
                            for (let j in servicos) {
                                if (
                                    servicosCadastrados[i].idServico ==
                                        servicos[j].idServico &&
                                    servicosCadastrados[i].idFuncionario ==
                                        servicos[j].idFuncionario
                                ) {
                                    servicoExiste = true;
                                }
                            }
                            if (!servicoExiste) {
                                await OrdemServicoService.excluirExecutaFuncao(
                                    osDetalhes.idOSDetalhes,
                                    servicosCadastrados[i].idServico,
                                    servicosCadastrados[i].idFuncionario
                                );
                            }
                        }
                        for (let i in servicos) {
                            let execucao =
                                await OrdemServicoService.buscarExecutaFuncaoEspecifica(
                                    osDetalhes.idOSDetalhes,
                                    servicos[i].idServico
                                );
                            if (!execucao) {
                                await OrdemServicoService.inserirExecutaFuncao(
                                    servicos[i].idServico,
                                    servicos[i].idFuncionario,
                                    servicos[i].observacao,
                                    osDetalhes.idOSDetalhes
                                );
                                break;
                            }
                            if (execucao.observacao != servicos[i].observacao) {
                                await OrdemServicoService.alterarExecutaFuncao(
                                    servicos[i].idServico,
                                    servicos[i].idFuncionario,
                                    servicos[i].observacao,
                                    osDetalhes.idOSDetalhes
                                );
                            }
                        }
                    }
                }
            }
            json.result = "Dados enviados";
        } else {
            json.error = "Dados não enviados";
        }

        res.json(json);
    },

    excluirOrdemServico: async (req, res) => {
        let json = { error: "", result: {} };

        let idOrdemServico = req.params.id;
        if (idOrdemServico) {
            let osDetalhes = await OrdemServicoService.buscarOSDetalhes(
                idOrdemServico
            );

            if (osDetalhes) {
                let vendas = await OrdemServicoService.buscarVendaPorOSDetalhes(
                    osDetalhes.idOSDetalhes
                );
                if (vendas) {
                    for (let i in vendas) {
                        await OrdemServicoService.excluirProdutoOSDetalhes(
                            osDetalhes.idOSDetalhes,
                            vendas[i].idProduto
                        );
                    }
                }
                let executaFuncao =
                    await OrdemServicoService.buscarExecutaFuncaoGeral(
                        osDetalhes.idOSDetalhes
                    );
                if (executaFuncao) {
                    for (let i in executaFuncao) {
                        await OrdemServicoService.excluirExecutaFuncao(
                            osDetalhes.idOSDetalhes,
                            executaFuncao[i].idServico,
                            executaFuncao[i].idFuncionario
                        );
                    }
                }
                await OrdemServicoService.excluirOSDetalhes(
                    osDetalhes.idOSDetalhes
                ).catch((error) => {
                    json.error = error;
                });
            }

            await OrdemServicoService.excluirOrdemServico(idOrdemServico);

            json.result = "Campos enviados";
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },
};

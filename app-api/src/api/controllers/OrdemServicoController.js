const { json } = require("body-parser");
const ClienteServiceDAO = require("../services/ClienteServiceDAO");
const qs = require("qs");
const AppError = require("../errors/AppError");
const OrdemServicoServiceDAO = require("../services/OrdemServicoServiceDAO");
const ProdutoServiceDAO = require("../services/ProdutoServiceDAO");
const FuncionarioServiceDAO = require("../services/FuncionarioServiceDAO");
const ServicoServiceDAO = require("../services/ServicoServiceDAO");
const VeiculoServiceDAO = require("../services/VeiculoServiceDAO");

module.exports = {
    // Busca todas as ordens de serviço no banco de dados
    buscarTodos: async (req, res) => {
        // Cria o json que será devolvido no response
        let json = { error: "", result: [] };

        // Busca todas as ordens de serviços cadastradas no banco de dados
        let ordens = await new OrdemServicoServiceDAO(req.connection)
            .buscarTodos()
            .catch((error) => {
                throw new AppError(error, 500);
            });

        // Se existir alguma ordem de serviço cadastrada, entra no if. Senão, devolve um json vazio.
        if (!ordens) {
            json.result[0] = "Não foram encontradas nenhuma ordem de serviço";
        }
        // Percorre cada ordm de serviço cadastrada no banco
        for (let i in ordens) {
            // Para cada ordem de serviço cadastrada, busca todos os dados do cliente e salva na variável 'cliente'
            let cliente = await new ClienteServiceDAO(req.connection)
                .buscarPorId(ordens[i].idCliente)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            // Para cada ordem de serviço cadastrada, busca todos os dados do veiculo e salva na variável 'veiculo'
            let veiculo = await new VeiculoServiceDAO(req.connection)
                .buscaEspecificaPlaca(ordens[i].placaVeiculo)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            // Busca os dados da tabela OSDetalhes para cada ordem de serviço
            let osDetalhes = await new OrdemServicoServiceDAO(req.connection)
                .buscarOSDetalhes(ordens[i].idOrdemServico)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            let vendas, executaFuncao;
            if (osDetalhes) {
                // Busca de todas as instancias de Produto_has_OSDetalhes salvas no banco, ou seja, todas as vendas de produtos desta ordem de serviço e salva em 'vendas'
                vendas = await new OrdemServicoServiceDAO(
                    req.connection
                ).buscarVendaPorOSDetalhes(osDetalhes.idOSDetalhes);
                // Busca de todas as instancias de ExecutaFuncao salvas no banco, ou seja, todos os serviços executados desta ordem de servico e salva em 'executaFuncao'
                executaFuncao = await new OrdemServicoServiceDAO(
                    req.connection
                ).buscarExecutaFuncaoGeral(osDetalhes.idOSDetalhes);
            }
            // instancia uma variavel para armazenar os dados de cada produto em um json
            let produtos = [];
            if (vendas) {
                for (let i in vendas) {
                    // Para cada venda cadastrada, busca todos os dados de produto e salva na variável 'produto'
                    let produto = await new ProdutoServiceDAO(
                        req.connection
                    ).buscaEspecificaCodigoBarras(vendas[i].codigoBarras);
                    produtos.push({
                        codigoBarras: produto.codigoBarras,
                        descricao: produto.descricao,
                        quantidadeVendida: vendas[i].quantidadeVendida,
                        precoUnitario: vendas[i].precoUnitario,
                        precoTotal: vendas[i].precoTotal,
                    });
                }
            }

            // instancia uma variável para armazenas os dados de cada servico executado em um json
            let servicos = [];
            if (executaFuncao) {
                for (let i in executaFuncao) {
                    // Para cada execução de servico cadastrada, busca todos os dados de servico e salva na variável 'servico'
                    let servico = await new ServicoServiceDAO(
                        req.connection
                    ).buscarPorId(executaFuncao[i].idServico);
                    // Para cada execução de servico cadastrada, busca todos os dados de funcionário e salva na variável 'funcionário'
                    let funcionario = await new FuncionarioServiceDAO(
                        req.connection
                    ).buscarPorId(executaFuncao[i].idFuncionario);
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
            throw new AppError("Campo id faltante", 400);
        }
        // Busca a ordem de serviço que possui aquele id e salva na variável 'ordem'
        let ordem = await new OrdemServicoServiceDAO(
            req.connection
        ).buscarPorId(idOrdemServico);

        if (!ordem) {
            json.result.push(
                "Ordem de serviço não encontrada para o id especificado"
            );
            res.json(json);
            return;
        }
        // Busca todos os dados do cliente desta ordem
        let cliente = await new ClienteServiceDAO(req.connection).buscarPorId(
            ordem.idCliente
        );

        // Busca todos os dados do veiculo desta ordem
        let veiculo = await new VeiculoServiceDAO(
            req.connection
        ).buscaEspecificaPlaca(ordem.placaVeiculo);
        let osDetalhes = await new OrdemServicoServiceDAO(
            req.connection
        ).buscarOSDetalhes(ordem.idOrdemServico);
        let vendas, executaFuncao;
        if (osDetalhes) {
            vendas = await new OrdemServicoServiceDAO(
                req.connection
            ).buscarVendaPorOSDetalhes(osDetalhes.idOSDetalhes);
            executaFuncao = await new OrdemServicoServiceDAO(
                req.connection
            ).buscarExecutaFuncaoGeral(osDetalhes.idOSDetalhes);
        }
        let produtos = [];
        if (vendas) {
            for (let i in vendas) {
                let produto = await new ProdutoServiceDAO(
                    req.connection
                ).buscaEspecificaCodigoBarras(vendas[i].codigoBarras);
                produtos.push({
                    codigoBarras: produto.codigoBarras,
                    descricao: produto.descricao,
                    quantidadeVendida: vendas[i].quantidadeVendida,
                    precoUnitario: vendas[i].precoUnitario,
                    precoTotal: vendas[i].precoTotal,
                });
            }
        }

        let servicos = [];
        if (executaFuncao) {
            for (let i in executaFuncao) {
                let servico = await new ServicoServiceDAO(
                    req.connection
                ).buscarPorId(executaFuncao[i].idServico);
                let funcionario = await new FuncionarioServiceDAO(
                    req.connection
                ).buscarPorId(executaFuncao[i].idFuncionario);
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

        let clientes = await new ClienteServiceDAO(
            req.connection
        ).buscarPorNomeCliente(valor);
        let veiculos = await new VeiculoServiceDAO(
            req.connection
        ).buscaPorValor(valor);
        let ordens = [];

        // Adicionar verificação para ver se valor é numérico
        ordem = await new OrdemServicoServiceDAO(req.connection).buscarPorId(
            valor
        );
        if (ordem) {
            if (
                !(await new OrdemServicoServiceDAO(req.connection).isPaga(
                    ordem.idOrdemServico
                ))
            ) {
                ordens.push(ordem);
            }
        }
        for (let i in clientes) {
            ordem = await new OrdemServicoServiceDAO(
                req.connection
            ).buscaPorIdCliente(clientes[i].idCliente);
            if (ordem) {
                for (let j in ordem) {
                    ordens.push(ordem[j]);
                }
            }
        }
        for (let i in veiculos) {
            ordem = await new OrdemServicoServiceDAO(
                req.connection
            ).buscaPorPlacaVeiculo(veiculos[i].placaVeiculo);
            if (ordem) {
                // A função de buscaPorPlacaVeiculo busca vários veículos e não um só
                for (let j in ordem) {
                    ordens.push(ordem[j]);
                }
            }
        }
        // json = this.adicionarOSJson(json, ordens);
        // Remove objetos duplicados
        ordens = ordens.filter(function (a) {
            return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        }, Object.create(null));
        for (let i in ordens) {
            let cliente = await new ClienteServiceDAO(
                req.connection
            ).buscarPorId(ordens[i].idCliente);
            let veiculo = await new VeiculoServiceDAO(
                req.connection
            ).buscaEspecificaPlaca(ordens[i].placaVeiculo);
            let osDetalhes = await new OrdemServicoServiceDAO(
                req.connection
            ).buscarOSDetalhes(ordens[i].idOrdemServico);
            let vendas, executaFuncao;
            if (osDetalhes) {
                vendas = await new OrdemServicoServiceDAO(
                    req.connection
                ).buscarVendaPorOSDetalhes(osDetalhes.idOSDetalhes);
                executaFuncao = await new OrdemServicoServiceDAO(
                    req.connection
                ).buscarExecutaFuncaoGeral(osDetalhes.idOSDetalhes);
            }

            let produtos = [];
            if (vendas) {
                for (let i in vendas) {
                    let produto = await new ProdutoServiceDAO(
                        req.connection
                    ).buscaEspecificaCodigoBarras(vendas[i].codigoBarras);
                    produtos.push({
                        codigoBarras: produto.codigoBarras,
                        descricao: produto.descricao,
                        quantidadeVendida: vendas[i].quantidadeVendida,
                        precoUnitario: vendas[i].precoUnitario,
                        precoTotal: vendas[i].precoTotal,
                    });
                }
            }
            let servicos = [];
            if (executaFuncao) {
                for (let i in executaFuncao) {
                    let servico = await new ServicoServiceDAO(
                        req.connection
                    ).buscarPorId(executaFuncao[i].idServico);
                    let funcionario = await new FuncionarioServiceDAO(
                        req.connection
                    ).buscarPorId(executaFuncao[i].idFuncionario);
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

    fecharOrdemServicoPaga: async (connection, idOrdemServico) => {
        await new OrdemServicoServiceDAO(connection)
            .alterarStatus(idOrdemServico, true)
            .catch((error) => {
                throw new AppError(error, 500);
            });
        // Alterar estoque dos produtos vendidos pela OS
        let osDetalhes = await new OrdemServicoServiceDAO(connection)
            .buscarOSDetalhes(idOrdemServico)
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
                    vendas[j].quantidadeVendida * -1
                )
                .catch((error) => {
                    throw new AppError(error, 500);
                });
        }
        // Fim da alteração no estoque dos produtos vendidos
    },

    abrirOrdemServicoPaga: async (connection, idOrdemServico) => {
        await new OrdemServicoServiceDAO(connection)
            .alterarStatus(idOrdemServico, false)
            .catch((error) => {
                throw new AppError(error, 500);
            });
        // Alterar estoque dos produtos vendidos pela OS
        let osDetalhes = await new OrdemServicoServiceDAO(connection)
            .buscarOSDetalhes(idOrdemServico)
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

        // Verificar se todos os valores de produtos estão certos
        if (valores.produtos) {
            for (let i in valores.produtos) {
                let codigoBarras = valores.produtos[i].codigoBarras;
                let quantidadeVendida =
                    valores.produtos[i].quantidadeVendida * 1;
                let precoTotal = valores.produtos[i].precoTotal * 1;
                let precoUnitario = valores.produtos[i].precoUnitario * 1;

                if (
                    !codigoBarras ||
                    !quantidadeVendida ||
                    !precoTotal ||
                    !precoUnitario
                ) {
                    throw new AppError(
                        "Um dos campos em produtos na posição " +
                            i +
                            " é nulo.",
                        400
                    );
                }

                let produto = await new ProdutoServiceDAO(
                    req.connection
                ).buscaEspecificaCodigoBarras(codigoBarras);

                if (!produto) {
                    throw new AppError(
                        "O código de barras para o produto especificado não existe!",
                        400
                    );
                }
            }
        }

        // Verificar se todos os valores de produtos estão certos

        if (valores.servicos) {
            for (let i in valores.servicos) {
                let idServico = valores.servicos[i].idServico;
                let idFuncionario = valores.servicos[i].idFuncionario;
                if (!idServico || !idFuncionario) {
                    throw new AppError(
                        "Um dos campos em serviços na posição " +
                            i +
                            " é nulo.",
                        400
                    );
                }

                let servico = await new ServicoServiceDAO(
                    req.connection
                ).buscarPorId(idServico);

                let funcionario = await new FuncionarioServiceDAO(
                    req.connection
                ).buscarPorId(idFuncionario);

                if (!servico) {
                    throw new AppError(
                        "O id para o serviço especificado não existe!",
                        400
                    );
                }

                if (!funcionario) {
                    throw new AppError(
                        "O id para o funcionário especificado não existe!",
                        400
                    );
                }
            }
        }

        if (!idCliente) {
            throw new AppError("O campo id do cliente não pode ser nulo", 400);
        }
        if (!placaVeiculo) {
            throw new AppError(
                "O campo placa do veículo não pode ser nulo",
                400
            );
        }

        if (idCliente && placaVeiculo) {
            let idOrdemServico = await new OrdemServicoServiceDAO(
                req.connection
            )
                .inserirOrdemServico(idCliente, placaVeiculo, total, km)
                .catch((error) => {
                    throw new AppError(
                        "Erro ao inserir uma nova ordem de serviço: " + error,
                        500
                    );
                });
            if (idOrdemServico) {
                let idOSDetalhes = await new OrdemServicoServiceDAO(
                    req.connection
                ).inserirOSDetalhes(idOrdemServico);
                if (valores.produtos) {
                    for (let i in valores.produtos) {
                        let codigoBarras = valores.produtos[i].codigoBarras;
                        let quantidadeVendida =
                            valores.produtos[i].quantidadeVendida * 1;
                        let precoTotal = valores.produtos[i].precoTotal * 1;
                        let precoUnitario =
                            valores.produtos[i].precoUnitario * 1;
                        await new OrdemServicoServiceDAO(req.connection)
                            .inserirProdutoHasOSDetalhes(
                                codigoBarras,
                                idOSDetalhes,
                                quantidadeVendida,
                                precoTotal,
                                precoUnitario
                            )
                            .catch((error) => {
                                console.log(
                                    "O produto na posição " +
                                        i +
                                        " não foi inserido." +
                                        error
                                );
                            });
                    }
                }
                if (valores.servicos) {
                    for (let i in valores.servicos) {
                        let idServico = valores.servicos[i].idServico;
                        let idFuncionario = valores.servicos[i].idFuncionario;
                        let observacao = valores.servicos[i].observacao;
                        await new OrdemServicoServiceDAO(req.connection)
                            .inserirExecutaFuncao(
                                idServico,
                                idFuncionario,
                                observacao,
                                idOSDetalhes
                            )
                            .catch((error) => {
                                console.log(
                                    "O serviço não foi inserido na posição " +
                                        i +
                                        " não foi inserido." +
                                        error
                                );
                            });
                    }
                }
            }
            json.result = "Dados enviados";
        } else {
            throw new AppError("Campos não enviados", 400);
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
        // Verificar se todos os valores de produtos estão certos
        // console.log(servicos);
        if (produtos) {
            for (let i in produtos) {
                let codigoBarras = produtos[i].codigoBarras;
                let quantidadeVendida = produtos[i].quantidadeVendida * 1;
                let precoTotal = produtos[i].precoTotal * 1;
                let precoUnitario = produtos[i].precoUnitario * 1;

                if (
                    !codigoBarras ||
                    !quantidadeVendida ||
                    !precoTotal ||
                    !precoUnitario
                ) {
                    console.log(codigoBarras);
                    console.log(quantidadeVendida);
                    console.log(precoTotal);
                    console.log(precoUnitario);
                    throw new AppError(
                        "Um dos campos em produtos na posição " +
                            i +
                            " é nulo.",
                        400
                    );
                }

                let produto = await new ProdutoServiceDAO(
                    req.connection
                ).buscaEspecificaCodigoBarras(codigoBarras);

                if (!produto) {
                    throw new AppError(
                        "O código de barras para o produto especificado não existe!",
                        400
                    );
                }
            }
        }

        // Verificar se todos os valores de produtos estão certos

        if (servicos) {
            for (let i in servicos) {
                let idServico = servicos[i].idServico;
                let idFuncionario = servicos[i].idFuncionario;
                if (!idServico || !idFuncionario) {
                    throw new AppError(
                        "Um dos campos em serviços na posição " +
                            i +
                            " é nulo.",
                        400
                    );
                }

                let servico = await new ServicoServiceDAO(
                    req.connection
                ).buscarPorId(idServico);

                let funcionario = await new FuncionarioServiceDAO(
                    req.connection
                ).buscarPorId(idFuncionario);

                if (!servico) {
                    throw new AppError(
                        "O id para o serviço especificado não existe!",
                        400
                    );
                }

                if (!funcionario) {
                    throw new AppError(
                        "O id para o funcionário especificado não existe!",
                        400
                    );
                }
            }
        }

        if (!idOrdemServico) {
            throw new AppError(
                "O campo idOrdemServico não pode ser nulo!",
                400
            );
        }
        if (!idCliente) {
            throw new AppError("O campo idCliente não pode ser nulo!", 400);
        }
        if (!placaVeiculo) {
            throw new AppError("O campo placaVeiculo não pode ser nulo!", 400);
        }

        if (idOrdemServico && idCliente && placaVeiculo) {
            await new OrdemServicoServiceDAO(req.connection)
                .alterarOrdemServico(
                    idOrdemServico,
                    idCliente,
                    placaVeiculo,
                    total,
                    km
                )
                .catch((error) => {
                    throw new AppError(error, 500);
                }); // Altera os dados da ordem de serviço
            let osDetalhes = await new OrdemServicoServiceDAO(
                req.connection
            ).buscarOSDetalhes(idOrdemServico);

            if (osDetalhes) {
                // Verificar se houve alterações em Produto_has_OSDetalhes
                let vendas = await new OrdemServicoServiceDAO(
                    req.connection
                ).buscarVendaPorOSDetalhes(osDetalhes.idOSDetalhes);
                // console.log(vendas);
                let produtosCadastrados = [];
                if (vendas) {
                    for (let i in vendas) {
                        produtosCadastrados.push({
                            codigoBarras: vendas[i].codigoBarras,
                            quantidadeVendida: vendas[i].quantidadeVendida,
                            precoUnitario: vendas[i].precoUnitario,
                            precoTotal: vendas[i].precoTotal,
                        });
                    }
                }
                if (
                    qs.stringify(produtos) !== qs.stringify(produtosCadastrados)
                ) {
                    for (let i in produtosCadastrados) {
                        let produtoExiste = false;
                        for (let j in produtos) {
                            if (
                                produtosCadastrados[i].codigoBarras ==
                                produtos[j].codigoBarras
                            ) {
                                produtoExiste = true;
                            }
                        }
                        if (!produtoExiste) {
                            await new OrdemServicoServiceDAO(
                                req.connection
                            ).excluirProdutoOSDetalhes(
                                osDetalhes.idOSDetalhes,
                                produtosCadastrados[i].codigoBarras
                            );
                        }
                    }
                    for (let i in produtos) {
                        let venda = await new OrdemServicoServiceDAO(
                            req.connection
                        ).buscarProdutoOSDetalhes(
                            osDetalhes.idOSDetalhes,
                            produtos[i].codigoBarras
                        );
                        if (!venda) {
                            await new OrdemServicoServiceDAO(
                                req.connection
                            ).inserirProdutoHasOSDetalhes(
                                produtos[i].codigoBarras,
                                osDetalhes.idOSDetalhes,
                                produtos[i].quantidadeVendida,
                                produtos[i].precoTotal,
                                produtos[i].precoUnitario
                            );
                        }
                        if (
                            venda.quantidadeVendida !==
                                produtos[i].quantidadeVendida ||
                            venda.precoTotal !== produtos[i].precoTotal
                        ) {
                            await new OrdemServicoServiceDAO(
                                req.connection
                            ).alterarProdutoOSDetalhes(
                                osDetalhes.idOSDetalhes,
                                produtos[i].codigoBarras,
                                produtos[i].quantidadeVendida,
                                produtos[i].precoTotal,
                                produtos[i].precoUnitario
                            );
                        }
                    }
                }
                let executaFuncao = await new OrdemServicoServiceDAO(
                    req.connection
                ).buscarExecutaFuncaoGeral(osDetalhes.idOSDetalhes);

                let servicosCadastrados = [];
                if (executaFuncao) {
                    for (let i in executaFuncao) {
                        servicosCadastrados.push({
                            idServico: executaFuncao[i].idServico,
                            idFuncionario: executaFuncao[i].idFuncionario,
                            observacao: executaFuncao[i].observacao,
                        });
                    }
                }
                // console.log(servicosCadastrados);
                if (
                    qs.stringify(servicosCadastrados) !== qs.stringify(servicos)
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
                            await new OrdemServicoServiceDAO(
                                req.connection
                            ).excluirExecutaFuncao(
                                osDetalhes.idOSDetalhes,
                                servicosCadastrados[i].idServico,
                                servicosCadastrados[i].idFuncionario
                            );
                        }
                    }
                    for (let i in servicos) {
                        let execucao = await new OrdemServicoServiceDAO(
                            req.connection
                        ).buscarExecutaFuncaoEspecifica(
                            osDetalhes.idOSDetalhes,
                            servicos[i].idServico,
                            servicos[i].idFuncionario
                        );
                        if (!execucao) {
                            await new OrdemServicoServiceDAO(
                                req.connection
                            ).inserirExecutaFuncao(
                                servicos[i].idServico,
                                servicos[i].idFuncionario,
                                servicos[i].observacao,
                                osDetalhes.idOSDetalhes
                            );
                        }
                        if (execucao.observacao != servicos[i].observacao) {
                            await new OrdemServicoServiceDAO(
                                req.connection
                            ).alterarExecutaFuncao(
                                servicos[i].idServico,
                                servicos[i].idFuncionario,
                                servicos[i].observacao,
                                osDetalhes.idOSDetalhes
                            );
                        }
                    }
                }
            } else {
                throw new AppError(
                    "Não foram encontradas OSDetalhes para esta Ordem de Serviço",
                    400
                );
            }

            json.result = "Dados enviados";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    excluirOrdemServico: async (req, res) => {
        let json = { error: "", result: {} };

        let idOrdemServico = req.params.id;
        if (idOrdemServico) {
            let osDetalhes = await new OrdemServicoServiceDAO(
                req.connection
            ).buscarOSDetalhes(idOrdemServico);

            if (osDetalhes) {
                let vendas = await new OrdemServicoServiceDAO(
                    req.connection
                ).buscarVendaPorOSDetalhes(osDetalhes.idOSDetalhes);
                if (vendas) {
                    for (let i in vendas) {
                        await new OrdemServicoServiceDAO(
                            req.connection
                        ).excluirProdutoOSDetalhes(
                            osDetalhes.idOSDetalhes,
                            vendas[i].codigoBarras
                        );
                    }
                }
                let executaFuncao = await new OrdemServicoServiceDAO(
                    req.connection
                ).buscarExecutaFuncaoGeral(osDetalhes.idOSDetalhes);
                if (executaFuncao) {
                    for (let i in executaFuncao) {
                        await new OrdemServicoServiceDAO(
                            req.connection
                        ).excluirExecutaFuncao(
                            osDetalhes.idOSDetalhes,
                            executaFuncao[i].idServico,
                            executaFuncao[i].idFuncionario
                        );
                    }
                }
                await new OrdemServicoServiceDAO(req.connection)
                    .excluirOSDetalhes(osDetalhes.idOSDetalhes)
                    .catch((error) => {
                        throw new AppError(error, 500);
                    });
            }

            await new OrdemServicoServiceDAO(
                req.connection
            ).excluirOrdemServico(idOrdemServico);

            json.result = "Campos enviados";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },
};

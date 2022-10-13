const { json } = require("body-parser");
const ProdutoService = require("../services/ProdutoService");
const VendaDiretaService = require("../services/VendaDiretaService");
const qs = require("qs");
const AppError = require("../errors/AppError");

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };

        let vendaDireta = await VendaDiretaService.buscarTodos().catch(
            (error) => {
                throw new AppError(error, 500);
            }
        );
        if (!vendaDireta) {
            json.result[0] = "Não foram encontradas nenhuma venda direta";
        }

        for (let i in vendaDireta) {
            let vendas = await VendaDiretaService.buscarVendasPorVendaDireta(
                vendaDireta[i].idVendaDireta
            ).catch((error) => {
                throw new AppError(error, 500);
            });
            let jsonVendas = [];
            if (vendas) {
                for (let j in vendas) {
                    let produto = await ProdutoService.buscarPorId(
                        vendas[j].idProduto
                    ).catch((error) => {
                        throw new AppError(error, 500);
                    });
                    jsonVendas.push({
                        idProduto: vendas[j].idProduto,
                        codigoBarras: produto.codigoBarras,
                        descricao: produto.descricao,
                        data: vendaDireta[i].data,
                        quantidadeVendida: vendas[j].quantidadeVendida,
                        precoTotal: vendas[j].precoTotal,
                        precoVenda: produto.precoVenda,
                    });
                }
            }
            json.result.push({
                idVendaDireta: vendaDireta[i].idVendaDireta,
                total: vendaDireta[i].total,
                vendas: jsonVendas,
            });
        }

        res.json(json);
    },

    buscarPorId: async (req, res) => {
        let json = { error: "", result: {} };
        let idVendaDireta = req.params.id;
        let vendaDireta = await VendaDiretaService.buscarPorId(
            idVendaDireta
        ).catch((error) => {
            throw new AppError(error, 500);
        });
        if (!vendaDireta) {
            json.result = "Não foi encontrada nenhuma venda direta com este id";
        }
        let vendas = await VendaDiretaService.buscarVendasPorVendaDireta(
            idVendaDireta
        ).catch((error) => {
            throw new AppError(error, 500);
        });
        let jsonVendas = [];
        if (vendas) {
            for (let i in vendas) {
                let produto = await ProdutoService.buscarPorId(
                    vendas[i].idProduto
                ).catch((error) => {
                    throw new AppError(error, 500);
                });
                jsonVendas.push({
                    idProduto: vendas[i].idProduto,
                    codigoBarras: produto.codigoBarras,
                    descricao: produto.descricao,
                    data: vendaDireta.dataHora,
                    quantidadeVendida: vendas[i].quantidadeVendida,
                    precoTotal: vendas[i].precoTotal,
                    precoVenda: produto.precoVenda,
                });
            }
        }
        json.result = {
            idVendaDireta: vendaDireta.idVendaDireta,
            total: vendaDireta.total,
            vendas: jsonVendas,
        };

        res.json(json);
    },

    buscaPorValor: async (req, res) => {
        let json = { error: "", result: [] };
        let valor = req.params.valor;

        // Busca a venda direta que possui o id especificado
        let vendaDireta_buscada = await VendaDiretaService.buscarPorId(
            valor
        ).catch((error) => {
            throw new AppError(error, 500);
        });
        let vendaDireta = [];
        if (vendaDireta_buscada) {
            vendaDireta.push({ vendaDireta_buscada });
        }
        let produtos = await ProdutoService.buscaPorValor(valor).catch(
            (error) => {
                throw new AppError(error, 500);
            }
        );

        for (let i in produtos) {
            let vendasDiretas_buscadas =
                await VendaDiretaService.buscarVendasPorProduto(
                    produtos[i].idProduto
                ).catch((error) => {
                    throw new AppError(error, 500);
                });
            // Comando para remover o RowDataPacket
            vendasDiretas_buscadas = JSON.parse(
                JSON.stringify(vendasDiretas_buscadas)
            );
            if (vendasDiretas_buscadas) {
                for (let j in vendasDiretas_buscadas) {
                    vendaDireta.push({
                        idVendaDireta: vendasDiretas_buscadas[j].idVendaDireta,
                        idPagamento: vendasDiretas_buscadas[j].idPagamento,
                        total: vendasDiretas_buscadas[j].total,
                        dataHora: vendasDiretas_buscadas[j].dataHora,
                    });
                }
            }
        }
        vendaDireta = vendaDireta.filter(function (a) {
            return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        }, Object.create(null));

        if (!vendaDireta) {
            json.result.push(
                "Não foram encontradas Vendas Diretas com base neste parâmetro"
            );
            res.json(json);
            return;
        }
        for (let i in vendaDireta) {
            let vendas = await VendaDiretaService.buscarVendasPorVendaDireta(
                vendaDireta[i].idVendaDireta
            ).catch((error) => {
                throw new AppError(error, 500);
            });
            let jsonVendas = [];
            if (vendas) {
                for (let j in vendas) {
                    let produto = await ProdutoService.buscarPorId(
                        vendas[j].idProduto
                    ).catch((error) => {
                        throw new AppError(error, 500);
                    });
                    jsonVendas.push({
                        idProduto: vendas[j].idProduto,
                        codigoBarras: produto.codigoBarras,
                        descricao: produto.descricao,
                        data: vendaDireta[i].data,
                        quantidadeVendida: vendas[j].quantidadeVendida,
                        precoTotal: vendas[j].precoTotal,
                        precoVenda: produto.precoVenda,
                    });
                }
            }
            json.result.push({
                idVendaDireta: vendaDireta[i].idVendaDireta,
                total: vendaDireta[i].total,
                vendas: jsonVendas,
            });
        }

        res.json(json);
    },

    inserirVendaDireta: async (req, res) => {
        let json = { error: "", result: {} };
        let valores = req.body;
        valores = qs.parse(valores);
        let idPagamento = valores.idPagamento;
        let total = valores.total;

        if (idPagamento && total) {
            let IdVendaDireta = await VendaDiretaService.inserirVendaDireta(
                idPagamento,
                total
            ).catch((error) => {
                throw new AppError(error, 500);
            });
            if (valores.produtos) {
                for (let i in valores.produtos) {
                    let idProduto = valores.produtos[i].idProduto * 1;
                    let quantidadeVendida =
                        valores.produtos[i].quantidadeVendida * 1;
                    let precoTotal = valores.produtos[i].precoTotal * 1;
                    await VendaDiretaService.inserirProduto_has_VendaDireta(
                        IdVendaDireta,
                        idProduto,
                        quantidadeVendida,
                        precoTotal
                    ).catch((error) => {
                        throw new AppError(error, 500);
                    });
                    await ProdutoService.alterarEstoque(
                        idProduto,
                        quantidadeVendida * -1
                    ).catch((error) => {
                        throw new AppError(error, 500);
                    });
                }
            }
            json.result = "Dados enviados";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    alterarVendaDireta: async (req, res) => {
        let json = { error: "", result: {} };

        let idVendaDireta = req.params.id;
        let valores = req.body;
        valores = qs.parse(valores);

        let total = valores.total;

        if (idVendaDireta && total) {
            await VendaDiretaService.alterarVendaDireta(
                idVendaDireta,
                total
            ).catch((error) => {
                throw new AppError(error, 500);
            });
            let vendas = await VendaDiretaService.buscarVendasPorVendaDireta(
                idVendaDireta
            ).catch((error) => {
                throw new AppError(error, 500);
            });
            let vendasCadastradas = [];
            if (vendas) {
                for (let i in vendas) {
                    vendasCadastradas.push({
                        idProduto: vendas[i].idProduto,
                        quantidadeVendida: vendas[i].quantidadeVendida,
                        precoTotal: vendas[i].precoTotal,
                    });
                }
            }
            if (
                qs.stringify(valores.produtos) !==
                qs.stringify(vendasCadastradas)
            ) {
                for (let i in vendasCadastradas) {
                    let produtoExiste = false;
                    for (let j in valores.produtos) {
                        if (
                            vendasCadastradas[i].idProduto ==
                            valores.produtos[j].idProduto
                        ) {
                            produtoExiste = true;
                        }
                    }
                    if (!produtoExiste) {
                        await VendaDiretaService.excluirProdutoVendaDireta(
                            idVendaDireta,
                            vendasCadastradas[i].idProduto
                        ).catch((error) => {
                            throw new AppError(error, 500);
                        });
                    }
                }
                for (let i in valores.produtos) {
                    let venda = await VendaDiretaService.buscarVendaEspecifica(
                        idVendaDireta,
                        valores.produtos[i].idProduto
                    );
                    if (!venda) {
                        await VendaDiretaService.inserirProduto_has_VendaDireta(
                            idVendaDireta,
                            valores.produtos[i].idProduto,
                            valores.produtos[i].quantidadeVendida,
                            valores.produtos[i].precoTotal
                        );
                        break;
                    }
                    if (
                        venda.quantidadeVendida !==
                            valores.produtos[i].quantidadeVendida ||
                        venda.precoTotal !== valores.produtos[i].precoTotal
                    ) {
                        await VendaDiretaService.alterarProduto_has_VendaDireta(
                            idVendaDireta,
                            valores.produtos[i].idProduto,
                            valores.produtos[i].quantidadeVendida,
                            valores.produtos[i].precoTotal
                        );
                    }
                }
            }
            json.result = "Dados enviados";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    excluirVendaDireta: async (req, res) => {
        let json = { error: "", result: {} };

        let idVendaDireta = req.params.id;
        if (idVendaDireta) {
            let vendas = await VendaDiretaService.buscarVendasPorVendaDireta(
                idVendaDireta
            ).catch((error) => {
                throw new AppError(error, 500);
            });
            for (let i in vendas) {
                await VendaDiretaService.excluirProdutoVendaDireta(
                    vendas[i].idVendaDireta,
                    vendas[i].idProduto
                ).catch((error) => {
                    throw new AppError(error, 500);
                    res.json(json);
                    return;
                });
            }
            await VendaDiretaService.excluirVendaDireta(idVendaDireta).catch(
                (error) => {
                    throw new AppError(error, 500);
                }
            );
            json.result = "Dados excluidos com sucesso!";
        } else {
            throw new AppError("Campos não enviados", 400);
        }
        res.json(json);
    },
};

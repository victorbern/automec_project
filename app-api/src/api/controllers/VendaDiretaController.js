const { json } = require("body-parser");
const qs = require("qs");
const AppError = require("../errors/AppError");
const VendaDiretaServiceDAO = require("../services/VendaDiretaServiceDAO");
const ProdutoServiceDAO = require("../services/ProdutoServiceDAO");

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };

        let vendaDireta = await new VendaDiretaServiceDAO(req.connection)
            .buscarTodos()
            .catch((error) => {
                throw new AppError(error, 500);
            });
        if (!vendaDireta) {
            json.result[0] = "Não foram encontradas nenhuma venda direta";
        }

        for (let i in vendaDireta) {
            let vendas = await new VendaDiretaServiceDAO(req.connection)
                .buscarVendasPorVendaDireta(vendaDireta[i].idVendaDireta)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            let jsonVendas = [];
            if (vendas) {
                for (let j in vendas) {
                    let produto = await new ProdutoServiceDAO(req.connection)
                        .buscaEspecificaCodigoBarras(vendas[j].codigoBarras)
                        .catch((error) => {
                            throw new AppError(error, 500);
                        });
                    jsonVendas.push({
                        codigoBarras: vendas[j].codigoBarras,
                        descricao: produto.descricao,
                        quantidadeVendida: vendas[j].quantidadeVendida,
                        precoTotal: vendas[j].precoTotal,
                        precoUnitario: vendas[j].precoUnitario,
                    });
                }
            }
            json.result.push({
                idVendaDireta: vendaDireta[i].idVendaDireta,
                idPagamento: vendaDireta[i].idPagamento,
                total: vendaDireta[i].total,
                dataHora: vendaDireta[i].dataHora,
                vendas: jsonVendas,
            });
        }

        res.json(json);
    },

    buscarPorId: async (req, res) => {
        let json = { error: "", result: {} };
        let idVendaDireta = req.params.id;
        let vendaDireta = await new VendaDiretaServiceDAO(req.connection)
            .buscarPorId(idVendaDireta)
            .catch((error) => {
                throw new AppError(error, 500);
            });
        if (!vendaDireta) {
            json.result = "Não foi encontrada nenhuma venda direta com este id";
        }
        let vendas = await new VendaDiretaServiceDAO(req.connection)
            .buscarVendasPorVendaDireta(idVendaDireta)
            .catch((error) => {
                throw new AppError(error, 500);
            });
        let jsonVendas = [];
        if (vendas) {
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
        }
        json.result = {
            idVendaDireta: vendaDireta.idVendaDireta,
            total: vendaDireta.total,
            dataHora: vendaDireta.dataHora,
            vendas: jsonVendas,
        };

        res.json(json);
    },

    buscaPorValor: async (req, res) => {
        let json = { error: "", result: [] };
        let valor = req.params.valor;

        // Busca a venda direta que possui o id especificado
        let vendaDireta_buscada = await new VendaDiretaServiceDAO(
            req.connection
        )
            .buscarPorId(valor)
            .catch((error) => {
                throw new AppError(error, 500);
            });
        let vendaDireta = [];
        if (vendaDireta_buscada) {
            vendaDireta.push({ vendaDireta_buscada });
        }
        let produtos = await new ProdutoServiceDAO(req.connection)
            .buscaPorValor(valor)
            .catch((error) => {
                throw new AppError(error, 500);
            });

        for (let i in produtos) {
            let vendasDiretas_buscadas = await new VendaDiretaServiceDAO(
                req.connection
            )
                .buscarVendasPorProduto(produtos[i].codigoBarras)
                .catch((error) => {
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
            let vendas = await new VendaDiretaServiceDAO(req.connection)
                .buscarVendasPorVendaDireta(vendaDireta[i].idVendaDireta)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            let jsonVendas = [];
            if (vendas) {
                for (let j in vendas) {
                    let produto = await new ProdutoServiceDAO(req.connection)
                        .buscaEspecificaCodigoBarras(vendas[j].codigoBarras)
                        .catch((error) => {
                            throw new AppError(error, 500);
                        });
                    jsonVendas.push({
                        codigoBarras: vendas[j].codigoBarras,
                        descricao: produto.descricao,
                        quantidadeVendida: vendas[j].quantidadeVendida,
                        precoTotal: vendas[j].precoTotal,
                        precoUnitario: vendas[j].precoUnitario,
                    });
                }
            }
            json.result.push({
                idVendaDireta: vendaDireta[i].idVendaDireta,
                total: vendaDireta[i].total,
                dataHora: vendaDireta[i].dataHora,
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
            let IdVendaDireta = await new VendaDiretaServiceDAO(req.connection)
                .inserirVendaDireta(idPagamento, total)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            if (valores.produtos) {
                for (let i in valores.produtos) {
                    let codigoBarras = valores.produtos[i].codigoBarras;
                    let quantidadeVendida =
                        valores.produtos[i].quantidadeVendida * 1;
                    let precoTotal = valores.produtos[i].precoTotal * 1;
                    await new VendaDiretaServiceDAO(req.connection)
                        .inserirProduto_has_VendaDireta(
                            IdVendaDireta,
                            codigoBarras,
                            quantidadeVendida,
                            precoTotal
                        )
                        .catch((error) => {
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
            await new VendaDiretaServiceDAO(req.connection)
                .alterarVendaDireta(idVendaDireta, total)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            let vendas = await new VendaDiretaServiceDAO(req.connection)
                .buscarVendasPorVendaDireta(idVendaDireta)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            let vendasCadastradas = [];
            if (vendas) {
                for (let i in vendas) {
                    vendasCadastradas.push({
                        codigoBarras: vendas[i].codigoBarras,
                        quantidadeVendida: vendas[i].quantidadeVendida,
                        precoTotal: vendas[i].precoTotal,
                        precoUnitario: vendas[i].precoUnitario,
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
                            vendasCadastradas[i].codigoBarras ==
                            valores.produtos[j].codigoBarras
                        ) {
                            produtoExiste = true;
                        }
                    }
                    if (!produtoExiste) {
                        await new VendaDiretaServiceDAO(req.connection)
                            .excluirProdutoVendaDireta(
                                idVendaDireta,
                                vendasCadastradas[i].codigoBarras
                            )
                            .catch((error) => {
                                throw new AppError(error, 500);
                            });
                    }
                }
                for (let i in valores.produtos) {
                    let venda = await new VendaDiretaServiceDAO(
                        req.connection
                    ).buscarVendaEspecifica(
                        idVendaDireta,
                        valores.produtos[i].codigoBarras
                    );
                    if (!venda) {
                        await new VendaDiretaServiceDAO(
                            req.connection
                        ).inserirProduto_has_VendaDireta(
                            idVendaDireta,
                            valores.produtos[i].codigoBarras,
                            valores.produtos[i].quantidadeVendida,
                            valores.produtos[i].precoTotal,
                            valores.produtos[i].precoUnitario
                        );
                    }
                    if (
                        venda.quantidadeVendida !=
                            valores.produtos[i].quantidadeVendida ||
                        venda.precoTotal != valores.produtos[i].precoTotal ||
                        venda.precoUnitario != valores.produtos[i].precoUnitario
                    ) {
                        await new VendaDiretaServiceDAO(
                            req.connection
                        ).alterarProduto_has_VendaDireta(
                            idVendaDireta,
                            valores.produtos[i].codigoBarras,
                            valores.produtos[i].quantidadeVendida,
                            valores.produtos[i].precoTotal,
                            valores.produtos[i].precoUnitario
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
            let vendas = await new VendaDiretaServiceDAO(req.connection)
                .buscarVendasPorVendaDireta(idVendaDireta)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            for (let i in vendas) {
                await new VendaDiretaServiceDAO(req.connection)
                    .excluirProdutoVendaDireta(
                        vendas[i].idVendaDireta,
                        vendas[i].codigoBarras
                    )
                    .catch((error) => {
                        throw new AppError(error, 500);
                        res.json(json);
                        return;
                    });
            }
            await new VendaDiretaServiceDAO(req.connection)
                .excluirVendaDireta(idVendaDireta)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            json.result = "Dados excluidos com sucesso!";
        } else {
            throw new AppError("Campos não enviados", 400);
        }
        res.json(json);
    },
};

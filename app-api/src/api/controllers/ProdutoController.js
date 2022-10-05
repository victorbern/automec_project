const { json } = require("body-parser");
const ProdutoService = require("../services/ProdutoService");

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };
        let produtos = await ProdutoService.buscarTodos().catch((error) => {
            json.error = error;
        });

        for (let i in produtos) {
            json.result.push({
                idProduto: produtos[i].idProduto,
                codigoBarras: produtos[i].codigoBarras,
                descricao: produtos[i].descricao,
                valorCurto: produtos[i].valorCusto,
                quantidadeEstoque: produtos[i].quantidadeEstoque,
                precoVenda: produtos[i].precoVenda,
            });
        }

        res.json(json);
    },

    buscarPorId: async (req, res) => {
        let json = { error: "", result: {} };
        let idProduto = req.params.id;
        let produto = await ProdutoService.buscarPorId(idProduto).catch(
            (error) => {
                json.error = error;
            }
        );

        if (produto) {
            json.result = produto;
        }

        res.json(json);
    },

    buscaPorValor: async (req, res) => {
        let json = { error: "", result: [] };
        let valor = req.params.valor;
        let produtos = await ProdutoService.buscaPorValor(valor).catch(
            (error) => {
                json.error = error;
            }
        );

        for (let i in produtos) {
            json.result.push({
                idProduto: produtos[i].idProduto,
                codigoBarras: produtos[i].codigoBarras,
                descricao: produtos[i].descricao,
                valorCusto: produtos[i].valorCusto,
                quantidadeEstoque: produtos[i].quantidadeEstoque,
                precoVenda: produtos[i].precoVenda,
            });
        }

        res.json(json);
    },

    inserirProduto: async (req, res) => {
        let json = { error: "", result: {} };

        let codigoBarras = req.body.codigoBarras;
        let descricao = req.body.descricao;
        let valorCusto = req.body.valorCusto;
        let quantidadeEstoque = req.body.quantidadeEstoque;
        let precoVenda = req.body.precoVenda;

        if (codigoBarras && descricao && precoVenda) {
            let IdProduto = await ProdutoService.inserirProduto(
                codigoBarras,
                descricao,
                valorCusto,
                quantidadeEstoque,
                precoVenda
            )
                .then(() => {
                    json.result = {
                        idProduto: IdProduto,
                        codigoBarras,
                        descricao,
                        valorCusto,
                        quantidadeEstoque,
                        precoVenda,
                    };
                })
                .catch((error) => {
                    json.error = error;
                });
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },

    alterarEstoque: async (req, res) => {
        let json = { error: "", result: {} };

        let id = req.params.id;
        let valorAlteracao = req.body.valorAlteracao;

        let quantidadeEstoque = await ProdutoService.alterarEstoque(
            id,
            valorAlteracao
        )
            .then(() => {
                json.result = {
                    idProduto: id,
                    quantidadeEstoque: quantidadeEstoque,
                };
            })
            .catch((error) => {
                json.error = error;
            });
        res.json(json);
    },

    alterarProduto: async (req, res) => {
        let json = { error: "", result: {} };

        let idProduto = req.params.id;
        let codigoBarras = req.body.codigoBarras;
        let descricao = req.body.descricao;
        let valorCusto = req.body.valorCusto;
        let quantidadeEstoque = req.body.quantidadeEstoque;
        let precoVenda = req.body.precoVenda;

        if (codigoBarras && descricao && precoVenda && idProduto) {
            await ProdutoService.alterarProduto(
                idProduto,
                codigoBarras,
                descricao,
                valorCusto,
                quantidadeEstoque,
                precoVenda
            )
                .then(() => {
                    json.result = {
                        idProduto,
                        codigoBarras,
                        descricao,
                        valorCusto,
                        quantidadeEstoque,
                        precoVenda,
                    };
                })
                .catch((error) => {
                    json.error = error;
                });
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },

    excluirProduto: async (req, res) => {
        let json = { error: "", result: {} };

        let id = req.params.id;

        if (id) {
            await ProdutoService.excluirProduto(id)
                .then(() => {
                    json.result = {
                        id,
                    };
                })
                .catch((error) => {
                    json.error = error;
                });
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },
};

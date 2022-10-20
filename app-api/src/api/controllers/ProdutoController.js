const { json } = require("body-parser");
const AppError = require("../errors/AppError");
const ProdutoService = require("../services/ProdutoService");

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };
        let produtos = await ProdutoService.buscarTodos().catch((error) => {
            throw new AppError(error, 500);
        });

        for (let i in produtos) {
            json.result.push({
                codigoBarras: produtos[i].codigoBarras,
                descricao: produtos[i].descricao,
                valorCusto: produtos[i].valorCusto,
                quantidadeEstoque: produtos[i].quantidadeEstoque,
                precoVenda: produtos[i].precoVenda,
            });
        }

        res.json(json);
    },

    buscarPorCodigoBarras: async (req, res) => {
        let json = { error: "", result: {} };
        let codigoBarras = req.params.codigoBarras;
        let produto = await ProdutoService.buscaEspecificaCodigoBarras(
            codigoBarras
        ).catch((error) => {
            throw new AppError(error, 500);
        });

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
                throw new AppError(error, 500);
            }
        );

        for (let i in produtos) {
            json.result.push({
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
            if (!quantidadeEstoque) {
                quantidadeEstoque = 0;
            }
            await ProdutoService.inserirProduto(
                codigoBarras,
                descricao,
                valorCusto,
                quantidadeEstoque,
                precoVenda
            ).catch((error) => {
                throw new AppError(error, 500);
            });
            json.result = {
                codigoBarras,
                descricao,
                valorCusto,
                quantidadeEstoque,
                precoVenda,
            };
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    alterarEstoque: async (req, res) => {
        let json = { error: "", result: {} };

        let codigoBarras = req.params.codigoBarras;
        let valorAlteracao = req.body.valorAlteracao;
        if (valorAlteracao) {
            await ProdutoService.alterarEstoque(
                codigoBarras,
                valorAlteracao
            ).catch((error) => {
                throw new AppError(error, 500);
            });
        } else {
            throw new AppError("O valor não pode ser nulo", 400);
        }
        json.result = "Estoque alterado com sucesso!";
        res.json(json);
    },

    alterarProduto: async (req, res) => {
        let json = { error: "", result: {} };

        let codigoBarras = req.params.codigoBarras;
        let descricao = req.body.descricao;
        let valorCusto = req.body.valorCusto;
        let precoVenda = req.body.precoVenda;

        if (codigoBarras && descricao && valorCusto && precoVenda) {
            await ProdutoService.alterarProduto(
                codigoBarras,
                descricao,
                valorCusto,
                precoVenda
            ).catch((error) => {
                throw new AppError(error, 500);
            });
            json.result = {
                codigoBarras,
                descricao,
                valorCusto,
                precoVenda,
            };
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    excluirProduto: async (req, res) => {
        let json = { error: "", result: {} };

        let codigoBarras = req.params.codigoBarras;

        if (codigoBarras) {
            await ProdutoService.excluirProduto(codigoBarras).catch((error) => {
                throw new AppError(error, 500);
            });
            json.result = "Produto excluido com sucesso!";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },
};

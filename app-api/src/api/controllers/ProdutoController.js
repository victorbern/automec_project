const { json } = require("body-parser");
const ProdutoService = require("../services/ProdutoService");

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {error: '', result: []};
        let produtos = await ProdutoService.buscarTodos();

        for (let i in produtos){
            json.result.push({
                idProduto: produtos[i].idProduto,
                codigoBarras: produtos[i].codigoBarras,
                descricao: produtos[i].descricao,
                valorCurto: produtos[i].valorCusto,
                quantidade: produtos[i].quantidade,
                precoVenda: produtos[i].precoVenda
            });
        }
        
        res.json(json);
    },

    buscarPorId: async(req, res) => {
        let json = {error: '', result: {}};
        let idProduto = req.params.id;
        let produto = await ProdutoService.buscarPorId(idProduto);

        if(produto){
            json.result = produto;
        }

        res.json(json);
    },

    inserirProduto: async(req, res) => {
        let json = {error: '', result: {}};
        
        let codigoBarras = req.body.codigoBarras;
        let descricao = req.body.descricao;
        let valorCusto = req.body.valorCusto;
        let quantidade = req.body.quantidade;
        let precoVenda = req.body.precoVenda;

        if(codigoBarras && descricao && precoVenda){
            let IdProduto = await ProdutoService.inserirProduto(codigoBarras, descricao, valorCusto, quantidade, precoVenda);
            json.result = {
                idProduto: IdProduto,
                codigoBarras,
                descricao,
                valorCusto,
                quantidade,
                precoVenda,
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },

    alterarEstoque: async(req, res) => {
        let json = {error: '', result: {}};

        let id = req.params.id;
        let valorAlteracao = req.body.valorAlteracao;

        let quantidade = await ProdutoService.alterarEstoque(id, valorAlteracao);

        json.result = {
            idProduto: id,
            quantidade: quantidade
        }

        res.json(json);
    },

    alterarProduto: async(req, res) => {
        let json = {error: '', result: {}};

        let idProduto = req.params.id;
        let codigoBarras = req.body.codigoBarras;
        let descricao = req.body.descricao;
        let valorCusto = req.body.valorCusto;
        let quantidade = req.body.quantidade;
        let precoVenda = req.body.precoVenda;

        if(codigoBarras && descricao && precoVenda && idProduto){
            await ProdutoService.alterarProduto(idProduto, codigoBarras, descricao, valorCusto, quantidade, precoVenda);
            json.result = {
                idProduto,
                codigoBarras,
                descricao,
                valorCusto,
                quantidade,
                precoVenda,
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },

    excluirProduto: async (req, res) => {
        let json = {error: '', result: {}};

        let id = req.params.id;

        if(id){
            await ProdutoService.excluirProduto(id);
            json.result = {
                id
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    }

}

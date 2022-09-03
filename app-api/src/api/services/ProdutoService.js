const db = require("../../db");

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM produto', (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarPorId: (idProduto) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM produto WHERE produto.idProduto = ?', [idProduto], (error, results) => {
                if(error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserirProduto: (codigoBarras, descricao, valorCusto, quantidade, precoVenda) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`INSERT INTO produto (codigoBarras, descricao, valorCusto, quantidade, precoVenda) VALUES (?, ?, ?, ?, ?)`, 
                [codigoBarras, descricao, valorCusto, quantidade, precoVenda],
            (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results.insertId);
            });
        });
    },

    getQuantidade: (id) => {
        return new Promise((aceito, recusado) => {
            db.query('SELECT quantidade FROM Produto WHERE id = ?', [id], (error, results) => {
                if(error) {rejeitado(error); return;}
                aceito(results)
            });
        });
    },

    alterarEstoque: (id, valorAlteracao) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE produto SET quantidade = quantidade+? WHERE idProduto = ?', [valorAlteracao, id], (error, results) => {
                if(error) { rejeitado(error); return; }

                db.query('SELECT quantidade FROM Produto WHERE idProduto = ?', [id], (error, resultSelect) => {
                    if(error) { rejeitado(error); return; }
                    aceito(resultSelect);
                });
                aceito(results);
            })
        });
    },

    alterarProduto: (idProduto, codigoBarras, descricao, valorCusto, quantidade, precoVenda) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE produto SET codigoBarras = ?, descricao = ?, valorCusto = ?,' +
                'quantidade = ?, precoVenda = ? WHERE idProduto = ?', 
                [codigoBarras, descricao, valorCusto, quantidade, precoVenda, idProduto], (error, results) => {
                    if(error) {rejeitado(error); return; }
                    aceito(results);
            });
        });
    },

    excluirProduto: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM Produto WHERE idProduto = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};
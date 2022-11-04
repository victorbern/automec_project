const db = require("../../db");

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQuery("SELECT * FROM produto", (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results);
            });
        });
    },

    buscaEspecificaCodigoBarras: (codigoBarras) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "SELECT * FROM produto WHERE codigoBarras = ?",
                [codigoBarras],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    if (results.length > 0) {
                        aceito(results[0]);
                    } else {
                        aceito(false);
                    }
                }
            );
        });
    },

    buscaPorValor: (valor) => {
        valor = "%" + valor + "%";
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "SELECT codigoBarras, descricao, valorCusto, quantidadeEstoque, precoVenda FROM Produto WHERE descricao like ? OR codigoBarras like ?",
                [valor, valor],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    if (results.length > 0) {
                        aceito(results);
                    } else {
                        aceito(false);
                    }
                }
            );
        });
    },

    inserirProduto: (
        codigoBarras,
        descricao,
        valorCusto,
        quantidadeEstoque,
        precoVenda
    ) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `INSERT INTO produto (codigoBarras, descricao, valorCusto, quantidadeEstoque, precoVenda) VALUES (?, ?, ?, ?, ?)`,
                [
                    codigoBarras,
                    descricao,
                    valorCusto,
                    quantidadeEstoque,
                    precoVenda,
                ],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results);
                }
            );
        });
    },

    getQuantidade: (id) => {
        return new Promise((aceito, recusado) => {
            db.executeSQLQueryParams(
                "SELECT quantidadeEstoque FROM Produto WHERE id = ?",
                [id],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results);
                }
            );
        });
    },

    alterarEstoque: (codigoBarras, valorAlteracao) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "UPDATE produto SET quantidadeEstoque = quantidadeEstoque+? WHERE codigoBarras = ?",
                [valorAlteracao, codigoBarras],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results);
                }
            );
        });
    },

    alterarProduto: (codigoBarras, descricao, valorCusto, precoVenda) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "UPDATE produto SET descricao = ?, valorCusto = ?," +
                    " precoVenda = ? WHERE codigoBarras = ?",
                [descricao, valorCusto, precoVenda, codigoBarras],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results);
                }
            );
        });
    },

    excluirProduto: (codigoBarras) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "DELETE FROM Produto WHERE codigoBarras = ?",
                [codigoBarras],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results);
                }
            );
        });
    },
};

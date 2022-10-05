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

    buscarPorId: (idProduto) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "SELECT * FROM produto WHERE produto.idProduto = ?",
                [idProduto],
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
                "SELECT idProduto, codigoBarras, descricao, valorCusto, quantidadeEstoque, precoVenda FROM Produto WHERE descricao like ? OR codigoBarras like ?",
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
                    aceito(results.insertId);
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

    alterarEstoque: (id, valorAlteracao) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "UPDATE produto SET quantidadeEstoque = quantidadeEstoque+? WHERE idProduto = ?",
                [valorAlteracao, id],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }

                    db.executeSQLQueryParams(
                        "SELECT quantidadeEstoque FROM Produto WHERE idProduto = ?",
                        [id],
                        (error, resultSelect) => {
                            if (error) {
                                rejeitado(error);
                                return;
                            }
                            aceito(resultSelect);
                        }
                    );
                    aceito(results);
                }
            );
        });
    },

    alterarProduto: (
        idProduto,
        codigoBarras,
        descricao,
        valorCusto,
        quantidadeEstoque,
        precoVenda
    ) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "UPDATE produto SET codigoBarras = ?, descricao = ?, valorCusto = ?," +
                    "quantidadeEstoque = ?, precoVenda = ? WHERE idProduto = ?",
                [
                    codigoBarras,
                    descricao,
                    valorCusto,
                    quantidadeEstoque,
                    precoVenda,
                    idProduto,
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

    excluirProduto: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "DELETE FROM Produto WHERE idProduto = ?",
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
};

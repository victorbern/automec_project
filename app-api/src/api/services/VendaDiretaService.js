const db = require("../../db");

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQuery(
                `SELECT idVendaDireta, idPagamento, total, dataHora FROM VendaDireta`,
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

    buscarPorId: (idVendaDireta) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT idVendaDireta, idPagamento, total, dataHora FROM VendaDireta WHERE idVendaDireta = ?`,
                [idVendaDireta],
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

    buscarPorPagamento: (idPagamento) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT idVendaDireta, total, dataHora  FROM VendaDireta WHERE idPagamento = ?`,
                [idPagamento],
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

    inserirVendaDireta: (idPagamento, total) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `INSERT INTO VendaDireta (idPagamento, total, dataHora) VALUES (?, ?, CURDATE())`,
                [idPagamento, total],
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

    alterarVendaDireta: (idVendaDireta, total) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "UPDATE VendaDireta SET total = ? WHERE idVendaDireta = ?",
                [total, idVendaDireta],
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

    excluirVendaDireta: (idVendaDireta) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `DELETE FROM VendaDireta WHERE idVendaDireta = ?`,
                [idVendaDireta],
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

    buscarVendasPorVendaDireta: (idVendaDireta) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT idVendaDireta, idProduto, quantidadeVendida, precoTotal FROM Produto_has_VendaDireta WHERE idVendaDireta = ?`,
                [idVendaDireta],
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

    buscarVendasPorProduto: (idProduto) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT vd.idVendaDireta, vd.idPagamento, vd.total, vd.dataHora FROM VendaDireta AS vd INNER JOIN Produto_has_VendaDireta AS p_vd ON vd.idVendaDireta = p_vd.idVendaDireta WHERE p_vd.idProduto = ?`,
                [idProduto],
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

    buscarVendaEspecifica: (idVendaDireta, idProduto) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT idVendaDireta, idProduto, quantidadeVendida, precoTotal FROM Produto_has_VendaDireta WHERE idVendaDireta = ? && idProduto = ?`,
                [idVendaDireta, idProduto],
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

    inserirProduto_has_VendaDireta: (
        idVendaDireta,
        idProduto,
        quantidadeVendida,
        precoTotal
    ) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `INSERT INTO Produto_has_VendaDireta (idVendaDireta, idProduto, quantidadeVendida, precoTotal) VALUES (?, ?, ?, ?)`,
                [idVendaDireta, idProduto, quantidadeVendida, precoTotal],
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

    alterarProduto_has_VendaDireta: (
        idVendaDireta,
        idProduto,
        quantidadeVendida,
        precoTotal
    ) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `UPDATE Produto_has_VendaDireta SET quantidadeVendida = ?, precoTotal = ? WHERE idVendaDireta = ? && idProduto = ?`,
                [quantidadeVendida, precoTotal, idVendaDireta, idProduto],
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
    excluirProdutoVendaDireta: (idVendaDireta, idProduto) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `DELETE FROM Produto_has_VendaDireta WHERE idVendaDireta = ? && idProduto = ?`,
                [idVendaDireta, idProduto],
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

// Alterações feitas no dia 27/08/2022
// Adição de método remover (que apenas altera o valor isAtivo no banco de dados)
// Mudança nas funções buscarTodos e buscarClientePorId (que buscam apenas clientes ativos)
// Implementação do método de busca inteligente

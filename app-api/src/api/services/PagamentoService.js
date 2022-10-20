const db = require("../../db");

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQuery(
                `SELECT idPagamento, subtotal, total, formaPagamento, desconto, dataHora FROM Pagamento`,
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

    buscarPorId: (idPagamento) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT idPagamento, dataHora, subtotal, total, desconto, formaPagamento FROM Pagamento WHERE idPagamento = ?`,
                [idPagamento],
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

    inserirPagamento: (subtotal, total, formaPagamento, desconto) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `INSERT INTO Pagamento (subtotal, total, formaPagamento, desconto, dataHora) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())`,
                [subtotal, total, formaPagamento, desconto],
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

    alterarCliente: (
        id,
        nomeCliente,
        cpfCnpj,
        celularCliente,
        cep,
        endereco,
        numero,
        cidade,
        uf,
        complemento
    ) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "UPDATE Cliente SET nomeCliente = ?, cpfCnpj = ?, celularCliente = ?," +
                    "cep = ?, endereco = ?, numero = ?, cidade = ?, uf = ?, complemento = ? WHERE idCliente = ?",
                [
                    nomeCliente,
                    cpfCnpj,
                    celularCliente,
                    cep,
                    endereco,
                    numero,
                    cidade,
                    uf,
                    complemento,
                    id,
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

    excluirPagamento: (idPagamento) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "DELETE FROM Pagamento WHERE idPagamento = ?",
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

    // Classe Detalhe Pagamento

    buscarDetalhePagamento: (idPagamento) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "SELECT idDetalhePagamento, idOrdemServico, idPagamento FROM DetalhePagamento WHERE idPagamento = ?",
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

    inserirDetalhePagamento: (idOrdemServico, idPagamento) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `INSERT INTO DetalhePagamento (idOrdemServico, idPagamento) VALUES (?, ?)`,
                [idOrdemServico, idPagamento],
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

    excluirDetalhePagamento: (idPagamento, idOrdemServico) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `DELETE FROM DetalhePagamento WHERE idPagamento = ? && idOrdemServico = ?`,
                [idPagamento, idOrdemServico],
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

    // alterarPagamento: (
    //     idPagamento,
    //     subtotal,
    //     total,
    //     desconto,
    //     formaPagamento
    // ) => {
    //     return new Promise((aceito, rejeitado) => {
    //         db.executeSQLQueryParams(
    //             `UPDATE Pagamento SET subtotal = ?, total = ?, desconto = ?, formaPagamento = ? WHERE idPagamento = ?`,
    //             [subtotal, total, desconto, formaPagamento, idPagamento],
    //             (error, results) => {
    //                 if (error) {
    //                     rejeitado(error);
    //                     return;
    //                 }
    //                 aceito(results);
    //             }
    //         );
    //     });
    // },
};

// Alterações feitas no dia 27/08/2022
// Adição de método remover (que apenas altera o valor isAtivo no banco de dados)
// Mudança nas funções buscarTodos e buscarClientePorId (que buscam apenas clientes ativos)
// Implementação do método de busca inteligente

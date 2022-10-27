const db = require("../../db");

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQuery(
                `SELECT * FROM OrdemServico WHERE isPaga = false`,
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

    buscarPorId: (idOrdemServico) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT * FROM OrdemServico WHERE idOrdemServico = ?`,
                [idOrdemServico],
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

    buscaPorIdCliente: (idCliente) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "SELECT * FROM OrdemServico WHERE idCliente = ? && isPaga = false",
                [idCliente],
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

    buscaPorPlacaVeiculo: (placaVeiculo) => {
        return new Promise((aceito, rejeitado) => {
            placaVeiculo = "%" + placaVeiculo + "%";
            db.executeSQLQueryParams(
                `SELECT * FROM OrdemServico WHERE placaVeiculo like ? && isPaga = false`,
                [placaVeiculo],
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

    inserirOrdemServico: (idCliente, placaVeiculo, total, km, conexao) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `INSERT INTO OrdemServico (idCliente, placaVeiculo, total, km) VALUES (?, ?, ?, ?)`,
                [idCliente, placaVeiculo, total, km],
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

    alterarOrdemServico: (
        idOrdemServico,
        os_idCliente,
        os_placaVeiculo,
        total,
        km
    ) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `UPDATE OrdemServico SET total = ?, km = ?, idCliente = ?, placaVeiculo = ? WHERE idOrdemServico = ?`,
                [total, km, os_idCliente, os_placaVeiculo, idOrdemServico],
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

    alterarStatus: (idOrdemServico, isPaga) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `UPDATE OrdemServico SET isPaga = ? WHERE idOrdemServico = ?`,
                [isPaga, idOrdemServico],
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

    isPaga: (idOrdemServico) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT isPaga FROM OrdemServico WHERE idOrdemServico = ?`,
                [idOrdemServico],
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

    excluirOrdemServico: (idOrdemServico) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `DELETE FROM OrdemServico WHERE idOrdemServico = ?`,
                [idOrdemServico],
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

    inserirOSDetalhes: (idOrdemServico) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `INSERT INTO OSDetalhes (idOrdemServico, dataOS) VALUES (?, CURDATE())`,
                [idOrdemServico],
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

    buscarOSDetalhes: (idOrdemServico) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT idOSDetalhes, dataOS FROM OSDetalhes WHERE idOrdemServico = ?`,
                [idOrdemServico],
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

    excluirOSDetalhes: (idOSDetalhes) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "DELETE FROM OSDetalhes WHERE idOSDetalhes = ?",
                [idOSDetalhes],
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

    inserirProdutoHasOSDetalhes: (
        codigoBarras,
        idOSDetalhes,
        quantidadeVendida,
        precoTotal,
        precoUnitario
    ) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `INSERT INTO Produto_has_OSDetalhes (codigoBarras, idOSDetalhes, quantidadeVendida, precoTotal, precoUnitario) VALUES (?, ?, ?, ?, ?)`,
                [
                    codigoBarras,
                    idOSDetalhes,
                    quantidadeVendida,
                    precoTotal,
                    precoUnitario,
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

    buscarVendaPorOSDetalhes: (idOSDetalhes) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "SELECT codigoBarras, quantidadeVendida, precoTotal, precoUnitario FROM Produto_has_OSDetalhes WHERE idOSDetalhes = ?",
                [idOSDetalhes],
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

    buscarProdutoOSDetalhes: (idOSDetalhes, codigoBarras) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "SELECT quantidadeVendida, precoTotal, precoUnitario FROM Produto_has_OSDetalhes WHERE idOSDetalhes = ? && codigoBarras = ?",
                [idOSDetalhes, codigoBarras],
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

    // buscarVendasOrdemServico: (idOrdemServico) => {
    //     return new Promise((aceito, rejeitado) => {
    //         db.executeSQLQueryParams(
    //             `SELECT p_od.idOSDetalhes, p_od.codigoBarras, p_od.quantidadeVendida, p_od.precoUnitario, p_od.precoTotal FROM Produto_has_OSDetalhes AS p_od INNER JOIN OSDetalhes AS od ON p_od.idOSDetalhes = od.isOSDetalhes WHERE od.idOrdemServico = ?`,
    //             [idOrdemServico],
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

    alterarProdutoOSDetalhes: (
        idOSDetalhes,
        codigoBarras,
        quantidadeVendida,
        precoTotal,
        precoUnitario
    ) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "UPDATE Produto_has_OSDetalhes SET quantidadeVendida = ?, precoTotal = ?, precoUnitario = ? " +
                    "WHERE idOSDetalhes = ? && codigoBarras = ?",
                [
                    quantidadeVendida,
                    precoTotal,
                    precoUnitario,
                    idOSDetalhes,
                    codigoBarras,
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

    excluirProdutoOSDetalhes: (idOSDetalhes, codigoBarras) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "DELETE FROM Produto_has_OSDetalhes WHERE idOSDetalhes = ? && codigoBarras = ?",
                [idOSDetalhes, codigoBarras],
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

    inserirExecutaFuncao: (
        idServico,
        idFuncionario,
        observacao,
        idOSDetalhes
    ) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `INSERT INTO ExecutaFuncao (idServico, idFuncionario, observacao, idOSDetalhes) VALUES (?, ?, ?, ?)`,
                [idServico, idFuncionario, observacao, idOSDetalhes],
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

    alterarExecutaFuncao: (
        idServico,
        idFuncionario,
        observacao,
        idOSDetalhes
    ) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "UPDATE ExecutaFuncao SET observacao = ? WHERE idServico = ? && idOSDetalhes = ? && idFuncionario = ?",
                [observacao, idServico, idOSDetalhes, idFuncionario],
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

    buscarExecutaFuncaoGeral: (idOSDetalhes) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "SELECT idFuncionario, idServico, observacao FROM ExecutaFuncao WHERE idOSDetalhes = ?",
                [idOSDetalhes],
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

    buscarExecutaFuncaoEspecifica: (idOSDetalhes, idServico, idFuncionario) => {
        if (idFuncionario) {
            return new Promise((aceito, rejeitado) => {
                db.executeSQLQueryParams(
                    "SELECT idFuncionario, idServico, idOSDetalhes, observacao FROM ExecutaFuncao WHERE idOSDetalhes = ? && idServico = ? && idFuncionario = ?",
                    [idOSDetalhes, idServico, idFuncionario],
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
        }
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "SELECT idFuncionario, idServico, idOSDetalhes, observacao FROM ExecutaFuncao WHERE idOSDetalhes = ? && idServico = ?",
                [idOSDetalhes, idServico],
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

    excluirExecutaFuncao: (idOSDetalhes, idServico, idFuncionario) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "DELETE FROM ExecutaFuncao WHERE idOSDetalhes = ? && idServico = ? && idFuncionario = ?",
                [idOSDetalhes, idServico, idFuncionario],
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

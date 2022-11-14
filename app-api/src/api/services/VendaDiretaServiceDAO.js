const db = require("../../db");

class VendaDiretaServiceDAO {
    constructor(connection) {
        this._connection = connection;
    }

    buscarTodos() {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
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
    }

    buscarPorId(idVendaDireta) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
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
    }

    buscarPorPagamento(idPagamento) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `SELECT idVendaDireta, total, dataHora FROM VendaDireta WHERE idPagamento = ?`,
                [idPagamento],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results[0]);
                }
            );
        });
    }

    inserirVendaDireta(idPagamento, total) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
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
    }

    alterarVendaDireta(idVendaDireta, total) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
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
    }

    excluirVendaDireta(idVendaDireta) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
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
    }

    buscarVendasPorVendaDireta(idVendaDireta) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `SELECT idVendaDireta, codigoBarras, quantidadeVendida, precoTotal, precoUnitario FROM Produto_has_VendaDireta WHERE idVendaDireta = ?`,
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
    }

    buscarVendasPorProduto(codigoBarras) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `SELECT vd.idVendaDireta, vd.idPagamento, vd.total, vd.dataHora FROM VendaDireta AS vd INNER JOIN Produto_has_VendaDireta AS p_vd ON vd.idVendaDireta = p_vd.idVendaDireta WHERE p_vd.codigoBarras = ?`,
                [codigoBarras],
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
    }

    buscarVendaEspecifica(idVendaDireta, codigoBarras) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `SELECT idVendaDireta, codigoBarras, quantidadeVendida, precoTotal, precoUnitario FROM Produto_has_VendaDireta WHERE idVendaDireta = ? && codigoBarras = ?`,
                [idVendaDireta, codigoBarras],
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

    inserirProduto_has_VendaDireta(
        idVendaDireta,
        codigoBarras,
        quantidadeVendida,
        precoTotal,
        precoUnitario
    ) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `INSERT INTO Produto_has_VendaDireta (idVendaDireta, codigoBarras, quantidadeVendida, precoTotal, precoUnitario) VALUES (?, ?, ?, ?, ?)`,
                [
                    idVendaDireta,
                    codigoBarras,
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
    }

    alterarProduto_has_VendaDireta(
        idVendaDireta,
        codigoBarras,
        quantidadeVendida,
        precoTotal,
        precoUnitario
    ) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `UPDATE Produto_has_VendaDireta SET quantidadeVendida = ?, precoTotal = ?, precoUnitario = ? WHERE idVendaDireta = ? && codigoBarras = ?`,
                [
                    quantidadeVendida,
                    precoTotal,
                    precoUnitario,
                    idVendaDireta,
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
    }
    excluirProdutoVendaDireta(idVendaDireta, codigoBarras) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `DELETE FROM Produto_has_VendaDireta WHERE idVendaDireta = ? && codigoBarras = ?`,
                [idVendaDireta, codigoBarras],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results);
                }
            );
        });
    }
}

module.exports = VendaDiretaServiceDAO;

// Alterações feitas no dia 27/08/2022
// Adição de método remover (que apenas altera o valor isAtivo no banco de dados)
// Mudança nas funções buscarTodos e buscarClientePorId (que buscam apenas clientes ativos)
// Implementação do método de busca inteligente

const db = require("../../db");

class ProdutoServiceDAO {
    constructor(connection) {
        this._connection = connection;
    }

    buscarTodos() {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                "SELECT * FROM Produto",
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

    buscaEspecificaCodigoBarras(codigoBarras) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                "SELECT * FROM Produto WHERE codigoBarras = ?",
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
    }

    buscaPorValor(valor) {
        valor = "%" + valor + "%";
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
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
    }

    inserirProduto(
        codigoBarras,
        descricao,
        valorCusto,
        quantidadeEstoque,
        precoVenda
    ) {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `INSERT INTO Produto (codigoBarras, descricao, valorCusto, quantidadeEstoque, precoVenda) VALUES (?, ?, ?, ?, ?)`,
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
    }

    getQuantidade(id) {
        return new Promise((aceito, recusado) => {
            this._connection.query(
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
    }

    alterarEstoque(codigoBarras, valorAlteracao) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                "UPDATE Produto SET quantidadeEstoque = quantidadeEstoque+? WHERE codigoBarras = ?",
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
    }

    alterarProduto(codigoBarras, descricao, valorCusto, precoVenda) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                "UPDATE Produto SET descricao = ?, valorCusto = ?," +
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
    }

    excluirProduto(codigoBarras) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
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
    }
}

module.exports = ProdutoServiceDAO;

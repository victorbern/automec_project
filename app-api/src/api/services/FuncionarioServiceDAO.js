const db = require("../../db");

class FuncionarioServiceDAO {
    constructor(connection) {
        this._connection = connection;
    }

    buscarTodos() {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                "SELECT * FROM Funcionario",
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

    buscarPorId(id) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                "SELECT * FROM Funcionario WHERE Funcionario.idFuncionario = ?",
                [id],
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
                "SELECT idFuncionario, nomeFuncionario, isAtivo, funcao FROM Funcionario WHERE nomeFuncionario like ? OR funcao like ?",
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

    inserirFuncionario(nomeFuncionario, isAtivo, funcao) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `INSERT INTO Funcionario (nomeFuncionario, isAtivo, funcao) VALUES (?, ?, ?)`,
                [nomeFuncionario, isAtivo, funcao],
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

    alterarFuncionario(idFuncionario, nomeFuncionario, isAtivo, funcao) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                "UPDATE Funcionario SET nomeFuncionario = ?, isAtivo = ?, funcao = ? WHERE idFuncionario = ?",
                [nomeFuncionario, isAtivo, funcao, idFuncionario],
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

    excluirFuncionario(id) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                "DELETE FROM Funcionario WHERE idFuncionario = ?",
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
}

module.exports = FuncionarioServiceDAO;

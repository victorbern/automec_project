const db = require("../../db");

class ServicoServiceDAO {
    constructor(connection) {
        this._connection = connection;
    }

    buscarTodos() {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `SELECT idServico, descricaoServico, precoServico FROM Servico`,
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
                "SELECT idServico, descricaoServico, precoServico FROM Servico WHERE Servico.idServico = ?",
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
                "SELECT idServico, descricaoServico, precoServico FROM Servico WHERE idServico like ? OR descricaoServico like ?",
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

    inserirServico(descricaoServico, precoServico) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `INSERT INTO Servico (descricaoServico, precoServico) VALUES (?, ?)`,
                [descricaoServico, precoServico],
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

    alterarServico(id, descricaoServico, precoServico) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                "UPDATE Servico SET descricaoServico = ?, precoServico = ? WHERE idServico = ?",
                [descricaoServico, precoServico, id],
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

    excluirServico(id) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                "DELETE FROM Servico WHERE idServico = ?",
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

module.exports = ServicoServiceDAO;

// Alterações feitas no dia 27/08/2022
// Adição de método remover (que apenas altera o valor isAtivo no banco de dados)
// Mudança nas funções buscarTodos e buscarClientePorId (que buscam apenas clientes ativos)
// Implementação do método de busca inteligente

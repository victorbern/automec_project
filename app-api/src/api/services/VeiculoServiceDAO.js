const db = require("../../db");

class VeiculoServiceDAO {
    constructor(connection) {
        this._connection = connection;
    }
    buscarTodos() {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `SELECT v.placaVeiculo, v.marca, v.modelo, v.ano, v.capacidadeOleo, v.cor, 
                    v.idCliente, c.nomeCliente, c.celularCliente FROM Veiculo AS v INNER JOIN Cliente AS c 
                    ON v.idCliente = c.idCliente`,
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

    buscaEspecificaPlaca(placa) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                "SELECT v.placaVeiculo, v.marca, v.modelo, v.ano, v.capacidadeOleo, v.cor, " +
                    "v.idCliente, c.nomeCliente, c.celularCliente FROM Veiculo AS v INNER JOIN Cliente AS c " +
                    "ON v.idCliente = c.idCliente WHERE placaVeiculo = ?",
                [placa],
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

    buscarPorPlaca(placa) {
        placa = "%" + placa + "%";
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                "SELECT v.placaVeiculo, v.marca, v.modelo, v.ano, v.capacidadeOleo, v.cor, " +
                    "v.idCliente, c.nomeCliente, c.celularCliente FROM Veiculo AS v INNER JOIN Cliente AS c " +
                    "ON v.idCliente = c.idCliente WHERE placaVeiculo like ?",
                [placa],
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

    buscaPorValor(valor) {
        valor = "%" + valor + "%";
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `SELECT v.placaVeiculo, v.marca, v.modelo, v.ano, v.capacidadeOleo, v.cor,
            v.idCliente, c.nomeCliente, c.celularCliente FROM Veiculo AS v INNER JOIN Cliente AS c ON v.idCliente = c.idCliente
            WHERE v.placaVeiculo like ? OR v.marca like ? OR v.modelo like ?`,
                [valor, valor, valor],
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

    inserirVeiculo(
        placaVeiculo,
        marca,
        modelo,
        ano,
        capacidadeOleo,
        cor,
        veiculo_idCliente
    ) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `INSERT INTO Veiculo (placaVeiculo, marca, modelo, ano,
                capacidadeOleo, cor, Veiculo.idCliente) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    placaVeiculo,
                    marca,
                    modelo,
                    ano,
                    capacidadeOleo,
                    cor,
                    veiculo_idCliente,
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
    }

    alterarVeiculo(
        placaVeiculo,
        marca,
        modelo,
        ano,
        capacidadeOleo,
        cor,
        veiculo_idCliente
    ) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `UPDATE Veiculo SET marca = ?, modelo = ?, ano = ?, capacidadeOleo = ?,
            cor = ?, Veiculo.idCliente = ? WHERE Veiculo.placaVeiculo = ?`,
                [
                    marca,
                    modelo,
                    ano,
                    capacidadeOleo,
                    cor,
                    veiculo_idCliente,
                    placaVeiculo,
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

    buscarPorCliente(veiculo_idCliente) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                "SELECT v.placaVeiculo, v.marca, v.modelo, v.ano, v.capacidadeOleo, v.cor, " +
                    "v.idCliente, c.nomeCliente, c.celularCliente FROM Veiculo AS v INNER JOIN Cliente AS c " +
                    "ON v.idCliente = c.idCliente WHERE v.idCliente = ?",
                [veiculo_idCliente],
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

    excluirVeiculo(id) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `DELETE FROM Veiculo WHERE placaVeiculo = ?`,
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

module.exports = VeiculoServiceDAO;

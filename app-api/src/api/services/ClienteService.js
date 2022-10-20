const db = require("../../db");

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQuery(
                `SELECT idCliente, nomeCliente, cpfCnpj, celularCliente, telefoneCliente, cep, endereco, numero, bairro, cidade, uf, complemento FROM Cliente`,
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

    buscarPorId: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT idCliente, nomeCliente, cpfCnpj, celularCliente, telefoneCliente, cep, endereco, numero, bairro,
                    cidade, uf, complemento FROM Cliente WHERE Cliente.idCliente = ?`,
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
    },

    buscarPorNomeCliente: (nomeCliente) => {
        nomeCliente = "%" + nomeCliente + "%";
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "SELECT idCliente, nomeCliente, cpfCnpj, celularCliente, telefoneCliente, cep, endereco, numero, bairro, " +
                    "cidade, uf, complemento FROM Cliente WHERE nomeCliente like ?",
                [nomeCliente],
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

    buscaPorValor: (valor) => {
        valor = "%" + valor + "%";
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "SELECT idCliente, nomeCliente, cpfCnpj, celularCliente, telefoneCliente, cep, endereco, numero, bairro, " +
                    "cidade, uf, complemento FROM Cliente WHERE nomeCliente like ? OR cpfCnpj like ?",
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

    inserirCliente: (
        nomeCliente,
        cpfCnpj,
        celularCliente,
        telefoneCliente,
        cep,
        endereco,
        numero,
        bairro,
        cidade,
        uf,
        complemento
    ) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `INSERT INTO Cliente (nomeCliente, cpfCnpj, celularCliente, telefoneCliente, cep, ` +
                    `endereco, numero, bairro, cidade, uf, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    nomeCliente,
                    cpfCnpj,
                    celularCliente,
                    telefoneCliente,
                    cep,
                    endereco,
                    numero,
                    bairro,
                    cidade,
                    uf,
                    complemento,
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

    alterarCliente: (
        id,
        nomeCliente,
        cpfCnpj,
        celularCliente,
        telefoneCliente,
        cep,
        endereco,
        numero,
        bairro,
        cidade,
        uf,
        complemento
    ) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "UPDATE Cliente SET nomeCliente = ?, cpfCnpj = ?, celularCliente = ?, telefoneCliente = ?, " +
                    "cep = ?, endereco = ?, numero = ?, bairro = ?, cidade = ?, uf = ?, complemento = ? WHERE idCliente = ?",
                [
                    nomeCliente,
                    cpfCnpj,
                    celularCliente,
                    telefoneCliente,
                    cep,
                    endereco,
                    numero,
                    bairro,
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

    excluirCliente: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                "DELETE FROM Cliente WHERE idCliente = ?",
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

// Alterações feitas no dia 27/08/2022
// Adição de método remover (que apenas altera o valor isAtivo no banco de dados)
// Mudança nas funções buscarTodos e buscarClientePorId (que buscam apenas clientes ativos)
// Implementação do método de busca inteligente

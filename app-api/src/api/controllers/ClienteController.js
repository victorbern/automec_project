const { json } = require("body-parser");
const AppError = require("../errors/AppError");
const ClienteService = require("../services/ClienteService");
const models = require("../models");
const { Op } = require("sequelize");
const Cliente = models.clienteModel;

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };
        let clientes = await Cliente.findAll().catch((error) => {
            throw new AppError(error, 500);
        });

        for (let i in clientes) {
            json.result.push({
                idCliente: clientes[i].idCliente,
                nomeCliente: clientes[i].nomeCliente,
                cpfCnpj: clientes[i].cpfCnpj,
                celularCliente: clientes[i].celularCliente,
                telefoneCliente: clientes[i].telefoneCliente,
                cep: clientes[i].cep,
                endereco: clientes[i].endereco,
                numero: clientes[i].numero,
                bairro: clientes[i].bairro,
                cidade: clientes[i].cidade,
                uf: clientes[i].uf,
                complemento: clientes[i].complemento,
            });
        }

        res.json(json);
    },

    buscarPorId: async (req, res) => {
        let json = { error: "", result: {} };
        let id = req.params.id;

        let cliente = await Cliente.findByPk(id).catch((error) => {
            throw new AppError(error, 500);
        });

        if (cliente) {
            json.result = cliente;
        }

        res.json(json);
    },

    buscaPorValor: async (req, res) => {
        let json = { error: "", result: [] };
        let valor = req.params.valor;
        let clientes = await Cliente.findAll({
            where: {
                [Op.or]: [
                    {
                        nomeCliente: {
                            [Op.substring]: valor,
                        },
                    },
                    {
                        cpfCnpj: {
                            [Op.substring]: valor,
                        },
                    },
                ],
            },
        });

        for (let i in clientes) {
            json.result.push({
                idCliente: clientes[i].idCliente,
                nomeCliente: clientes[i].nomeCliente,
                cpfCnpj: clientes[i].cpfCnpj,
                celularCliente: clientes[i].celularCliente,
                telefoneCliente: clientes[i].telefoneCliente,
                cep: clientes[i].cep,
                endereco: clientes[i].endereco,
                numero: clientes[i].numero,
                bairro: clientes[i].bairro,
                cidade: clientes[i].cidade,
                uf: clientes[i].uf,
                complemento: clientes[i].complemento,
            });
        }

        res.json(json);
    },

    inserirCliente: async (req, res) => {
        let json = { error: "", result: {} };

        let nomeCliente = req.body.nomeCliente;
        let cpfCnpj = req.body.cpfCnpj;
        let celularCliente = req.body.celularCliente;
        let telefoneCliente = req.body.telefoneCliente;
        let cep = req.body.cep;
        let endereco = req.body.endereco;
        let numero = req.body.numero;
        let bairro = req.body.bairro;
        let cidade = req.body.cidade;
        let uf = req.body.uf;
        let complemento = req.body.complemento;

        if (nomeCliente && celularCliente && cpfCnpj) {
            await Cliente.create({
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
            }).catch((error) => {
                throw new AppError(error, 500);
            });

            json.result = "Dados inseridos com sucesso!";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    alterarCliente: async (req, res) => {
        let json = { error: "", result: {} };

        let idCliente = req.params.id;
        let nomeCliente = req.body.nomeCliente;
        let cpfCnpj = req.body.cpfCnpj;
        let celularCliente = req.body.celularCliente;
        let telefoneCliente = req.body.telefoneCliente;
        let cep = req.body.cep;
        let endereco = req.body.endereco;
        let numero = req.body.numero;
        let bairro = req.body.bairro;
        let cidade = req.body.cidade;
        let uf = req.body.uf;
        let complemento = req.body.complemento;

        if (nomeCliente && celularCliente && cpfCnpj && idCliente) {
            await Cliente.update(
                {
                    nomeCliente: nomeCliente,
                    cpfCnpj: cpfCnpj,
                    celularCliente: celularCliente,
                    telefoneCliente: telefoneCliente,
                    cep: cep,
                    endereco: endereco,
                    numero: numero,
                    bairro: bairro,
                    cidade: cidade,
                    uf: uf,
                    complemento: complemento,
                },
                { where: { idCliente: idCliente } }
            ).catch((error) => {
                throw new AppError(error, 500);
            });

            json.result = "Dados alterados com sucesso!";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    excluirCliente: async (req, res) => {
        let json = { error: "", result: {} };

        let idCliente = req.params.id;

        if (idCliente) {
            await Cliente.destroy({ where: { idCliente: idCliente } }).catch(
                (error) => {
                    throw new AppError(error, 500);
                }
            );
            json.result = "Cliente excluido com sucesso!";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },
};

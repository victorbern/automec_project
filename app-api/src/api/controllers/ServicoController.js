const { json } = require("body-parser");
const AppError = require("../errors/AppError");
const ServicoService = require("../services/ServicoService");
const models = require("../models");
const Servico = models.servicoModel;

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };
        let servicos = await Servico.findAll().catch((error) => {
            throw new AppError(error, 500);
        });
        for (let i in servicos) {
            json.result.push({
                idServico: servicos[i].idServico,
                descricaoServico: servicos[i].descricaoServico,
                precoServico: servicos[i].precoServico,
            });
        }

        res.json(json);
    },

    buscarPorId: async (req, res) => {
        let json = { error: "", result: {} };
        let idServico = req.params.id;
        let servico = await Servico.findByPk(idServico).catch((error) => {
            throw new AppError(error, 500);
        });

        if (servico) {
            json.result = servico;
        }

        res.json(json);
    },

    buscaPorValor: async (req, res) => {
        let json = { error: "", result: [] };
        let valor = req.params.valor;
        let servicos = await Servico.findAll({
            where: {
                [Op.or]: [
                    {
                        idServico: {
                            [Op.substring]: valor,
                        },
                    },
                    {
                        descricaoServico: {
                            [Op.substring]: valor,
                        },
                    },
                ],
            },
        });

        for (let i in servicos) {
            json.result.push({
                idServico: servicos[i].idServico,
                descricaoServico: servicos[i].descricaoServico,
                precoServico: servicos[i].precoServico,
            });
        }

        res.json(json);
    },

    inserirServico: async (req, res) => {
        let json = { error: "", result: {} };

        let descricaoServico = req.body.descricaoServico;
        let precoServico = req.body.precoServico;

        if (descricaoServico && precoServico) {
            await Servico.create({
                descricaoServico,
                precoServico,
            }).catch((error) => {
                throw new AppError(error, 500);
            });
            json.result = "Dados inseridos com sucesso!";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    alterarServico: async (req, res) => {
        let json = { error: "", result: {} };

        let idServico = req.params.id;
        let descricaoServico = req.body.descricaoServico;
        let precoServico = req.body.precoServico;

        if (idServico && descricaoServico && precoServico) {
            await Servico.update(
                {
                    descricaoServico: descricaoServico,
                    precoServico: precoServico,
                },
                {
                    where: { idServico: idServico },
                }
            ).catch((error) => {
                throw new AppError(error, 500);
            });
            json.result = "Dados alterados com sucesso!";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    excluirServico: async (req, res) => {
        let json = { error: "", result: {} };

        let idServico = req.params.id;

        if (idServico) {
            await Servico.destroy({ where: { idServico: idServico } }).catch(
                (error) => {
                    throw new AppError(error, 500);
                }
            );
            json.result = "Serviço excluido com sucesso!";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },
};

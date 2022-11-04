const { json } = require("body-parser");
const AppError = require("../errors/AppError");
const FuncionarioService = require("../services/FuncionarioService");
const models = require("../models");
const { Op } = require("sequelize");
const Funcionario = models.funcionarioModel;

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };

        let funcionarios = await Funcionario.findAll().catch((error) => {
            throw new AppError(error, 500);
        });

        for (let i in funcionarios) {
            json.result.push({
                idFuncionario: funcionarios[i].idFuncionario,
                nomeFuncionario: funcionarios[i].nomeFuncionario,
                isAtivo: funcionarios[i].isAtivo,
                funcao: funcionarios[i].funcao,
            });
        }

        res.json(json);
    },

    buscarPorId: async (req, res) => {
        let json = { error: "", result: {} };
        let idFuncionario = req.params.id;
        let funcionario = await Funcionario.findByPk(idFuncionario).catch(
            (error) => {
                throw new AppError(error, 500);
            }
        );

        if (funcionario) {
            json.result = funcionario;
        }

        res.json(json);
    },

    buscaPorValor: async (req, res) => {
        let json = { error: "", result: [] };
        let valor = req.params.valor;
        let funcionarios = await Funcionario.findAll({
            where: {
                [Op.or]: [
                    {
                        nomeFuncionario: {
                            [Op.substring]: valor,
                        },
                    },
                    {
                        funcao: {
                            [Op.substring]: valor,
                        },
                    },
                ],
            },
        });

        for (let i in funcionarios) {
            json.result.push({
                idFuncionario: funcionarios[i].idFuncionario,
                nomeFuncionario: funcionarios[i].nomeFuncionario,
                isAtivo: funcionarios[i].isAtivo,
                funcao: funcionarios[i].funcao,
            });
        }

        res.json(json);
    },

    inserirFuncionario: async (req, res) => {
        let json = { error: "", result: {} };

        let nomeFuncionario = req.body.nomeFuncionario;
        let isAtivo = req.body.isAtivo;
        let funcao = req.body.funcao;

        if (nomeFuncionario && isAtivo && funcao) {
            await Funcionario.create({
                nomeFuncionario,
                isAtivo,
                funcao,
            }).catch((error) => {
                throw new AppError(error, 500);
            });
            json.result = "Funcionário inserido com sucesso!";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    alterarFuncionario: async (req, res) => {
        let json = { error: "", result: {} };

        let idFuncionario = req.params.id;
        let nomeFuncionario = req.body.nomeFuncionario;
        let isAtivo = req.body.isAtivo;
        let funcao = req.body.funcao;

        if (nomeFuncionario && isAtivo && funcao && idFuncionario) {
            await Funcionario.update(
                {
                    nomeFuncionario: nomeFuncionario,
                    isAtivo: isAtivo,
                    funcao: funcao,
                },
                { where: { idFuncionario: idFuncionario } }
            ).catch((error) => {
                throw new AppError(error, 500);
            });
            json.result = "Dados alterados com sucesso!";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    excluirFuncionario: async (req, res) => {
        let json = { error: "", result: {} };

        let idFuncionario = req.params.id;

        if (idFuncionario) {
            await Funcionario.destroy({
                where: { idFuncionario: idFuncionario },
            }).catch((error) => {
                throw new AppError(error, 500);
            });
            json.result = "Funcionário excluido com sucesso!";
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },
};

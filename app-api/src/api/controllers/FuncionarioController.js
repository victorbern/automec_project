const { json } = require("body-parser");
const AppError = require("../errors/AppError");
const FuncionarioService = require("../services/FuncionarioService");

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };
        let funcionarios = await FuncionarioService.buscarTodos().catch(
            (error) => {
                throw new AppError(error, 500);
            }
        );

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
        let funcionario = await FuncionarioService.buscarPorId(
            idFuncionario
        ).catch((error) => {
            throw new AppError(error, 500);
        });

        if (funcionario) {
            json.result = funcionario;
        }

        res.json(json);
    },

    buscaPorValor: async (req, res) => {
        let json = { error: "", result: [] };
        let valor = req.params.valor;
        let funcionarios = await FuncionarioService.buscaPorValor(valor).catch(
            (error) => {
                throw new AppError(error, 500);
            }
        );

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
            let IdFuncionario = await FuncionarioService.inserirFuncionario(
                nomeFuncionario,
                isAtivo,
                funcao
            ).catch((error) => {
                throw new AppError(error, 500);
            });
            json.result = {
                idFuncionario: IdFuncionario,
                nomeFuncionario,
                isAtivo,
                funcao,
            };
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
            await FuncionarioService.alterarFuncionario(
                idFuncionario,
                nomeFuncionario,
                isAtivo,
                funcao
            ).catch((error) => {
                throw new AppError(error, 500);
            });
            json.result = {
                idFuncionario,
                nomeFuncionario,
                isAtivo,
                funcao,
            };
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    excluirFuncionario: async (req, res) => {
        let json = { error: "", result: {} };

        let id = req.params.id;

        if (id) {
            await FuncionarioService.excluirFuncionario(id).catch((error) => {
                throw new AppError(error, 500);
            });
            json.result = { id };
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },
};

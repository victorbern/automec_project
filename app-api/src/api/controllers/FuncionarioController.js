const { json } = require("body-parser");
const FuncionarioService = require("../services/FuncionarioService");

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };
        let funcionarios = await FuncionarioService.buscarTodos().catch(
            (error) => {
                json.error = error;
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
            json.error = error;
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
                json.error = error;
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
            )
                .then(() => {
                    json.result = {
                        idFuncionario: IdFuncionario,
                        nomeFuncionario,
                        isAtivo,
                        funcao,
                    };
                })
                .catch((error) => {
                    json.error = error;
                });
        } else {
            json.error = "Campos não enviados";
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
            )
                .then(() => {
                    json.result = {
                        idFuncionario,
                        nomeFuncionario,
                        isAtivo,
                        funcao,
                    };
                })
                .catch((error) => {
                    json.error = error;
                });
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },

    excluirFuncionario: async (req, res) => {
        let json = { error: "", result: {} };

        let id = req.params.id;

        if (id) {
            await FuncionarioService.excluirFuncionario(id)
                .then(() => {
                    json.result = { id };
                })
                .catch((error) => {
                    json.error = error;
                });
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },
};

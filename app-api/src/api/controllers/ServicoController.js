const { json } = require("body-parser");
const AppError = require("../errors/AppError");
const ServicoService = require("../services/ServicoService");
const ServicoServiceDAO = require("../services/ServicoServiceDAO");

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };
        let servicos = await new ServicoServiceDAO(req.connection)
            .buscarTodos()
            .catch((error) => {
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
        let id = req.params.id;
        let servico = await new ServicoServiceDAO(req.connection)
            .buscarPorId(id)
            .catch((error) => {
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
        let servicos = await new ServicoServiceDAO(req.connection)
            .buscaPorValor(valor)
            .catch((error) => {
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

    inserirServico: async (req, res) => {
        let json = { error: "", result: {} };

        let descricaoServico = req.body.descricaoServico;
        let precoServico = req.body.precoServico;

        if (descricaoServico && precoServico) {
            let IdServico = await new ServicoServiceDAO(req.connection)
                .inserirServico(descricaoServico, precoServico)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            json.result = {
                idServico: IdServico,
                descricaoServico: descricaoServico,
                precoServico: precoServico,
            };
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    alterarServico: async (req, res) => {
        let json = { error: "", result: {} };

        let id = req.params.id;
        let descricaoServico = req.body.descricaoServico;
        let precoServico = req.body.precoServico;

        if (id && descricaoServico && precoServico) {
            await new ServicoServiceDAO(req.connection)
                .alterarServico(id, descricaoServico, precoServico)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            json.result = {
                id,
                descricaoServico,
                precoServico,
            };
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    excluirServico: async (req, res) => {
        let json = { error: "", result: {} };

        let id = req.params.id;

        if (id) {
            await new ServicoServiceDAO(req.connection)
                .excluirServico(id)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            json.result = {
                id,
            };
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },
};

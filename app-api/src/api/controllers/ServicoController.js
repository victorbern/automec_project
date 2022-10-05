const { json } = require("body-parser");
const ServicoService = require("../services/ServicoService");

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };
        let servicos = await ServicoService.buscarTodos().catch((error) => {
            json.error = error;
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
        let servico = await ServicoService.buscarPorId(id).catch((error) => {
            json.error = error;
        });

        if (servico) {
            json.result = servico;
        }

        res.json(json);
    },

    buscaPorValor: async (req, res) => {
        let json = { error: "", result: [] };
        let valor = req.params.valor;
        let servicos = await ServicoService.buscaPorValor(valor).catch(
            (error) => {
                json.error = error;
            }
        );

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
            let IdServico = await ServicoService.inserirServico(
                descricaoServico,
                precoServico
            )
                .then(() => {
                    json.result = {
                        idServico: IdServico,
                        descricaoServico: descricaoServico,
                        precoServico: precoServico,
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

    alterarServico: async (req, res) => {
        let json = { error: "", result: {} };

        let id = req.params.id;
        let descricaoServico = req.body.descricaoServico;
        let precoServico = req.body.precoServico;

        if (id && descricaoServico && precoServico) {
            await ServicoService.alterarServico(
                id,
                descricaoServico,
                precoServico
            )
                .then(() => {
                    json.result = {
                        id,
                        descricaoServico,
                        precoServico,
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

    excluirServico: async (req, res) => {
        let json = { error: "", result: {} };

        let id = req.params.id;

        if (id) {
            await ServicoService.excluirServico(id)
                .then(() => {
                    json.result = {
                        id,
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
};

const { json } = require("body-parser");
const ClienteService = require("../services/ClienteService");

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };
        let pagamentos = await ClienteService.buscarTodos().catch((error) => {
            json.error = error;
        });

        for (let i in clientes) {
            json.result.push({
                idCliente: clientes[i].idCliente,
                nomeCliente: clientes[i].nomeCliente,
                cpfCnpj: clientes[i].cpfCnpj,
                celularCliente: clientes[i].celularCliente,
                cep: clientes[i].cep,
                endereco: clientes[i].endereco,
                numero: clientes[i].numero,
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
        let cliente = await ClienteService.buscarPorId(id).catch((error) => {
            json.error = error;
        });

        if (cliente) {
            json.result = cliente;
        }

        res.json(json);
    },

    buscaPorValor: async (req, res) => {
        let json = { error: "", result: [] };
        let valor = req.params.valor;
        let clientes = await ClienteService.buscaPorValor(valor).catch(
            (error) => {
                json.error = error;
            }
        );

        for (let i in clientes) {
            json.result.push({
                idCliente: clientes[i].idCliente,
                nomeCliente: clientes[i].nomeCliente,
                cpfCnpj: clientes[i].cpfCnpj,
                celularCliente: clientes[i].celularCliente,
                cep: clientes[i].cep,
                endereco: clientes[i].endereco,
                numero: clientes[i].numero,
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
        let cep = req.body.cep;
        let endereco = req.body.endereco;
        let numero = req.body.numero;
        let cidade = req.body.cidade;
        let uf = req.body.uf;
        let complemento = req.body.complemento;

        if (nomeCliente && celularCliente && cpfCnpj) {
            let IdCliente = await ClienteService.inserirCliente(
                nomeCliente,
                cpfCnpj,
                celularCliente,
                cep,
                endereco,
                numero,
                cidade,
                uf,
                complemento
            ).catch((error) => {
                json.error = error;
            });

            json.result = {
                id: IdCliente,
                nomeCliente,
                cpfCnpj,
                celularCliente,
                cep,
                endereco,
                numero,
                cidade,
                uf,
                complemento,
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },

    alterarCliente: async (req, res) => {
        let json = { error: "", result: {} };

        let id = req.params.id;
        let nomeCliente = req.body.nomeCliente;
        let cpfCnpj = req.body.cpfCnpj;
        let celularCliente = req.body.celularCliente;
        let cep = req.body.cep;
        let endereco = req.body.endereco;
        let numero = req.body.numero;
        let cidade = req.body.cidade;
        let uf = req.body.uf;
        let complemento = req.body.complemento;

        if (nomeCliente && celularCliente && cpfCnpj && id) {
            await ClienteService.alterarCliente(
                id,
                nomeCliente,
                cpfCnpj,
                celularCliente,
                cep,
                endereco,
                numero,
                cidade,
                uf,
                complemento
            ).catch((error) => {
                json.error = error;
            });
            json.result = {
                id,
                nomeCliente,
                cpfCnpj,
                celularCliente,
                cep,
                endereco,
                numero,
                cidade,
                uf,
                complemento,
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },

    excluirCliente: async (req, res) => {
        let json = { error: "", result: {} };

        let id = req.params.id;

        if (id) {
            await ClienteService.excluirCliente(id).catch((error) => {
                json.error = error;
            });
            json.result = {
                id,
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },
};

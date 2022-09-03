const { json } = require("body-parser");
const ClienteService = require("../services/ClienteService");
const OrdemServicoService = require("../services/OrdemServicoService");

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {error: '', result: []};
        let ordens = await OrdemServicoService.buscarTodos();

        for (let i in ordens){
            json.result.push({
                idOrdemServico: ordens[i].idOrdemServico,
                dataOrdemServico: ordens[i].dataOrdemServico,
                total: ordens[i].total,
                km: ordens[i].km,
                isFinalizada: ordens[i].isFinalizada,
                isPaga: ordens[i].isPaga,
                os_idCliente: ordens[i].idCliente
            });
        }
        
        res.json(json);
    },

    buscarPorId: async(req, res) => {
        let json = {error: '', result: {}};
        let idOrdemServico = req.params.id;
        let ordem = await OrdemServicoService.buscarPorId(idOrdemServico);

        if(ordem){
            json.result = ordem;
        }

        res.json(json);
    },

    inserirCliente: async(req, res) => {
        let json = {error: '', result: {}};
        
        let nomeCliente = req.body.nomeCliente;
        let cpfCnpj = req.body.cpfCnpj;
        let celularCliente = req.body.celularCliente;
        let cep = req.body.cep;
        let endereco = req.body.endereco;
        let numero = req.body.numero;
        let cidade = req.body.cidade;
        let uf = req.body.uf;
        let complemento = req.body.complemento;

        if(nomeCliente && celularCliente && cpfCnpj){
            let IdCliente = await ClienteService.inserirCliente(nomeCliente, cpfCnpj, celularCliente, cep, 
                            endereco, numero, cidade, uf, complemento);
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
                complemento
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    },

    alterarOrdemServico: async(req, res) => {
        let json = {error: '', result: {}};

        let idOrdemServico = req.params.id;
        let dataOrdemServico = req.body.dataOrdemServico;
        let total = req.body.total;
        let km = req.body.km;
        let isFinalizada = req.body.isFinalizada;
        let isPaga = req.body.isPaga;
        let os_idCliente = req.body.os_idCliente;

        if(dataOrdemServico && total && os_idCliente){
            await OrdemServicoService.alterarOrdemServico(idOrdemServico, dataOrdemServico, total, km, isFinalizada,
                isPaga, os_idCliente);
            json.result = {
                idOrdemServico, 
                dataOrdemServico, 
                total, 
                km, 
                isFinalizada,
                isPaga, 
                os_idCliente
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.js;
    }

}

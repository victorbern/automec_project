const { json } = require("body-parser");
const VeiculoService = require("../services/VeiculoService");

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {error: '', result: []};
        let veiculos = await VeiculoService.buscarTodos();

        for (let i in veiculos){
            json.result.push({
                placaVeiculo: veiculos[i].placaVeiculo,
                marca: veiculos[i].marca,
                modelo: veiculos[i].modelo,
                ano: veiculos[i].ano,
                capacidadeOleo: veiculos[i].capacidadeOleo,
                cor: veiculos[i].cor,
                veiculo_idCliente: veiculos[i].idCliente
            });
        }
        
        res.json(json);
    },

    buscarPorPlaca: async(req, res) => {
        let json = {error: '', result: {}};
        let placa = req.params.placa;
        let veiculo = await VeiculoService.buscarPorPlaca(placa);

        if(veiculo){
            json.result = veiculo;
        }

        res.json(json);
    },

    buscaPorValor: async(req, res) => {
        let json = {error: '', result: []};
        let valor = req.params.valor;
        let veiculos = await VeiculoService.buscaPorValor(valor);

        for (let i in veiculos){
            json.result.push({
                placaVeiculo: veiculos[i].placaVeiculo,
                marca: veiculos[i].marca,
                modelo: veiculos[i].modelo,
                ano: veiculos[i].ano,
                capacidadeOleo: veiculos[i].capacidadeOleo,
                cor: veiculos[i].cor,
                veiculo_idCliente: veiculos[i].veiculo_idCliente
            });
        }
        
        res.json(json);
    },

    inserirVeiculo: async(req, res) => {
        let json = {error: '', result: {}};
        
        let placaVeiculo = req.body.placaVeiculo;
        let marca = req.body.marca;
        let modelo = req.body.modelo;
        let ano = req.body.ano;
        let capacidadeOleo = req.body.capacidadeOleo;
        let cor = req.body.cor;
        let veiculo_idCliente = req.body.veiculo_idCliente;
        
        if(placaVeiculo && marca && modelo && ano){
            await VeiculoService.inserirVeiculo(placaVeiculo, marca, modelo, ano, 
                            capacidadeOleo, cor, veiculo_idCliente);
            json.result = {
                placaVeiculo, 
                marca, 
                modelo, 
                ano, 
                capacidadeOleo, 
                cor, 
                veiculo_idCliente
            };

        } else {
            json.error = "Campos não enviados";
        }
        
        res.json(json);
    },

    alterarVeiculo: async(req, res) => {
        let json = {error: '', result: {}};

        let placaVeiculo = req.params.placa;
        let marca = req.body.marca;
        let modelo = req.body.modelo;
        let ano = req.body.ano;
        let capacidadeOleo = req.body.capacidadeOleo;
        let cor = req.body.cor;
        let veiculo_idCliente = req.body.veiculo_idCliente;

        if(placaVeiculo && marca && modelo && ano){
            await VeiculoService.alterarVeiculo(placaVeiculo, marca, modelo, ano, 
                capacidadeOleo, cor, veiculo_idCliente);
            json.result = {
                placaVeiculo, 
                marca, 
                modelo, 
                ano, 
                capacidadeOleo, 
                cor, 
                veiculo_idCliente
            };
        } else {
            json.error = "Campos não enviados";
        }
        res.json(json);
    },

    buscarPorCliente: async(req, res) => {
        let json = {error: '', result: []};
        let veiculo_idCliente = req.params.idCliente;
        let veiculos = await VeiculoService.buscarPorCliente(veiculo_idCliente);

        for (let i in veiculos){
            json.result.push({
                placaVeiculo: veiculos[i].placaVeiculo,
                marca: veiculos[i].marca,
                modelo: veiculos[i].modelo,
                ano: veiculos[i].ano,
                capacidadeOleo: veiculos[i].capacidadeOleo,
                cor: veiculos[i].cor,
                veiculo_idCliente: veiculos[i].idCliente
            });
        }
        
        res.json(json);
    },

    excluirVeiculo: async (req, res) => {
        let json = {error: '', result: {}};

        let placaVeiculo = req.params.placa;

        if(placaVeiculo){
            await VeiculoService.excluirVeiculo(placaVeiculo);
            json.result = {
                placaVeiculo: placaVeiculo
            };
        } else {
            json.error = "Campos não enviados";
        }

        res.json(json);
    }

}

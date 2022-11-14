const { json } = require("body-parser");
const AppError = require("../errors/AppError");
const VeiculoService = require("../services/VeiculoService");
const VeiculoServiceDAO = require("../services/VeiculoServiceDAO");

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };
        let veiculos = await new VeiculoServiceDAO(req.connection)
            .buscarTodos()
            .catch((error) => {
                throw new AppError(error, 500);
            });

        for (let i in veiculos) {
            json.result.push({
                placaVeiculo: veiculos[i].placaVeiculo,
                marca: veiculos[i].marca,
                modelo: veiculos[i].modelo,
                ano: veiculos[i].ano,
                capacidadeOleo: veiculos[i].capacidadeOleo,
                cor: veiculos[i].cor,
                veiculo_idCliente: veiculos[i].idCliente,
                nomeCliente: veiculos[i].nomeCliente,
                celularCliente: veiculos[i].celularCliente,
            });
        }

        res.json(json);
    },

    buscarPorPlaca: async (req, res) => {
        let json = { error: "", result: [] };
        let placa = req.params.placa;
        let veiculo = await new VeiculoServiceDAO(req.connection)
            .buscaEspecificaPlaca(placa)
            .catch((error) => {
                throw new AppError(error, 500);
            });
        json.result.push({
            placaVeiculo: veiculo.placaVeiculo,
            marca: veiculo.marca,
            modelo: veiculo.modelo,
            ano: veiculo.ano,
            capacidadeOleo: veiculo.capacidadeOleo,
            cor: veiculo.cor,
            veiculo_idCliente: veiculo.idCliente,
            nomeCliente: veiculo.nomeCliente,
            celularCliente: veiculo.celularCliente,
        });

        res.json(json);
    },

    buscaPorValor: async (req, res) => {
        let json = { error: "", result: [] };
        let valor = req.params.valor;
        let veiculos = await new VeiculoServiceDAO(req.connection)
            .buscaPorValor(valor)
            .catch((error) => {
                throw new AppError(error, 500);
            });

        for (let i in veiculos) {
            json.result.push({
                placaVeiculo: veiculos[i].placaVeiculo,
                marca: veiculos[i].marca,
                modelo: veiculos[i].modelo,
                ano: veiculos[i].ano,
                capacidadeOleo: veiculos[i].capacidadeOleo,
                cor: veiculos[i].cor,
                veiculo_idCliente: veiculos[i].idCliente,
                nomeCliente: veiculos[i].nomeCliente,
                celularCliente: veiculos[i].celularCliente,
            });
        }

        res.json(json);
    },

    inserirVeiculo: async (req, res) => {
        let json = { error: "", result: {} };

        let placaVeiculo = req.body.placaVeiculo;
        let marca = req.body.marca;
        let modelo = req.body.modelo;
        let ano = req.body.ano;
        let capacidadeOleo = req.body.capacidadeOleo;
        let cor = req.body.cor;
        let veiculo_idCliente = req.body.veiculo_idCliente;

        if (placaVeiculo && marca && modelo && veiculo_idCliente) {
            await new VeiculoServiceDAO(req.connection)
                .inserirVeiculo(
                    placaVeiculo,
                    marca,
                    modelo,
                    ano,
                    capacidadeOleo,
                    cor,
                    veiculo_idCliente
                )
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            json.result = {
                placaVeiculo,
                marca,
                modelo,
                ano,
                capacidadeOleo,
                cor,
                veiculo_idCliente,
            };
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },

    alterarVeiculo: async (req, res) => {
        let json = { error: "", result: {} };

        let placaVeiculo = req.params.placa;
        let marca = req.body.marca;
        let modelo = req.body.modelo;
        let ano = req.body.ano;
        let capacidadeOleo = req.body.capacidadeOleo;
        let cor = req.body.cor;
        let veiculo_idCliente = req.body.veiculo_idCliente;

        if (placaVeiculo && marca && modelo && veiculo_idCliente) {
            await new VeiculoServiceDAO(req.connection)
                .alterarVeiculo(
                    placaVeiculo,
                    marca,
                    modelo,
                    ano,
                    capacidadeOleo,
                    cor,
                    veiculo_idCliente
                )
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            json.result = {
                placaVeiculo,
                marca,
                modelo,
                ano,
                capacidadeOleo,
                cor,
                veiculo_idCliente,
            };
        } else {
            throw new AppError("Campos não enviados", 400);
        }
        res.json(json);
    },

    buscarPorCliente: async (req, res) => {
        let json = { error: "", result: [] };
        let veiculo_idCliente = req.params.idCliente;
        let veiculos = await new VeiculoServiceDAO(req.connection)
            .buscarPorCliente(veiculo_idCliente)
            .catch((error) => {
                throw new AppError(error, 500);
            });

        for (let i in veiculos) {
            json.result.push({
                placaVeiculo: veiculos[i].placaVeiculo,
                marca: veiculos[i].marca,
                modelo: veiculos[i].modelo,
                ano: veiculos[i].ano,
                capacidadeOleo: veiculos[i].capacidadeOleo,
                cor: veiculos[i].cor,
                veiculo_idCliente: veiculos[i].idCliente,
                nomeCliente: veiculos[i].nomeCliente,
                celularCliente: veiculos[i].celularCliente,
            });
        }

        res.json(json);
    },

    excluirVeiculo: async (req, res) => {
        let json = { error: "", result: {} };

        let placaVeiculo = req.params.placa;

        if (placaVeiculo) {
            await new VeiculoServiceDAO(req.connection)
                .excluirVeiculo(placaVeiculo)
                .catch((error) => {
                    throw new AppError(error, 500);
                });
            json.result = {
                placaVeiculo: placaVeiculo,
            };
        } else {
            throw new AppError("Campos não enviados", 400);
        }

        res.json(json);
    },
};

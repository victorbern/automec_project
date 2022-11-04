const { json } = require("body-parser");
const AppError = require("../errors/AppError");
const RelatorioService = require("../services/RelatorioService");
var sd = require("silly-datetime");
// const pagamentoPDF = require("../classes/pagamentos");

module.exports = {
    buscarPagamentos: async (req, res) => {
        let json = { error: "", result: { total: null, tipos: [] } };
        let dataDe = req.body.dataDe;
        let dataAte = req.body.dataAte;

        dataDe = sd.format(dataDe, "YYYY-MM-DD");
        dataAte = sd.format(dataAte, "YYYY-MM-DD");

        let pagamentos = await RelatorioService.buscarPagamentos(
            dataDe,
            dataAte
        ).catch((error) => {
            throw new AppError(error, 500);
        });

        // Soma todos os totais de pagamento
        let total = 0;
        pagamentos.forEach(
            (pagamento, index, array) => (total += pagamento.total)
        );

        // Cria um array tipo que armazena todos os tipos presentes nestes pagamentos
        let tipo = [];
        for (let i in pagamentos) {
            let existe = false;
            for (let j in tipo) {
                if (tipo[j] === pagamentos[i].formaPagamento) {
                    existe = true;
                }
            }
            if (!existe) {
                tipo.push(pagamentos[i].formaPagamento);
            }
        }

        // Armazena os dados dos pagamentos separando por tipo
        let dados = [];
        for (let i in tipo) {
            let dado = pagamentos.filter(
                (pagamento, index, array) =>
                    pagamento.formaPagamento === tipo[i]
            );
            dados.push(dado);
        }

        // Soma do total por tipo
        let totalTipo = [];
        for (let i in dados) {
            let soma = 0;
            dados[i].forEach(
                (pagamento, index, array) => (soma += pagamento.total)
            );
            totalTipo[i] = soma;
        }

        // Monta o array com os pagamentos já separados
        json.result.total = total;
        for (let i in tipo) {
            json.result.tipos.push({
                tipo: tipo[i],
                total: totalTipo[i],
                pagamentos: dados[i],
            });
        }
        res.json(json);
    },

    buscarOrdens: async (req, res) => {
        let json = {
            error: "",
            result: {
                total: 0,
                subtotalPagas: 0,
                subtotalNaoPagas: 0,
                pagas: [],
                naoPagas: [],
            },
        };
        let dataDe = req.body.dataDe;
        let dataAte = req.body.dataAte;

        dataDe = sd.format(dataDe, "YYYY-MM-DD");

        dataAte = sd.format(dataAte, "YYYY-MM-DD");

        let ordens = await RelatorioService.buscarOrdens(dataDe, dataAte).catch(
            (error) => {
                throw new AppError(error, 500);
            }
        );

        // Soma todos os totais de pagamento
        let total = 0;
        ordens.forEach((ordem, index, array) => (total += ordem.total));
        let ordensPagas = ordens.filter(
            (ordem, index, array) => ordem.isPaga == true
        );
        let ordensNaoPagas = ordens.filter(
            (ordem, index, array) => ordem.isPaga == false
        );
        let subtotalPagas = 0;
        ordensPagas.forEach(
            (ordem, index, array) => (subtotalPagas += ordem.total)
        );
        let subtotalNaoPagas = 0;
        ordensNaoPagas.forEach(
            (ordem, index, array) => (subtotalNaoPagas += ordem.total)
        );
        json.result.total = total;
        json.result.subtotalPagas = subtotalPagas;
        json.result.subtotalNaoPagas = subtotalNaoPagas;
        json.result.pagas = ordensPagas;
        json.result.naoPagas = ordensNaoPagas;
        res.json(json);
    },

    buscarProdutos: async (req, res) => {
        let json = { error: "", result: {} };

        let dataDe = req.body.dataDe;
        let dataAte = req.body.dataAte;

        dataDe = sd.format(dataDe, "YYYY-MM-DD");
        dataAte = sd.format(dataAte, "YYYY-MM-DD");

        let vendasOS = await RelatorioService.buscarProdutosOrdemServico(
            dataDe,
            dataAte
        ).catch((error) => {
            throw new AppError(error, 500);
        });

        let vendasVD = await RelatorioService.buscarProdutosVendaDireta(
            dataDe,
            dataAte
        ).catch((error) => {
            throw new AppError(error, 500);
        });

        vendasOS.forEach((vendaOS, index, array) => {
            let found = vendasVD.find(
                (vendaVD) => vendaVD.codigoBarras == vendaOS.codigoBarras
            );
            if (found) {
                vendaOS.totalVendido =
                    vendaOS.totalVendido * 1 + found.totalVendido * 1;
            }
        });
        let vendas = vendasOS;
        vendasVD.forEach((vendaVD, index, array) => {
            let found = vendas.find(
                (venda) => venda.codigoBarras == vendaVD.codigoBarras
            );
            if (!found) {
                vendas.push(vendaVD);
            }
        });
        vendas.sort(function (a, b) {
            if (a.totalVendido > b.totalVendido) {
                return -1;
            }
            if (a.totalVendido < b.totalVendido) {
                return 1;
            }
            return 0;
        });
        json.result = vendas;
        res.json(json);
    },
};

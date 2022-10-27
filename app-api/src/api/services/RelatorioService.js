const db = require("../../db");

module.exports = {
    buscarPagamentos: (dataDe, dataAte) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT idPagamento, total, formaPagamento, dataHora FROM Pagamento WHERE dataHora BETWEEN ? AND ? ORDER BY dataHora DESC`,
                [dataDe, dataAte, dataDe],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results);
                }
            );
        });
    },

    buscarOrdens: (dataDe, dataAte) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT * FROM OrdemServico AS os INNER JOIN OSDetalhes AS osd ON os.idOrdemServico = osd.idOrdemServico WHERE osd.dataOS BETWEEN ? AND ? ORDER BY dataOS DESC`,
                [dataDe, dataAte],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results);
                }
            );
        });
    },

    buscarProdutosOrdemServico: (dataDe, dataAte) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT p.codigoBarras, p.descricao, SUM(p_osd.quantidadeVendida) AS 'totalVendido' FROM Produto_has_OSDetalhes AS p_osd INNER JOIN OSDetalhes AS osd ON osd.idOSDetalhes = p_osd.idOSDetalhes INNER JOIN Produto AS p ON p_osd.codigoBarras = p.codigoBarras WHERE osd.dataOS BETWEEN ? AND ? GROUP BY p_osd.codigoBarras`,
                [dataDe, dataAte],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results);
                }
            );
        });
    },

    buscarProdutosVendaDireta: (dataDe, dataAte) => {
        return new Promise((aceito, rejeitado) => {
            db.executeSQLQueryParams(
                `SELECT p.codigoBarras, p.descricao, SUM(p_vd.quantidadeVendida) AS 'totalVendido' FROM Produto_has_VendaDireta AS p_vd INNER JOIN VendaDireta AS vd ON vd.idVendaDireta = p_vd.idVendaDireta INNER JOIN Produto AS p ON p_vd.codigoBarras = p.codigoBarras WHERE vd.dataHora BETWEEN ? AND ? GROUP BY p_vd.codigoBarras`,
                [dataDe, dataAte],
                (error, results) => {
                    if (error) {
                        rejeitado(error);
                        return;
                    }
                    aceito(results);
                }
            );
        });
    },
};

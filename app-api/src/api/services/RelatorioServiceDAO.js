const db = require("../../db");

class RelatorioServiceDAO {
    constructor(connection) {
        this._connection = connection;
    }

    buscarPagamentos(dataDe, dataAte) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `SELECT idPagamento, total, formaPagamento, dataHora FROM Pagamento WHERE cast(dataHora AS DATE) BETWEEN cast(? AS DATE) AND cast(? AS DATE) ORDER BY dataHora DESC`,
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
    }

    buscarOrdens(dataDe, dataAte) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `SELECT * FROM OrdemServico AS os INNER JOIN OSDetalhes AS osd ON os.idOrdemServico = osd.idOrdemServico WHERE cast(osd.dataOS AS DATE) BETWEEN cast(? AS DATE) AND cast(? AS DATE) ORDER BY dataOS DESC`,
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
    }

    buscarProdutosOrdemServico(dataDe, dataAte) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
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
    }

    buscarProdutosVendaDireta(dataDe, dataAte) {
        return new Promise((aceito, rejeitado) => {
            this._connection.query(
                `SELECT p.codigoBarras, p.descricao, SUM(p_vd.quantidadeVendida) AS 'totalVendido' FROM Produto_has_VendaDireta AS p_vd INNER JOIN VendaDireta AS vd ON vd.idVendaDireta = p_vd.idVendaDireta INNER JOIN Produto AS p ON p_vd.codigoBarras = p.codigoBarras WHERE cast(vd.dataHora AS DATE) BETWEEN cast(? AS DATE) AND cast(? AS DATE) GROUP BY p_vd.codigoBarras`,
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
    }
}

module.exports = RelatorioServiceDAO;

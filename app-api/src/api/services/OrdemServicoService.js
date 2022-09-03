const db = require("../../db");

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM OrdemServico', (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarPorId: (idOrdemServico) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM OrdemServico WHERE OrdemServico.idCliente = ?', [idOrdemServico], (error, results) => {
                if(error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserirCliente: (nomeCliente, cpfCnpj, celularCliente, cep, 
        endereco, numero, cidade, uf, complemento) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`INSERT INTO cliente (nomeCliente, cpfCnpj, celularCliente, cep,` +
                `endereco, numero, cidade, uf, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [nomeCliente, cpfCnpj, celularCliente, cep, endereco, numero, cidade, uf, complemento],
            (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results.insertId);
            });
        });
    },

    alterarOrdemServico: (idOrdemServico, dataOrdemServico, total, km,
        isFinalizada, isPaga, os_idCliente) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE OrdemServico SET dataOrdemServico = ?, total = ?, km = ?,' +
                'isFinalizada = ?, isPaga = ?, OrdemServico.idCliente = ? WHERE idOrdemServico = ?', 
                [dataOrdemServico, total, km, isFinalizada, isPaga, os_idCliente, idOrdemServico], (error, results) => {
                    if(error) {rejeitado(error); return; }
                    aceito(results);
            });
        });
    }
};
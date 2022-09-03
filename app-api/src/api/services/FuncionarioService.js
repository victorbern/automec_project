const db = require("../../db");

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM funcionario', (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarPorId: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM funcionario WHERE funcionario.idFuncionario = ?', [id], (error, results) => {
                if(error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    buscaPorValor: (valor) => {
        valor = "%"+valor+"%";
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT idFuncionario, nomeFuncionario, isAtivo, funcao FROM Funcionario WHERE nomeFuncionario like ? OR funcao like ?', 
            [valor, valor], (error, results) => {
                if (error) {rejeitado(error); return; }
                if (results.length > 0){
                    aceito(results);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserirFuncionario: (nomeFuncionario, isAtivo, funcao) => {
        return new Promise((aceito, rejeitado) => {
            db.query(`INSERT INTO funcionario (nomeFuncionario, isAtivo, funcao) VALUES (?, ?, ?)`, [nomeFuncionario, isAtivo, funcao],
            (error, results) => {
                if(error) {rejeitado(error); return; }
                aceito(results.insertId);
            });
        });
    },

    alterarFuncionario: (idFuncionario, nomeFuncionario, isAtivo, funcao) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE funcionario SET nomeFuncionario = ?, isAtivo = ?, funcao = ? WHERE idFuncionario = ?', 
                [nomeFuncionario, isAtivo, funcao, idFuncionario], (error, results) => {
                    if(error) {rejeitado(error); return; }
                    aceito(results);
            });
        });
    },

    excluirFuncionario: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM Funcionario WHERE idFuncionario = ?', [id], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};
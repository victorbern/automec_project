const db = require('./db');

let clientes = require('./api/dados/clientes.json');
const ClienteService = require('./api/services/ClienteService');
module.exports = {
    inserirDados: async (req, res) => {
        for (let i in clientes){
            if (!ClienteService.buscarPorId(clientes[i])){
                
                ClienteService.inserirCliente(clientes[i]);
            }
        }
    }

}
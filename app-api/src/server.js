require('dotenv').config({path:"variaveis.env"});
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
let dados = require('./database')
// dados.inserirDados();
const app = express();

const routes = require("./api/routes/routes");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api", routes);
app.get('/', (req, res) => res.send("Aplicação Rodando!"))

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
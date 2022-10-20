const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// const User = require("./models/User");

// app.get("/", (req, res) => {
//     res.status(200).json({ msg: "Bem vindo a nossa API!" });
// });

// // Private Route
// app.get("/user/:id", checkToken, async (req, res) => {
//     const id = req.params.id;

//     const user = await User.findById(id, "-password");

//     if (!user) {
//         return res.status(404).json({ msg: "Usuário não encontrado!" });
//     }

//     res.status(200).json({ user });
// });

// function checkToken(req, res, next) {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ msg: "Acesso negado!" });
//     }

//     try {
//         const secret = process.env.SECRET;

//         jwt.verify(token, secret);

//         next();
//     } catch (error) {
//         res.status(400).json({ msg: "Token inválido!" });
//     }
// }

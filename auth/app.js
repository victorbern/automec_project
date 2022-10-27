require("dotenv").config();
require("./config/db_login").connect();
const express = require("express");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Logic goes here

// Registrar usuário
app.post("/auth/registrar", async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name) {
        return res.status(422).json({ msg: "O nome é obrigatório" });
    }
    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório" });
    }
    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória" });
    }
    if (password !== confirmPassword) {
        return res.status(422).json({ msg: "As senhas não conferem!" });
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
        return res
            .status(422)
            .json({ msg: "Por favor, utilize outro e-mail!" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
        name,
        email,
        password: passwordHash,
    });

    try {
        await user.save();

        res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
        });
    }
});

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório" });
    }
    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(404).json({ msg: "Usuário não existe!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(422).json({ msg: "Senha inválida!" });
    }

    try {
        const secret = process.env.SECRET;
        const token = jwt.sign(
            {
                id: user.id,
            },
            secret
        );

        res.status(200).json({
            msg: "Autenticação realizada com sucesso! ",
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
        });
    }
});

app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

module.exports = app;

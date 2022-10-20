const jwt = require("jsonwebtoken");

const config = process.env.SECRET;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" });
    }

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret);

        next();
    } catch (error) {
        res.status(400).json({ msg: "Token inválido!" });
    }
};
// const token =
//     req.body.token || req.query.token || req.headers["x-access-token"];

// if (!token) {
//     return res.status(403).send("A token is required for authentication");
// }
// try {
//     const decoded = jwt.verify(token, config);
//     req.user = decoded;
// } catch (err) {
//     return res.status(401).send("Invalid Token");
// }
module.exports = verifyToken;

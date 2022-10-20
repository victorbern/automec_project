const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
exports.connect = () => {
    // Connecting to the database
    mongoose
        .connect(
            `mongodb+srv://${dbUser}:${dbPass}@cluster0.zisxox0.mongodb.net/?retryWrites=true&w=majority`
            // {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            //     useCreateIndex: true,
            //     useFindAndModify: false,
            // }
        )
        .then(() => {
            console.log("Conectou ao banco de dados!");
        })
        .catch((error) => {
            console.log("Erro ao se conectar ao banco de dados!");
            console.error(error);
            process.exit(1);
        });
};

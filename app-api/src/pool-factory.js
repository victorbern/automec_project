const mysql = require("mysql2");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// console.log("pool => criado");

pool.on("release", () => {});

process.on("SIGINT", () =>
    pool.end((err) => {
        if (err) return console.log(err);
        console.log("pool => fechado");
        process.exit(0);
    })
);

module.exports = pool;

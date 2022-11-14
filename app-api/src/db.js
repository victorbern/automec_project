const mysql = require("mysql2");
const BDError = require("./api/errors/BDError");

module.exports = {
    connection: function () {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });
        return connection;
    },
    executeSQLQueryParams: async function (sql, params, callback) {
        const conn = this.connection();
        conn.query(sql, params, (error, results, fields) => {
            callback(error, results, fields);
            conn.end();
        });

        try {
            const conn = await pool.getConnection();
            conn.on("error", (err) => {
                console.log(`Error on connection: ${err.message}`);
                // stop doing stuff with conn
            });
            try {
                // do stuff with conn
            } catch (err) {
                console.log(`Error doing stuff: ${err.message}`);
            } finally {
                conn.destroy();
            }
        } catch (err) {
            console.log(`Unable to acquire connection: ${err.message}`);
        }
    },
    executeSQLQuery: function (sql, callback) {
        const conn = this.connection();
        conn.query(sql, (error, results, fields) => {
            callback(error, results, fields);
            conn.end();
        });
    },
};

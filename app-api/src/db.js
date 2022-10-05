const mysql = require("mysql");

module.exports = {
    connection: function () {
        return mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });
    },
    executeSQLQueryParams: function (sql, params, callback) {
        const conn = this.connection();
        conn.query(sql, params, (error, results, fields) => {
            callback(error, results, fields);
            conn.end();
        });
    },
    executeSQLQuery: function (sql, callback) {
        const conn = this.connection();
        conn.query(sql, (error, results, fields) => {
            callback(error, results, fields);
            conn.end();
        });
    },
};

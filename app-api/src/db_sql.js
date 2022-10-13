const Sequelize = require("sequelize");
const sequelize = new Sequelize("automec_sq2", "root", "", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;

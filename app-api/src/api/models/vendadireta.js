const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    idVendaDireta: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idVendaDireta"
    },
    idPagamento: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idPagamento",
      references: {
        key: "idPagamento",
        model: "pagamentoModel"
      }
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "total"
    },
    dataHora: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "dataHora"
    }
  };
  const options = {
    tableName: "vendadireta",
    comment: "",
    indexes: [{
      name: "idPagamento",
      unique: false,
      type: "BTREE",
      fields: ["idPagamento"]
    }]
  };
  const VendadiretaModel = sequelize.define("vendadiretaModel", attributes, options);
  return VendadiretaModel;
};
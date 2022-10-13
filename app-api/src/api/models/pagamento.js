const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    idPagamento: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idPagamento"
    },
    dataHora: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "dataHora"
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "subtotal"
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
    desconto: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "desconto"
    },
    formaPagamento: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "formaPagamento"
    }
  };
  const options = {
    tableName: "pagamento",
    comment: "",
    indexes: []
  };
  const PagamentoModel = sequelize.define("pagamentoModel", attributes, options);
  return PagamentoModel;
};
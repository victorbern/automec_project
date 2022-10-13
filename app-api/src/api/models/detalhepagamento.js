const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    idDetalhePagamento: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idDetalhePagamento"
    },
    idOrdemServico: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idOrdemServico"
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
    }
  };
  const options = {
    tableName: "detalhepagamento",
    comment: "",
    indexes: [{
      name: "idPagamento",
      unique: false,
      type: "BTREE",
      fields: ["idPagamento"]
    }]
  };
  const DetalhepagamentoModel = sequelize.define("detalhepagamentoModel", attributes, options);
  return DetalhepagamentoModel;
};
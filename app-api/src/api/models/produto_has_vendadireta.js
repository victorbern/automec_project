const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    codigoBarras: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "codigoBarras",
      references: {
        key: "codigoBarras",
        model: "produtoModel"
      }
    },
    idVendaDireta: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "idVendaDireta",
      references: {
        key: "idVendaDireta",
        model: "vendadiretaModel"
      }
    },
    quantidadeVendida: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "quantidadeVendida"
    },
    precoTotal: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "precoTotal"
    },
    precoUnitario: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "precoUnitario"
    }
  };
  const options = {
    tableName: "produto_has_vendadireta",
    comment: "",
    indexes: [{
      name: "idVendaDireta",
      unique: false,
      type: "BTREE",
      fields: ["idVendaDireta"]
    }]
  };
  const ProdutoHasVendadiretaModel = sequelize.define("produtoHasVendadiretaModel", attributes, options);
  return ProdutoHasVendadiretaModel;
};
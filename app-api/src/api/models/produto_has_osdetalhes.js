const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    idOsDetalhes: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "idOSDetalhes",
      references: {
        key: "idOSDetalhes",
        model: "osdetalhesModel"
      }
    },
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
    tableName: "produto_has_osdetalhes",
    comment: "",
    indexes: [{
      name: "codigoBarras",
      unique: false,
      type: "BTREE",
      fields: ["codigoBarras"]
    }]
  };
  const ProdutoHasOsdetalhesModel = sequelize.define("produtoHasOsdetalhesModel", attributes, options);
  return ProdutoHasOsdetalhesModel;
};
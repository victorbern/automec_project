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
      field: "codigoBarras"
    },
    descricao: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descricao"
    },
    valorCusto: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "valorCusto"
    },
    quantidadeEstoque: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "quantidadeEstoque"
    },
    precoVenda: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "precoVenda"
    }
  };
  const options = {
    tableName: "produto",
    comment: "",
    indexes: []
  };
  const ProdutoModel = sequelize.define("produtoModel", attributes, options);
  return ProdutoModel;
};
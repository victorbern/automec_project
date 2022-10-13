const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    idServico: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idServico"
    },
    descricaoServico: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "descricaoServico"
    },
    precoServico: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "precoServico"
    }
  };
  const options = {
    tableName: "servico",
    comment: "",
    indexes: []
  };
  const ServicoModel = sequelize.define("servicoModel", attributes, options);
  return ServicoModel;
};
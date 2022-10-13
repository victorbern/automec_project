const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    idFuncionario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idFuncionario"
    },
    nomeFuncionario: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nomeFuncionario"
    },
    isAtivo: {
      type: DataTypes.STRING(3),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "isAtivo"
    },
    funcao: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "funcao"
    }
  };
  const options = {
    tableName: "funcionario",
    comment: "",
    indexes: []
  };
  const FuncionarioModel = sequelize.define("funcionarioModel", attributes, options);
  return FuncionarioModel;
};
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
    idFuncionario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "idFuncionario",
      references: {
        key: "idFuncionario",
        model: "funcionarioModel"
      }
    },
    idServico: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "idServico",
      references: {
        key: "idServico",
        model: "servicoModel"
      }
    },
    observacao: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "observacao"
    },
    quantidade: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "quantidade"
    }
  };
  const options = {
    tableName: "executafuncao",
    comment: "",
    indexes: [{
      name: "idFuncionario",
      unique: false,
      type: "BTREE",
      fields: ["idFuncionario"]
    }, {
      name: "idServico",
      unique: false,
      type: "BTREE",
      fields: ["idServico"]
    }]
  };
  const ExecutafuncaoModel = sequelize.define("executafuncaoModel", attributes, options);
  return ExecutafuncaoModel;
};
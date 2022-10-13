const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    idOrdemServico: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idOrdemServico"
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
    km: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "km"
    },
    isFinalizada: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "isFinalizada"
    },
    isPaga: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "isPaga"
    },
    placaVeiculo: {
      type: DataTypes.STRING(8),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "placaVeiculo"
    },
    idCliente: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idCliente",
      references: {
        key: "idCliente",
        model: "clienteModel"
      }
    }
  };
  const options = {
    tableName: "ordemservico",
    comment: "",
    indexes: [{
      name: "idCliente",
      unique: false,
      type: "BTREE",
      fields: ["idCliente"]
    }]
  };
  const OrdemservicoModel = sequelize.define("ordemservicoModel", attributes, options);
  return OrdemservicoModel;
};
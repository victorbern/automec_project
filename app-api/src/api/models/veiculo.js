const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    placaVeiculo: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "placaVeiculo"
    },
    marca: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "marca"
    },
    modelo: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "modelo"
    },
    ano: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ano"
    },
    capacidadeOleo: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "capacidadeOleo"
    },
    cor: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cor"
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
    tableName: "veiculo",
    comment: "",
    indexes: [{
      name: "idCliente",
      unique: false,
      type: "BTREE",
      fields: ["idCliente"]
    }]
  };
  const VeiculoModel = sequelize.define("veiculoModel", attributes, options);
  return VeiculoModel;
};
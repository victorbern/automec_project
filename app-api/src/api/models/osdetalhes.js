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
      autoIncrement: true,
      comment: null,
      field: "idOSDetalhes"
    },
    dataOs: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "dataOS"
    },
    idOrdemServico: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "idOrdemServico",
      references: {
        key: "idOrdemServico",
        model: "ordemservicoModel"
      }
    }
  };
  const options = {
    tableName: "osdetalhes",
    comment: "",
    indexes: [{
      name: "idOrdemServico",
      unique: false,
      type: "BTREE",
      fields: ["idOrdemServico"]
    }]
  };
  const OsdetalhesModel = sequelize.define("osdetalhesModel", attributes, options);
  return OsdetalhesModel;
};
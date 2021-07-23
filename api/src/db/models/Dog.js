/* eslint-disable no-unused-vars */
const { DataTypes, Sequelize, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height: {
      type: DataTypes.JSONB,
      allowNull: false,
    },

    weight: {
      type: DataTypes.JSONB,
      allowNull: false,
    },

    life_span: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.JSONB,
    },
  }, { timestamps: false });
};

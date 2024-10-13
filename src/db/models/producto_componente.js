'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto_Componente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Producto_Componente.init({
    createdAt: DataTypes.STRING,
    updateAt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Producto_Componente',
  });
  return Producto_Componente;
};
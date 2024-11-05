'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto_Componente extends Model {
    static associate(models) {
      
    }
  }
  Producto_Componente.init({
    productoId: DataTypes.INTEGER,
    componenteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto_Componente',
  });
  return Producto_Componente;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto_Fabricante extends Model {

    static associate(models) {
  
    }
  }
  Producto_Fabricante.init({
    productoId: DataTypes.INTEGER,
    fabricanteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto_Fabricante',
  });
  return Producto_Fabricante;
};
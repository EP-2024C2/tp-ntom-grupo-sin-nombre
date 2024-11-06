'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {

    static associate(models) {
      Producto.belongsToMany(models.Fabricante, {
        through: 'Producto_Fabricante'
      })

      Producto.belongsToMany(models.Componente, {
        through: 'Producto_Componente'
        
      })
    }
  }
  Producto.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    pathImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};
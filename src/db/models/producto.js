'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {

    static associate(models) {
      Producto.belongsToMany(models.Fabricante, {
        through: 'Producto_Fabricante',
        foreignKey: 'id_producto',
        as:'Fabricantes'
       
      })
      Producto.belongsToMany(models.Componente, {
        through: 'Producto_Componente',
        foreignKey: 'id_producto',
        as:'Componentes'
        
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
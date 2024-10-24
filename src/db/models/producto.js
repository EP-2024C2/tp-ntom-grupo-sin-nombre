'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {

    static associate(models) {
      Producto.belongsToMany(models.Fabricante, {
        through: 'Producto_Fabricante',
        as:'fabricantes',
        foreignKey: 'id_producto',
        otherKey: 'id_fabricante'
      })
      Producto.belongsToMany(models.Componente, {
        through: 'Producto_Componente',
        as:'componentes',
        foreignKey: 'id_producto',
        otherKey: 'id_componente'
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
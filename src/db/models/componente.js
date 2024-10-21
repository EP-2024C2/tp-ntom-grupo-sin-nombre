'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Componente extends Model {
   
    static associate(models) {
      Componente.belongsToMany(models.Producto, {
        through: 'Producto_Componente',
        as:'productos',
        foreignKey: 'id_componente',
        otherKey: 'id_producto'
      })
    }
  }
  Componente.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Componente',
  });
  return Componente;
};
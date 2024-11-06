'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Componente extends Model {
   
    static associate(models) {
      Componente.belongsToMany(models.Producto, {
        through: 'Producto_Componente'
  
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
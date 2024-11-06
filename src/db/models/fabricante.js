'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fabricante extends Model {
    
    static associate(models) {
      Fabricante.belongsToMany(models.Producto,{
        through: 'Producto_Fabricante'
 
      })
    }
  }
  Fabricante.init({
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    numeroContacto: DataTypes.STRING,
    pathImgPerfil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fabricante',
  });
  return Fabricante;
};
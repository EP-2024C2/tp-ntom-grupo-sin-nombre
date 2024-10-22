const { Router } = require('express');
const { Fabricante, Producto_Fabricante } = require('../db/models');
const fabricanteController = require('../controllers/fabricante.controllers');
const fabricanteMiddleware = require('../middleware/middleware');

const fabricanteRoute = Router();

fabricanteRoute.get('/', fabricanteController.getFabricantes);
fabricanteRoute.get('/:id', fabricanteMiddleware.existsById(Fabricante), fabricanteController.getFabricanteId);
fabricanteRoute.post('/', fabricanteMiddleware.validateSchema, fabricanteController.createFabricante); // Aquí
fabricanteRoute.put('/:id', fabricanteMiddleware.existsById(Fabricante), fabricanteMiddleware.validateSchema, fabricanteController.updateFabricante); // Aquí
fabricanteRoute.delete('/:id', fabricanteMiddleware.existsById(Fabricante), fabricanteMiddleware.existsIdInOtherModel(Fabricante, Producto_Fabricante, 'fabricanteId'), fabricanteController.deleteFabricante);
fabricanteRoute.get('/:id/productos', fabricanteMiddleware.existsById(Fabricante), fabricanteController.getProductosByFabricanteId);

module.exports = fabricanteRoute;

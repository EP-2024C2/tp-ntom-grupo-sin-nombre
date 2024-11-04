const { Router } = require('express');
const { Fabricante, Producto_Fabricante } = require('../db/models');
const fabricanteController = require('../controllers/fabricante.controllers');
const fabricanteMiddleware = require('../middleware/middleware');
const fabricanteSchema = require('../schemas/fabricanteSchema')

const fabricanteRoute = Router();

fabricanteRoute.get('/fabricantes', fabricanteController.getFabricantes);
fabricanteRoute.get('/fabricantes/:id', fabricanteMiddleware.existsById(Fabricante), fabricanteController.getFabricanteId);
fabricanteRoute.post('/fabricantes', fabricanteMiddleware.validateSchema(fabricanteSchema), fabricanteController.createFabricante); 
fabricanteRoute.put('/fabricantes/:id', fabricanteMiddleware.existsById(Fabricante), fabricanteMiddleware.validateSchema(fabricanteSchema), fabricanteController.updateFabricante); // Aquí
fabricanteRoute.delete('/fabricantes/:id', fabricanteMiddleware.existsById(Fabricante), fabricanteController.deleteFabricante);
fabricanteRoute.get("/fabricantes/:id/productos", fabricanteMiddleware.existsById(Fabricante) ,fabricanteController.getProductosByFabricanteId)

module.exports = fabricanteRoute;

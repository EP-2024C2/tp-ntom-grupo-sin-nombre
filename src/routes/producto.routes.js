const { Router } = require('express');
const { Producto } = require('../db/models');
const productoController = require('../controllers/producto.controllers');
const productoMiddleware = require('../middleware/middleware');
const productoSchema = require('../schemas/productoSchema')

const productoRoute = Router();

// Rutas
productoRoute.get('/productos', productoController.getProductos);
productoRoute.get('/productos/:id', productoMiddleware.existsById(Producto), productoController.getProductosId);
productoRoute.post('/productos', productoMiddleware.validateSchema(productoSchema) , productoController.createProducto);
productoRoute.put('/productos/:id', productoMiddleware.existsById(Producto), productoMiddleware.validateSchema(productoSchema), productoController.updateProducto);
productoRoute.delete('/productos/:id', productoMiddleware.existsById(Producto), productoController.deleteProducto);
productoRoute.get('/productos/:id/fabricantes',productoMiddleware.existsById(Producto), productoController.getFabricantesById) 
productoRoute.post('/productos/:id/fabricantes',productoMiddleware.existsById(Producto), productoController.associateFabricanteById)
productoRoute.post('/productos/:id/componentes',productoMiddleware.existsById(Producto), productoController.associateComponenteById)
productoRoute.get('/productos/:id/componentes',productoMiddleware.existsById(Producto), productoController.getComponentesById) 

module.exports = productoRoute;
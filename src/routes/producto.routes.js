const { Router } = require('express');
const { Producto, Fabricante, Componente } = require('../db/models');
const productoController = require('../controllers/producto.controllers');
const productoMiddleware = require('../middleware/middleware');

const productoRoute = Router();

// Rutas
productoRoute.get('/productos', productoController.getProductos);
productoRoute.get('/productos/:id', productoMiddleware.existsById(Producto), productoController.getProductosId);
productoRoute.post('/productos', /*productoMiddleware.validateSchema,*/ productoController.createProducto);
productoRoute.put('/productos/:id', productoMiddleware.existsById(Producto), productoMiddleware.validateSchema, productoController.updateProducto);
productoRoute.delete('/productos/:id', productoMiddleware.existsById(Producto), productoController.deleteProducto);
productoRoute.get('/productos/:id/fabricantes',productoMiddleware.existsById(Producto), productoController.getFabricantesById) 
productoRoute.post('/productos/:id/fabricantes',/*productoMiddleware.existsById(Producto), productoMiddleware.existsAllIdInModel(Fabricante), productoMiddleware.existsAllRegistersInModel(Fabricante),*/ productoController.associateFabricanteById)
productoRoute.post('/productos/:id/componentes',productoMiddleware.existsById(Producto), productoMiddleware.existsAllIdInModel(Componente), productoMiddleware.existsAllRegistersInModel(Componente), productoController.associateComponenteById)
productoRoute.get('/productos/:id/componentes',productoMiddleware.existsById(Producto), productoController.getComponentesById) 

module.exports = productoRoute;
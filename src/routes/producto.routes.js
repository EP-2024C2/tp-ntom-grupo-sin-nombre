const { Router } = require('express');
const { Producto, Fabricante } = require('../db/models');
const productoController = require('../controllers/producto.controllers');
const productoMiddleware = require('../middleware/middleware');

const productoRoute = Router();

// Rutas
productoRoute.get('/', productoController.getProductos);
productoRoute.get('/:id', productoMiddleware.existsById(Producto), productoController.getProductosId);
productoRoute.post('/', productoMiddleware.validateSchema, productoController.createProducto);
productoRoute.put('/:id', productoMiddleware.existsById(Producto), productoMiddleware.validateSchema, productoController.updateProducto);
productoRoute.delete('/:id', productoMiddleware.existsById(Producto), productoController.deleteProducto);

module.exports = productoRoute;
const {Router} = require('express')
const {Producto} = require('../db/models')
const productoController = require('../controllers/producto.controllers')
const productoMiddleware =  require('../middleware/middleware')

const productoRoute = Router()

productoRoute.get('/', productoController.getProductos)

productoRoute.get('/', productoMiddleware.existsById(Producto), productoController.getProductosId)

productoRoute.post('/',productoMiddleware.existsById(Producto), productoController.createProducto)

productoRoute.put('/',productoMiddleware.existsById(Producto), productoController.updateProducto)

productoRoute.delete('/',productoMiddleware.existsById(Producto), productoController.deleteProducto)

productoRoute.get('/',productoMiddleware.existsById(Producto), productoController.getFabricantesById)

productoRoute.post('/',productoMiddleware.existsById(Producto), productoController.associateFabricanteById)

productoRoute.get('/',productoMiddleware.existsById(Producto), productoController.getComponentesById)

productoRoute.post('/',productoMiddleware.existsById(Producto), productoController.associateComponenteById)

module.exports = productoRoute
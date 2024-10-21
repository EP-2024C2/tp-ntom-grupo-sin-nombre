const {Router} = require('express')
const {Producto, Producto_Fabricante,Fabricante, Componente, Componente_Fabricante} = require('../db/models')
const productoController = require('../controllers/producto.controllers')
const productoMiddleware =  require('../middleware/middleware')
const productoSchema = require('../schemas/productoSchema')

const productoRoute = Router()

productoRoute.get('/', productoController.getProductos)

productoRoute.get('/', productoMiddleware.existsById(Producto), productoController.getProductosId)

productoRoute.post('/',productoMiddleware.existsById(Producto), productoController.createProducto)

productoRoute.put('/',productoMiddleware.existsById(Producto),productoMiddleware.validateSchema(productoSchema) ,productoController.updateProducto)

productoRoute.delete('/',productoMiddleware.existsById(Producto),productoMiddleware.existsIdInOtherModel(Componente,Componente_Fabricante,"productoId"),productoMiddleware.existsIdInOtherModel(Producto, Producto_Fabricante, 'productoId'),productoController.deleteProducto)

productoRoute.get('/',productoMiddleware.existsById(Producto), productoController.getFabricantesById) 

productoRoute.post('/',productoMiddleware.existsById(Producto), productoMiddleware.existsAllIdInModel(Fabricante), productoMiddleware.existsAllRegistersInModel(Fabricante), productoController.associateFabricanteById)

productoRoute.post('/',productoMiddleware.existsById(Producto), productoMiddleware.existsAllIdInModel(Componente), productoMiddleware.existsAllRegistersInModel(Componente), productoController.associateComponenteById)

module.exports = productoRoute
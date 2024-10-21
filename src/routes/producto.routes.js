const {Router} = require('express')
const productoController = require('../controllers/producto.controllers')

const routes = Router()

routes.get('/', productoController.getProductos)
routes.get('/', productoController.getProductosId)
routes.post('/', productoController.createProducto)
routes.put('/', productoController.updateProducto)
routes.delete('/', productoController.deleteProducto)

routes.get('/', productoController.getFabricantesById)
routes.post('/', productoController.associateFabricanteById)
routes.get('/', productoController.getComponentesById)
routes.post('/', productoController.associateComponenteById)

module.exports = routes
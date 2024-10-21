const {Router} = require('express')
const componenteController = require('../controllers/componente.controllers')
const {Componente, Producto, Producto_Componente} = require('../db/models')
const componenteMiddleware =  require('../middleware/middleware')
const componenteSchema = require("../schemas/componenteSchema")

const componenteRoute = Router()

componenteRoute.get('/',componenteController.getAllComponentes)

componenteRoute.get('/', componenteMiddleware.existsById(Componente), componenteController.getComponenteById)

componenteRoute.post('/', componenteMiddleware.existsById(Componente), componenteController.postComponente)

componenteRoute.put('/', componenteMiddleware.existsById(Componente), componenteMiddleware.validateSchema(componenteSchema),componenteController.updateComponente)

componenteRoute.delete('/',componenteMiddleware.existsById(Componente), componenteMiddleware.existsIdInOtherModel(Componente, Producto_Componente, 'componenteId'), componenteController.deleteComponente)

componenteRoute.get("/", componenteMiddleware.existsById(Componente) ,componenteController.getProductosByComponenteId)

module.exports = componenteRoute
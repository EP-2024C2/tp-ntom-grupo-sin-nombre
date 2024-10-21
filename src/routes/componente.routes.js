const {Router} = require('express')
const componenteController = require('../controllers/componente.controllers')
const {Componente} = require('../db/models')
const componenteMiddleware =  require('../middleware/middleware')

const componenteRoute = Router()


componenteRoute.get('/',componenteMiddleware.existsById(Componente), componenteController.getAllComponentes)
componenteRoute.get('/', componenteMiddleware.existsById(Componente), componenteController.getComponenteById)
componenteRoute.post('/', componenteMiddleware.existsById(Componente), componenteController.postComponente)
componenteRoute.put('/', componenteMiddleware.existsById(Componente), componenteController.updateComponente)
componenteRoute.delete('/',componenteMiddleware.existsById(Componente),  componenteController.deleteComponente)

module.exports = componenteRoute
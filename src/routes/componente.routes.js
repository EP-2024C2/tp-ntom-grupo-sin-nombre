const {Router} = require('express')
const componenteController = require('../controllers/componente.controllers')

const routes = Router()

routes.get('/', componenteController.getAllComponentes)
routes.get('/', componenteController.getComponenteById)
routes.post('/', componenteController.postComponente)
routes.put('/', componenteController.updateComponente)
routes.delete('/', componenteController.deleteComponente)

module.exports = routes
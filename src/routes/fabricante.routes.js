const {Router} = require('express')
const fabricanteController = require('../controllers/fabricante.controllers')

const routes = Router()

routes.get('/', fabricanteController.getFabricantes)
routes.get('/', fabricanteController.getFabricanteId)
routes.post('/', fabricanteController.createFabricante)
routes.put('/', fabricanteController.updateFabricante)
routes.delete('/', fabricanteController.deleteFabricante)

module.exports = routes
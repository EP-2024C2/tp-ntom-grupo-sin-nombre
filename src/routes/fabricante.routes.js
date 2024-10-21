const {Router} = require('express')
const {Fabricante} = require('../db/models')
const fabricanteController = require('../controllers/fabricante.controllers')
const fabricanteMiddleware =  require('../middleware/middleware')

const fabricanteRoute = Router()

fabricanteRoute.get('/',fabricanteMiddleware.existsById(Fabricante), fabricanteController.getFabricantes)
fabricanteRoute.get('/', fabricanteMiddleware.existsById(Fabricante),fabricanteController.getFabricanteId)
fabricanteRoute.post('/', fabricanteMiddleware.existsById(Fabricante),fabricanteController.createFabricante)
fabricanteRoute.put('/', fabricanteMiddleware.existsById(Fabricante),fabricanteController.updateFabricante)
fabricanteRoute.delete('/', fabricanteMiddleware.existsById(Fabricante),fabricanteController.deleteFabricante)

module.exports = fabricanteRoute
const {Router} = require('express')
const {Fabricante, Producto_Fabricante, Producto} = require('../db/models')
const fabricanteController = require('../controllers/fabricante.controllers')
const fabricanteMiddleware =  require('../middleware/middleware')
const fabricanteSchema = require("../schemas/fabricanteSchema")

const fabricanteRoute = Router()

fabricanteRoute.get('/',fabricanteController.getFabricantes)

fabricanteRoute.get('/', fabricanteMiddleware.existsById(Fabricante),fabricanteController.getFabricanteId)

fabricanteRoute.post('/', fabricanteMiddleware.existsById(Fabricante),fabricanteController.createFabricante)

fabricanteRoute.put("/",fabricanteMiddleware.existsById(Fabricante), fabricanteMiddleware.validateSchema(fabricanteSchema),fabricanteController.updateFabricante)

fabricanteRoute.delete("/",fabricanteMiddleware.existsById(Fabricante), fabricanteMiddleware.existsIdInOtherModel(Fabricante, Producto_Fabricante, 'profesorId'), fabricanteController.deleteFabricante)

fabricanteRoute.get("/", fabricanteMiddleware.existsById(Fabricante) ,fabricanteController.getProductosByFabricanteId)

module.exports = fabricanteRoute
const { Router } = require('express');
const componenteController = require('../controllers/componente.controllers');
const { Componente, Producto, Producto_Componente } = require('../db/models');
const componenteMiddleware = require('../middleware/middleware'); 
const componenteSchema = require("../schemas/componenteSchema");

const componenteRoute = Router();

// Definición de rutas
componenteRoute.get('/componentes',componenteController.getAllComponentes)
componenteRoute.get('/componentes/:id', componenteMiddleware.existsById(Componente), componenteController.getComponenteById)
componenteRoute.post('/componentes', componenteMiddleware.validateSchema(componenteSchema), componenteController.postComponente)
componenteRoute.put('/componentes/:id', componenteMiddleware.existsById(Componente), componenteMiddleware.validateSchema(componenteSchema), componenteController.updateComponente)
componenteRoute.delete('/componentes/:id',componenteMiddleware.existsById(Componente), componenteMiddleware.existsIdInOtherModel(Componente, Producto_Componente, 'componenteId'), componenteController.deleteComponente)
componenteRoute.get("/componentes/:id/productos", componenteMiddleware.existsById(Componente) ,componenteController.getProductosByComponenteId)

module.exports = componenteRoute;
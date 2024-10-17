const { Router } = require('express')
const fabricanteRoutes = require('./fabricante.routes')
const productoRoutes = require('./producto.routes')
const componenteRoutes = require('./componente.routes')

const router = Router()

router.use('/fabricantes', fabricanteRoutes) //No sería '/fabricante' el nombre de la carpeta?
router.use('/producto', productoRoutes)
router.use('/componente', componenteRoutes)

module.exports = router
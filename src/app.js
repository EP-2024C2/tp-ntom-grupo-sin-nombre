
const express = require('express')
const routes = require('./routes')
//const {genericMiddleware} = require('./middlewares')
const db = require('./db/models');
const app = express()
const PORT = 3001

app.use(express.json())

//app.use(genericMiddleware.requestTime)

app.use(routes.componenteRoute);
app.use(routes.fabricanteRoute);
app.use(routes.productoRoute);

app.listen(PORT, async ()=>{
    console.log(`Aplicacion iniciada en el puerto ${PORT}`)
    //Esto lo hacemos solo en desarrollo para sincronizar el modelo con la db
    // Descomentar solo cuando hay cambios en el modelo
    // ojo que se dropean todas las tablas
    
})

//db.sequelize.sync({force:true})
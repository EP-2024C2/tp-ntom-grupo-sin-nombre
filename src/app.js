const express = require('express')
const routes = require('./routes')
const db = require('./db/models');
const app = express()
const PORT = 3001

app.use(express.json())


app.use(routes.componenteRoute);
app.use(routes.fabricanteRoute);
app.use(routes.productoRoute);

app.listen(PORT, async ()=>{
    console.log(`Aplicacion iniciada en el puerto ${PORT}`)
})
 
//db.sequelize.sync({force:true})
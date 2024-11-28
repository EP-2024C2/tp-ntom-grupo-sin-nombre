const express = require('express')
const routes = require('./routes')
const db = require('./db/models');
const app = express()
const PORT = 3001
const seed = require('./seeds/seed')
const cors = require('cors')

/*app.use(cors({
    origin: 'http://localhost:5173' 
  }));*/

app.use(cors())
app.use(express.json())
app.use(express.static('public'));

app.use(routes.componenteRoute);
app.use(routes.fabricanteRoute);
app.use(routes.productoRoute);

app.listen(PORT, async ()=>{
    await seed()
    console.log(`Aplicacion iniciada en el puerto ${PORT}`)
})
 
//db.sequelize.sync({force:true})


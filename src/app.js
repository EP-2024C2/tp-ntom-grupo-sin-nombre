const express = require("express")
const routes = require('./routes/index')
const sequelize = require('../config/database')


const app = express()

app.use(express.json())

app.use(routes)

async function startDatabase(){
  try {
      await sequelize.sync({force: true})
      console.log('Base de datos sincronizada')

      console.log('Datos de inicialización cargados correctamente')
  } catch (error) {
      console.log('Error al sicronizar o inicializar los datos')
  }
} 

startDatabase()

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(3000, () => {
    console.log("Example app listening on port 3000")
  })
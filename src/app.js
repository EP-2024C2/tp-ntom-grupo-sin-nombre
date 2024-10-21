const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();

const sequelize = require('../config/database')
const componenteRoute = require("./routes/componente.routes")
const fabricanteRoute = require("./routes/fabricante.routes")
const productoRoute = require("./routes/producto.routes")

const db = require('./db/models')

const componenteData = require('./data/componenteData.json')
const fabricanteData = require('./data/fabricanteData.json')
const producto_componenteData = require("./data/producto_componenteData.json")
const producto_fabricanteData = require('./data/producto_fabricanteData.json')
const productoData = require('./data/productoData.json')

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(componenteRoute)
app.use(fabricanteRoute)
app.use(productoRoute)

const port = process.env.PORT || 3000

app.listen(port, async(req, res)=>{
  try
  {

  await db.sequelize.authenticate()

  await db.sequelize.sync({force:true}); 

  componenteData.map(componente => db.Componente.create(componente))
  fabricanteData.map( fabricante => db.Fabricante.create(fabricante))
  producto_componenteData.map(producto_componente => db.Producto_Componente.create(producto_componente))
  producto_fabricanteData.map(producto_fabricante => db.Producto_Fabricante.create(producto_fabricante))
  productoData.map(producto => db.Producto.create(producto))

  console.log("Listen on "+port)
  } 
  catch(error){
      console.log("Error: "+error)
  }


})
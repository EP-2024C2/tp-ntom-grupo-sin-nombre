const express = require("express")
const routes = require('./routes')
const app = express()
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(3000, () => {
    console.log("Example app listening on port 3000")
  })
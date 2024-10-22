const express = require('express');
const dotenv = require('dotenv');

const db = require('./db/models');
const componenteRoute = require('./routes/componente.routes');
const fabricanteRoute = require('./routes/fabricante.routes');
const productoRoute = require('./routes/producto.routes');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/componentes', componenteRoute);
app.use('/fabricantes', fabricanteRoute);
app.use('/productos', productoRoute);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = 3001

app.listen(PORT, async ()=>{
  console.log(`Aplicacion iniciada en el puerto ${PORT}`)
})
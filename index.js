require('./mongo');
const express = require('express');
const cors = require('cors');

const ejercicioRouter = require('./controllers/ejercicio')
const dietaRouter = require('./controllers/dieta')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/ejercicios', ejercicioRouter)
app.use('/dietas', dietaRouter)

app.listen(3001, ()=>{
    console.log('Servidor corriendo en el puerto: 3001');
});
// Creado por Diego Canelo 11/04/2022
require('./mongo')
const express = require('express')
const cors = require('cors')

// Importación de rutas de ejercicios y dietas
const ejercicioRouter = require('./controllers/ejercicio')
const dietaRouter = require('./controllers/dieta')

const app = express()

app.use(cors())
app.use(express.json())

// Utilización de rutas
app.use('/ejercicios', ejercicioRouter)
app.use('/dietas', dietaRouter)

app.listen(3001, ()=>{
    console.log('Servidor corriendo en el puerto: 3001')
})
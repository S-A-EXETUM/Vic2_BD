// Creado por Diego Canelo 11/04/2022
const mongoose = require('mongoose')
const pass = 'diego123'
const connectionString = `mongodb+srv://Diego:${pass}@cluster0.73eqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(connectionString)
    .then(() => {
        console.log('Conectado!')
    }).catch(error => {
        console.log(error)
    })

// Creado por Matthew Rocco 11/04/2022
const {model, Schema} = require('mongoose')

// Esquema de ejercicio para guardar los objetos en la bd
const ejercicioSchema = new Schema({
    pCuerpo: String,
    nombre: String,
    repeticiones: Number,
    video: String,
    descripcion: String,
    musculoObj: String,
    set: Number
})

// Al traer los objetos de la bd se añade id y se elimina _id y __v de sus propiedades
ejercicioSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
    }
})

// Se crea el modelo con el esquema definido
const Ejercicio = new model('Ejercicio', ejercicioSchema)

module.exports = Ejercicio
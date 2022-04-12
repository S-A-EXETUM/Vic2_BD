// Creado por Matthew Rocco 11/04/2022
const {model, Schema} = require('mongoose')

// Esquema de dieta para guardar los objetos en la bd
const dietaSchema = new Schema({
    tipoDieta: String,
    nombre: String,
    alimentos: String,
    infoNutricional: String,
    foto: String,
    horario: String
})

// Al traer los objetos de la bd se añade id y se elimina _id y __v de sus propiedades
dietaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
    }
})

// Se crea el modelo con el esquema definido
const Dieta = new model('Dieta', dietaSchema)

module.exports = Dieta
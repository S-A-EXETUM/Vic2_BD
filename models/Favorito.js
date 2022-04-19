// Creado por Diego Canelo 19/04/2022
const {model, Schema} = require('mongoose')

// Esquema de dieta para guardar los objetos en la bd
// Estructura de los objetos
const favoritoSchema = new Schema({
    id_usuario: String,
    id_rutina: [{
        type: Schema.Types.ObjectId,
        ref: 'Ejercicio'
    }],
    id_dieta: [{
        type: Schema.Types.ObjectId,
        ref: 'Dieta'
    }],
})

// Al traer los objetos de la bd se añade id y se elimina _id y __v de sus propiedades
favoritoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
    }
})

// Se crea el modelo con el esquema definido
const Favorito = new model('Favorito', favoritoSchema)

module.exports = Favorito
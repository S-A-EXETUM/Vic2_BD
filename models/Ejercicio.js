const {model, Schema} = require('mongoose')

const ejercicioSchema = new Schema({
    pCuerpo: String,
    nombre: String,
    repeticiones: Number,
    video: String,
    descripcion: String,
    musculoObj: String,
    set: Number
})

ejercicioSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Ejercicio = new model('Ejercicio', ejercicioSchema)

module.exports = Ejercicio
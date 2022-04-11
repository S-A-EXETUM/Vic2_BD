const {model, Schema} = require('mongoose')

const dietaSchema = new Schema({
    tipoDieta: String,
    nombre: String,
    alimentos: String,
    infoNutricional: String,
    foto: String,
    horario: String
})

dietaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Dieta = new model('Dieta', dietaSchema)

module.exports = Dieta
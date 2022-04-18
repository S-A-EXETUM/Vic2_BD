const dietaRouter = require('express').Router()
const Dieta = require('../models/Dieta')

dietaRouter.get('/', (request,response)=>{
    Dieta.find({}).then(result => {
        response.json(result);
    }).catch(e => {
        console.log(e);
    });
});

dietaRouter.get('/:id',(request,response) => {
    let {id} = request.params;
    Dieta.findById(id).then(result => {
        response.json(result);
    }).catch(error => {
        console.log(error);
    });
});

dietaRouter.post('/', (request,response)=>{
    let {body} = request
    let {tipoDieta, nombre, alimentos, infoNutricional, foto, horario} = body
    let dieta = new Dieta({
        tipoDieta,
        nombre,
        alimentos,
        infoNutricional,
        foto,
        horario
    })

    dieta.save().then(dieta => {
        response.status(201).json(dieta)
    }).catch(error =>{
        console.log(error)
    })
})
dietaRouter.put('/:id', (request,response)=>{
    let {id} = request.params
    let {body} = request
    let {tipoDieta, nombre, alimentos, infoNutricional, foto, horario} = body
    Dieta.findByIdAndUpdate(id,{
        tipoDieta,
        nombre,
        alimentos,
        infoNutricional,
        foto,
        horario
    })
    .then(dieta => {
        response.status(202).json(dieta)
    }).catch(error =>{
        console.log(error)
        response.status(400).end()
    })
})
dietaRouter.delete('/:id',(request,response)=>{
    let {id} = request.params;
    Dieta.findByIdAndDelete(id).then(result => {
        response.status(204).json(result);
    }).catch(e => {
        console.log(e);
    });
});

module.exports = dietaRouter
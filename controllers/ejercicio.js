const ejercicioRouter = require('express').Router()
const Ejercicio = require('../models/Ejercicio')

ejercicioRouter.get('/', (request,response)=>{
    Ejercicio.find({}).then(result => {
        response.json(result);
    }).catch(e => {
        console.log(e);
    });
});

ejercicioRouter.get('/:id',(request,response) => {
    let {id} = request.params;
    Ejercicio.findById(id).then(result => {
        response.json(result);
    }).catch(error => {
        console.log(error);
    });
});

ejercicioRouter.post('/', (request,response)=>{
    let {body} = request;
    let {pCuerpo,nombre, repeticiones, video, descripcion, musculoObj, set} = body;
    let ejercicio = new Ejercicio({
        pCuerpo,
        nombre,
        repeticiones,
        video,
        descripcion,
        musculoObj,
        set
    });

    ejercicio.save().then(ejercicio => {
        response.status(201).json(ejercicio);
    }).catch(error =>{
        console.log(error);
    })
})

ejercicioRouter.delete('/:id',(request,response)=>{
    let {id} = request.params;
    Ejercicio.findByIdAndDelete(id).then(result => {
        response.status(204).json(result);
    }).catch(e => {
        console.log(e);
    });
});

module.exports = ejercicioRouter
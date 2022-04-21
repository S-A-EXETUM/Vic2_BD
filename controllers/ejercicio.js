// Creado por Diego Canelo 11/04/2022
const ejercicioRouter = require('express').Router()
const Ejercicio = require('../models/Ejercicio')
const Favorito = require('../models/Favorito')

// Traer todos los datos de la bd
ejercicioRouter.get('/', (request,response)=>{
    Ejercicio.find({}).then(result => {
        response.json(result)
    }).catch(e => {
        console.log(e)
    })
})

// Buscar por id
ejercicioRouter.get('/:id',(request,response) => {
    let {id} = request.params
    Ejercicio.findById(id).then(result => {
        response.json(result)
    }).catch(error => {
        console.log(error)
    })
})

// Crear un objeto en la bd
ejercicioRouter.post('/', (request,response)=>{
    let {body} = request
    let {pCuerpo,nombre, repeticiones, video, descripcion, musculoObj, set} = body
    let ejercicio = new Ejercicio({
        pCuerpo,
        nombre,
        repeticiones,
        video,
        descripcion,
        musculoObj,
        set
    })

    ejercicio.save().then(ejercicio => {
        response.status(201).json(ejercicio)
    }).catch(error =>{
        console.log(error)
        response.status(400).end()
    })
})

ejercicioRouter.put('/:id', (request,response)=>{
    let {id} = request.params
    let {body} = request
    let {pCuerpo, nombre, repeticiones, video, descripcion, musculoObj, set} = body
    Ejercicio.findByIdAndUpdate(id,{
        pCuerpo,
        nombre,
        repeticiones,
        video,
        descripcion,
        musculoObj,
        set
    })
    .then(ejercicio => {
        response.status(202).json(ejercicio)
    }).catch(error =>{
        console.log(error)
        response.status(400).end()
    })
})

// Eliminar un objeto de la bd
// Modificado por Matthew 21/04/2022
ejercicioRouter.delete('/:id',(request,response)=>{
    let {id} = request.params

    Ejercicio.findByIdAndDelete(id).then(result => {
        Favorito.remove({id_rutina: id}).then(result => {
            response.status(204).json(result)
        }).catch(e => {
            console.log(e)
        })
    }).catch(e => {
        console.log(e)
    })
})

// Añadido por Matthew 19/04/2022
ejercicioRouter.get('/tipo/:tipo', (request,response)=>{
    let {tipo} = request.params
    Ejercicio.find({pCuerpo: tipo}).then(result =>{
        response.json(result)
    }).catch(e =>{
        console.log(e)
    })
})

// Añadido por Constanza 20/04/2022
ejercicioRouter.get('/nombre/:texto', (request,response)=>{
    let {texto} = request.params
    texto = new RegExp(texto, 'i')
    Ejercicio.find({nombre: texto }).then(result =>{
        response.json(result)
    }).catch(e =>{
        console.log(e)
    })
})

module.exports = ejercicioRouter
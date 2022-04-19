// Creado por Matthew Rocco 19/04/2022
const favoritoRouter = require('express').Router()
const Favorito = require('../models/Favorito')

// Traer todos los datos de la bd
favoritoRouter.get('/', (request,response)=>{
    Favorito.find({}).populate('id_rutina', {}).populate('id_dieta', {}).then(result => {
        response.json(result)
    }).catch(e => {
        console.log(e)
    })
})

favoritoRouter.get('/usuario/:id', (request,response)=>{
    let {id} = request.params
    Favorito.find({id_usuario: id}).populate('id_rutina', {}).populate('id_dieta', {}).then(result => {
        response.json(result)
    }).catch(e => {
        console.log(e)
    })
})

// Crear un objeto en la bd
favoritoRouter.post('/', (request,response)=>{
    let {body} = request
    let {id_usuario, id_rutina, id_dieta} = body
    let favorito = new Favorito({
        id_usuario,
        id_rutina,
        id_dieta
    })

    favorito.save().then(favorito => {
        response.status(201).json(favorito)
    }).catch(error =>{
        console.log(error)
    })
})

module.exports = favoritoRouter
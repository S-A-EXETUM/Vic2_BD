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

// Eliminar un objeto de la bd
favoritoRouter.delete('/:id',(request,response)=>{
    let {id} = request.params
    Favorito.findByIdAndRemove(id).then(result => {
        response.status(204).json(result)
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

    Favorito.find({id_usuario: id_usuario, id_rutina: id_rutina, id_dieta: id_dieta})
        .then(result => {
            if(result[0] != undefined ){
                let usuario = result[0].id_usuario === favorito.id_usuario
                let rutina, dieta
                if(id_rutina != null){
                    rutina = result[0].id_rutina.toString() == favorito.id_rutina.toString()
                }else{
                    rutina  = true
                }
                if(id_dieta != null){
                    dieta = result[0].id_dieta.toString() === favorito.id_dieta.toString()
                }else{
                    dieta = true
                }

                if(usuario && rutina && dieta){
                    response.status(406).json({
                        error: "Existe en favorito"
                    })
                } else {
                    favorito.save().then(favorito => {
                        response.status(201).json(favorito)
                    }).catch(error =>{
                        console.log(error)
                    })
                }
            } else {
                favorito.save().then(favorito => {
                    response.status(201).json(favorito)
                }).catch(error =>{
                    console.log(error)
                })
            }
        })

})

module.exports = favoritoRouter
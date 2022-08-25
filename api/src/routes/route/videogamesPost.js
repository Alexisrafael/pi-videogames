const { Videogames, Generos } = require('../../db')
const {Router} = require('express')

const getVideogamesPost = Router()

getVideogamesPost.post('/', async (req, res)=>{
    let {name, description, releaseDate, rating, platforms, image, generos} = req.body
    let db = await Videogames.findOne({ where: { name: name } })
    if(db){
        res.status(404).send(`el juego: ${name}, ya existe`)
    }else{
        let createVideogame= await Videogames.create({
            name, description, releaseDate, rating, platforms, image
        })
        let addGenero = await Generos.findAll({
            where: {name: generos}
        })
        createVideogame.addGeneros(addGenero)
        res.status(200).send(`el juego: ${name}, fue creado exitosamente`)
    }
})
module.exports= getVideogamesPost;
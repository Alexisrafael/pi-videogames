const { default: axios } = require("axios")
const {Router} = require('express');
const { YOUR_API_KEY } = process.env;
const {Videogames, Generos} = require('../../db')

const getVideosgamesId = Router()

getVideosgamesId.get('/:id', async (req,res,next)=>{
    const {id} = req.params
    try {
        if(!id.includes('-')){
            let videogamesId = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)).data
            let videogame = {
                id: videogamesId.id,
                name: videogamesId.name,
                generos: videogamesId.genres,
                image: videogamesId.background_image,
                rating: videogamesId.rating.toFixed(1),
                platforms: videogamesId.platforms.map(e => e.platform.name).join(', '),
                releaseDate: videogamesId.released,
                description: videogamesId.description_raw
            }
            res.send( videogame)
        }else{
            const videogamesDb = await Videogames.findByPk(id,{attributes:['id', 'name', 'image', 'rating', 'platforms', 'releaseDate', 'description'],include:{model: Generos,attributes: ['name'],
            through: {
                attributes: []
            }}})
            res.send(videogamesDb)
        }
    } catch{
        res.status(404).send(`El Id: ${id}, no existe`)
    }
})

module.exports = getVideosgamesId;

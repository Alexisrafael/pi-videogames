const {Router} = require('express');
const { getApiAddDb } = require('../../Controllers.js/videogamesController');

const videogamesGet = Router();

videogamesGet.get('/', async (req,res) =>{
    const {name} = req.query;
    const data = await getApiAddDb()

    if(name){
        let allData = data.filter( e => e.name.toLowerCase().includes(name.toLowerCase()));
        allData.length ?
        res.send(allData) :
        res.status(404).send(`El juego: ${name}, no existe`)
    }else{
        res.send(data)
    }
})

module.exports = videogamesGet;
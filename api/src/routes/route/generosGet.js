const axios = require('axios');
const { YOUR_API_KEY } =process.env;
const {Generos} = require('../../db')
/* const YOUR_API_KEY='e37d4ef37ce84463bdea0a8ceb6e7f11' */

const getGenerosApi = async (req,res)=>{
    const generosApi = (await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)).data.results
    const allGenerosApi = generosApi.map( element => element.name).sort()

    allGenerosApi.forEach( e => Generos.findOrCreate({ where:{ name: e}}))

    const dataBase = await Generos.findAll()
    
    res.send(dataBase)
}


module.exports= {
    getGenerosApi,
}
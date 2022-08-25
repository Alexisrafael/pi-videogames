const { default: axios } = require("axios")
const { YOUR_API_KEY } =process.env;
const { Videogames, Generos } = require('../db')

const getVideosgamesApi = async () =>{
    let data = [];
    for(let i = 1; i < 6; i++){
        data.push(await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${i}`))
    }
    return await Promise.all(data)
    .then(res =>{
        let paginas = [];
        let results = [];
        for(let i = 0; i < res.length; i++){
            paginas = [...paginas, res[i].data.results]
        }
        paginas.map( e =>{
            e.forEach( element =>{
                results.push({
                    id: element.id,
                    name: element.name,
                    generos: element.genres !== [''] ? element.genres.map(e => e.name).join(', '):'genero desconocido',
                    image: element.background_image,
                    rating:element.rating
                })
            })
        })
        return results;
    })
}
const getVideosgamesDb = async ()=>{
    return (await Videogames.findAll({
        attributes: ['id', 'name', 'image', 'rating'],
        include:{
            model: Generos,
            attributes:['name'],
            through:{
                attributes:[]
            }
        }
    }))
}
const getApiAddDb = async ()=>{
    const api = await getVideosgamesApi();
    const db = await getVideosgamesDb();
    const dbjoin = db.map(e =>{
        return {
            id:e.id,
            name: e.name,
            image: e.image,
            generos: e.generos!== [''] ? e.generos.map(e => e.name).join(', '):'genero desconocido',
            rating: Number(e.rating)
        }
    })
    const results = api.concat(dbjoin)
    return results;
}

module.exports = {
    getApiAddDb
}
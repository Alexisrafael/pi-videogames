import { CREATE_VIDEOGAMES, FILTRADO_POR_GENEROS, FILTRANDO_CREADOS, GET_GENEROS, GET_LIMPIAR, GET_VIDEO_GAMES, GET_VIDEO_GAMES_DETAIL, GET_VIDEO_GAMES_NAME, ORDENEMIENTO_A_Z, ORDENEMIENTO_RATING } from "../Action/actionTypes"

const initialState = {
    videogames:[],
    copiVideogames:[],
    detalles:[],
    generos:[],
    generosFiltrados:[],
}
export const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_VIDEO_GAMES:
            return {
                ...state,
                videogames: action.payload,
                copiVideogames: action.payload
            }
        case GET_VIDEO_GAMES_NAME:
            return{
                ...state,
                videogames:action.payload
            }
        case GET_VIDEO_GAMES_DETAIL:
            return {
                ...state,
                detalles: action.payload
            }
        case GET_LIMPIAR:
            return {
                ...state,
                detalles:action.payload
            }
        case GET_GENEROS:
            return{
                ...state,
                generos: action.payload
            }
        case FILTRADO_POR_GENEROS:
            const filtrado = state.copiVideogames
            const filtrdosEncontrados = action.payload === '' ? filtrado : filtrado.filter(e => {
                if(typeof(e.generos === 'string')) return e.generos.includes(action.payload)
            })
            return {
                ...state,
                videogames:filtrdosEncontrados
            }
        case ORDENEMIENTO_A_Z:
            let ordenado = state.videogames
            if(action.payload === 'az'){
                ordenado.sort((a,b)=>{
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    else if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    else return 0
                })
            }else{
                ordenado.sort((a,b)=>{
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
                    else if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
                    else return 0
                })
            }
            return{
                ...state,
                videogames:ordenado
            }
        case ORDENEMIENTO_RATING:
            let rating = state.videogames
            if(action.payload === 'asc'){
                rating.sort((a,b)=>{
                    if(a.rating > b.rating) return 1
                    else if(a.rating < b.rating) return -1
                    else return 0
                })
            }else{
                rating.sort((a,b)=>{
                    if(a.rating > b.rating) return -1
                    else if(a.rating < b.rating) return 1
                    else return 0
                })
            }
            return{
                ...state,
                videogames:rating
            }
        case FILTRANDO_CREADOS:
            const allVideogames = state.copiVideogames
            const apiVideogames = allVideogames.filter(e => e.id < 700001)
            const dbVideogames = allVideogames.filter( e => e.id.length > 25)
            const filtrados = action.payload === 'existente' ? apiVideogames : action.payload === 'creada' ? dbVideogames[0] ? dbVideogames: alert('no has creado ningun video juego ') ? allVideogames : dbVideogames : allVideogames
            console.log(allVideogames)
            return {
                ...state,
                videogames: filtrados
            }
        case CREATE_VIDEOGAMES:
            return{
                ...state
            }
        default:
            return {...state}
    }
}
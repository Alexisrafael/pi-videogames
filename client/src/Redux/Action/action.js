import { CREATE_VIDEOGAMES, FILTRADO_POR_GENEROS, FILTRANDO_CREADOS, GET_GENEROS, GET_LIMPIAR, GET_VIDEO_GAMES, GET_VIDEO_GAMES_DETAIL, GET_VIDEO_GAMES_NAME, ORDENEMIENTO_A_Z, ORDENEMIENTO_RATING } from "./actionTypes"
import axios from 'axios'

export const getVideosgames = (name) => async (dispatch) =>{
    try {
        if(name){
        return await axios.get(`/videogames?name=${name}`)
        .then(res =>{
            dispatch({type: GET_VIDEO_GAMES, payload: res.data})
        })
        }else{
        return await axios.get('/videogames')
        .then(res =>{
            dispatch({type: GET_VIDEO_GAMES, payload: res.data})
        })
        }
    } catch (error) {
        alert(`El nombre: ${name}, no existe`)
    }
}

export const getVideosgamesByName = (name) => async (dispatch) =>{
    try {
        if(name){
            return await axios.get(`/videogames?name=${name}`)
        .then(res =>{
            dispatch({type: GET_VIDEO_GAMES_NAME, payload: res.data})
        })
        }
    }catch (error) {
        alert(`El nombre: ${name}, no existe`)
    }
}

export const getVideosgamesDetail = (id) => async (dispatch) =>{
    try {
        if(id){
        return await axios.get(`/videogame/${id}`)
        .then(res =>{
        dispatch({type: GET_VIDEO_GAMES_DETAIL, payload: res.data})
        })
    }/* else{
        dispatch({type: GET_VIDEO_GAMES_DETAIL, payload: id})
    } */
    } catch (error) {
        alert(`El id: ${id}, no existe`)
    }
    
}

export const getLimpiar = ()=>{
    return ({type: GET_LIMPIAR, payload:[]})
}

export const getGeneros = () => async (dispatch)=>{
    return await axios.get('/genres')
    .then(res =>{
        dispatch({type:GET_GENEROS, payload: res.data})
    })
    .catch(error=>{
        dispatch({type:GET_GENEROS, payload: error})
    })
}

export const filtradoDeGeneros = (generos)=>{
    return {type:FILTRADO_POR_GENEROS, payload:generos}
}

export const ordenamientosAZ = (value) =>{
    return {type:ORDENEMIENTO_A_Z, payload:value}
}

export const ordenamientosRanting = (value) =>{
    return {type:ORDENEMIENTO_RATING, payload:value}
}

export const filtrandoCreados = (value) =>{
    return {type: FILTRANDO_CREADOS, payload: value}
}

export const createVideogames = (value) => async (dispatch) =>{
    return await axios.post(`/videogames`,value)
    .then(res =>{
        dispatch({type: CREATE_VIDEOGAMES, payload: res.data})
    })
}
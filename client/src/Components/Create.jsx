import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createVideogames, getGeneros } from '../Redux/Action/action'
import NavBar from './NavBar'
import est from './Modules/create.module.css'

const Create = () => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const videogames = useSelector(state => state.videogames)
    const generos = useSelector(state=>state.generos)
    const [datos, setDatos] = useState({
        name:'',
        image:'',
        releaseDate:'',
        generos:[],
        rating:0,
        platforms:'',
        description:''
    })
    const [error, setError] = useState({
        image:"Debe tener una imagen",
        name:"Debe tener un nombre",
        releaseDate:'Debes indicar la fecha de creación',
        generos:'Debes indicar a qué género pertenece',
        rating:'Debe contener una puntuación de rating',
        platforms:'Debes indicar las plataformas en las que se puede jugar',
        description:'Debes dar una pequeña descripción del video juego'
    });
    const ordenandoGeneros = generos.length < 1 ? generos : generos.sort()

    const validarCampos = (e) => {
        let error = {}
        if(!e.image){
            error.image = 'Debe contener una imagen'
        }
        if(!e.name){
            error.name = 'Debe contener un nombre válido'
        }
        if(!(/^[\w-\s]+$/).test(e.name)){
            error.name = 'Debe contener sólo letras y números'
        }
        if(!e.releaseDate){
            error.releaseDate = 'Debes agregar la fecha'
        }
        if(e.rating < 1 || e.rating > 5){
            error.rating = 'El rating no puede ser menor a 1, ni mayor a 5'
        }
        if(!e.platforms){
            error.platforms= 'Debe pertenecer a una plataforma de video juegos'
        }
        if(!e.description){
            error.description = 'ingresa la descripción'
        }
        if(e.generos < 1){
            error.generos = "Debe tener por lo menos 1 género"
        }
        return error
    }

    const handelOnChangeDatos = (e) =>{
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
        setError(validarCampos({
            ...datos,
            [e.target.name] : e.target.value
        }))
    }

    const handelOnChangeGeneros = (e)=>{
        if(!datos.generos.includes(e)){
            setDatos({
            ...datos,
            generos:[...datos.generos, e]
        })
        }else{
            setDatos({
                ...datos,
                generos:[...datos.generos]
            })
        }
        
    }

    const handelOnSubmit = () =>{
        if(error.hasOwnProperty('image') || error.hasOwnProperty('name') || error.hasOwnProperty('releaseDate')
        || error.hasOwnProperty('rating') || error.hasOwnProperty('platforms') || 
        error.hasOwnProperty('description') || error.hasOwnProperty('generos')){
            alert('Hay errores en los datos')
        }else if(videogames.find(e=> e.name.toLowerCase() === datos.name.toLowerCase())){
            alert('El video juego ya existe')
            history("/videogames")
        }else{
            dispatch(createVideogames(datos))
            alert('El video juego se creó correctamente')
            setDatos({
                name:'',
                image:'',
                releaseDate:'',
                generos:[],
                rating:0,
                platforms:'',
                description:''
            })
            history("/videogames")
        }
    }

    const deleteGeneros = (e) =>{
        setDatos({
            ...datos,
            generos:[...datos.generos.filter(element => element !== e.target.value)]
        })
    }

    useEffect(()=>{
        dispatch(getGeneros())
    },[dispatch])

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <h3>Completa el formulario para crear tu propio video juego</h3>
            <div className={est.formulario}>
                <div>
                    <form name='form' onSubmit={handelOnSubmit}>
                        <label name='label'>Nombre</label>
                        <div>
                            <input type="text" name='name' value={datos.name} onChange={handelOnChangeDatos}></input>
                            <h5>{error.name}</h5>
                        </div>
                        <label name='label'>Imagen</label>
                        <div>
                            <input type="text" name='image' value={datos.image} onChange={handelOnChangeDatos} />
                            <h5>{error.image}</h5>
                        </div>
                        <label name='label'>Fecha de creación</label>
                        <div>
                            <input type="date" name='releaseDate' value={datos.releaseDate} onChange={handelOnChangeDatos} />
                            <h5>{error.releaseDate}</h5>
                        </div>
                        <label name='label'>Rating</label>
                        <div>
                            <input type="number" name='rating' value={datos.rating} onChange={handelOnChangeDatos} />
                            <h5>{error.rating}</h5>
                        </div>
                        <div>
                            <select name='select' onChange={(e) => handelOnChangeGeneros(e.target.value)} >
                                <option key='generos' value=''>Géneros</option>
                                {
                                    ordenandoGeneros.map(e => {
                                        return (
                                            <option key={e.id} value={e.name}>{e.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <h5>{error.generos}</h5>
                        </div>
                        <label name='label'>Plataforn a las que pertenece</label>
                        <div>
                            <input type="text" name='platforms' value={datos.platforms} onChange={handelOnChangeDatos} />
                            <h5>{error.platforms}</h5>
                        </div>
                        <label name='label'>Descripción</label>
                        <div>
                            <textarea name="description" value={datos.description} onChange={handelOnChangeDatos}></textarea>
                            <h5>{error.description}</h5>
                        </div>
                        <button type='submit'> Crear Video juegos </button>
                    </form>
                </div>
                <div className={est.gener}>
                    {
                        datos.generos.length ?
                            datos.generos.map(e => (
                                <div key={e}>
                                    <button type='button' value={e} onClick={deleteGeneros}>x</button>
                                    <h3>{e}</h3>
                                </div>
                            )) : <h4>Seleccione Generos</h4>
                    }
                </div>
            </div>
        </div>
    );
}

export default Create;
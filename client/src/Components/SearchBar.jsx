import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtradoDeGeneros, filtrandoCreados, getVideosgamesByName, ordenamientosAZ, ordenamientosRanting } from '../Redux/Action/action';


const SearchBar = (props) => {
    const dispatch = useDispatch()
    const [busqueda, setBusqueda] = useState('')
    const {setCurrentPage} = props
    const generos = useSelector(state=>state.generos)
    const ordenandoGeneros = generos.length < 1 ? generos : generos.sort()
    
    const handelOnChange = (e)=>{
        setBusqueda(e.target.value)
    }

    const handelOnClick = ()=>{
        setCurrentPage(1)
        dispatch( getVideosgamesByName(busqueda))
        setBusqueda('')
    }

    const handelOnChangeGeneros = (e)=>{
        setCurrentPage(1)
        dispatch(filtradoDeGeneros(e.target.value))
    }
    
    const onChangeCreada = (e) =>{
        setCurrentPage(1)
        dispatch(filtrandoCreados(e.target.value))
    }

    return (
        <div>
            <div>
                <select name='select' onChange={onChangeCreada}>
                    <option value="Todos">Todos</option>
                    <option value="creada">Creada</option>
                    <option value="existente">Existente</option>
                </select>
            </div>
            <div>
                <select name='select' onChange={handelOnChangeGeneros}>
                    <option key='generos' value=''>Género</option>
                    {
                        ordenandoGeneros.map(e =>{
                            return(
                                <option key={e.id} value={e.name}>{e.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <input type="text" value={busqueda} onChange={handelOnChange} placeholder="Nombre del video juego"/>
                <button type='submit' onClick={handelOnClick}>buscar</button>
            </div>
        </div>
    );
}

export default SearchBar;
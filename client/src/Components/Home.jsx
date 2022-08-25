import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGeneros, getVideosgames, ordenamientosAZ, ordenamientosRanting } from '../Redux/Action/action';
import { Link } from 'react-router-dom';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import css from './Modules/home.module.css'
import NavBar from './NavBar';

const Home = () => {
    const dispatch = useDispatch()
    const videogames = useSelector(state => state.videogames)
    const [numPag, setNumPag] = useState(1)
    const [numVid] = useState(15)
    const [orden, setOrden] = useState('')

    const infPag = numPag * numVid;
    const infgamesPag = infPag - numVid;
    const paginados = videogames.slice(infgamesPag,infPag);

    const numPaginas = (num)=>{
        setNumPag(num)
    }

    const handelOnChangeOrdenamiento= (e)=>{
        setNumPag(1)
        dispatch(ordenamientosAZ(e.target.value))
        setOrden(`ordenado ${e.target.value}`)
    }

    const handelOnChangeOrdenamientoRating= (e)=>{
        setNumPag(1)
        dispatch(ordenamientosRanting(e.target.value))
        setOrden(`ordenado ${e.target.value}`)
    }

    useEffect(()=>{
        dispatch(getVideosgames())
        dispatch(getGeneros())
    },[dispatch])

    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div className={css.filtrado}>
                <select defaultValue={orden} onChange={(e)=>handelOnChangeOrdenamientoRating(e)}>
                    <option value="Elegir">Elegir ranting</option>
                    <option value="asc">Menor</option>
                    <option value="dec">Mayor</option>
                </select>
                <select defaultValue={orden} onChange={(e)=>handelOnChangeOrdenamiento(e)}>
                    <option value="Elegir">Elegir ordenamiento</option>
                    <option value="az">De "A" a la "Z"</option>
                    <option value="za">De "Z" a la "A"</option>
                </select>
                <SearchBar setCurrentPage={setNumPag} />
            </div>
            <div>
            <Paginado paginas={numVid} videoGmes={videogames.length} ejecucion={numPaginas}/>
            </div>
            <div>
                <h3>{numPag}</h3>
            </div>
            <div className={css.contenedor}>
                {
                    paginados.length ?
                    paginados.map(e =>{
                        return (
                            <div className={css.card} key={e.id}>
                                <Link to={`/videogame/${e.id}`}><img src={e.image} alt={e.name}/></Link>
                                <h3>{e.name}</h3>
                                <h4>🎮 {e.generos? e.generos :'Genero desconocido'}</h4>
                                <h4>⭐ {e.rating ? e.rating.toFixed(1) :'Rating desconocido'}</h4 >
                            </div>
                        )
                    }):<h3>cargando...</h3>
                }
            </div>
        </div>
    );
}

export default Home;
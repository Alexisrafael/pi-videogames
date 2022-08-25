import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLimpiar, getVideosgamesDetail } from '../Redux/Action/action';
import est from './Modules/detalle.module.css'
import NavBar from './NavBar';

const VideoDetail = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const detalles = useSelector(state => state.detalles)
    
    useEffect(()=>{
        dispatch(getVideosgamesDetail(id))
        return(dispatch(getLimpiar()))
    },[dispatch,id])
    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                {
                    detalles.name ?(
                    <div className={est.cardd} key={detalles.id}>
                        <div>
                            <h1>{detalles.name}</h1>
                            <img src={detalles.image} alt={detalles.name}/>
                            <div className={est.fondo}>
                                <p>🎮 {detalles.generos instanceof Array ? detalles.generos.map(e => e.name).join(', ') ? detalles.generos.map(e => e.name).join(', '):
                                'sin generos' : detalles.generos? detalles.generos: 'Genero desconocido'}</p>
                                <p>⭐ {/* detalles.rating ?  */detalles.rating/* : 'Rating desconocido' */}</p>
                            </div>
                        </div>
                        <div className={est.fondo}>
                            <p>🕹 {detalles.platforms}</p>
                            <p>Creado: {detalles.releaseDate}</p>
                            <div>
                                <p>Descrpcion:</p>
                                <p>{detalles.description}</p>
                            </div>
                        </div>
                    </div>): <h1>cargando...</h1>
                }
            </div>
        </div>
    );
}

export default VideoDetail;
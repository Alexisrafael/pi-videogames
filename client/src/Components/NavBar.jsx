import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getVideosgames } from '../Redux/Action/action';
import est from './Modules/NavBar.module.css'


const NavBar = () => {
    const dispatch = useDispatch()

    const handelOnClick = () =>{
        dispatch(getVideosgames())
    }
    return (
        <div>
            
            <div className={est.card}>
                <Link to='/'><img src="https://www.laguiadelvaron.com/wp-content/uploads/2017/08/842c76015d8c428b550bb2984a172bfb_sony_playstation_dual_shock_controller_by_blueamnesiacd6w0ta7.png" alt="" /></Link>
                <Link to='/videogames'><button onClick={handelOnClick}>Video Juegos</button></Link>
                <Link to='/createVideogames'><button>Crea un Video juego</button></Link>
            </div>
            
        </div>
    );
}

export default NavBar;
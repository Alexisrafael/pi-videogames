import React from 'react';
import { Link } from 'react-router-dom';
import est from './Modules/LandingPage.module.css'
import foto from './ftestickers-pressstart-press-start-videogame-videogames-192656.png'

const LandingPage = () => {
    return (
        <div className={est.card}>
            <div>
                <h2>Para los amantes de los video juegos</h2>
                <h2>Dale click al</h2>
                <Link to='/videogames'><img src={foto} alt="" /></Link>
            </div>
        </div>
        
    );
}

export default LandingPage;
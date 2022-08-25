import React from 'react';
import { Link } from 'react-router-dom';
import est from './Modules/LandingPage.module.css'

const LandingPage = () => {
    return (
        <div className={est.card}>
            <div>
                <h2>Para los amantes de los video juegos</h2>
                <h2>Dale click al</h2>
                <Link to='/videogames'><img src="https://www.laguiadelvaron.com/wp-content/uploads/2017/08/842c76015d8c428b550bb2984a172bfb_sony_playstation_dual_shock_controller_by_blueamnesiacd6w0ta7.png" alt="" /></Link>
            </div>
        </div>
        
    );
}

export default LandingPage;
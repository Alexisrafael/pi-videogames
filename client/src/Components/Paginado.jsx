import React from 'react'
import est from './Modules/paginado.module.css'

const paginado = ({paginas, videoGmes, ejecucion}) => {
    const pag = [];
    for( let i= 0; i <= Math.ceil(videoGmes/paginas)-1; i++){
        pag.push(i+1)
    }
    return (
        <nav>
            <ul>
                <div className={est.pag}>
                {
                    pag.length ? pag.map(num =>{
                        return (
                            <div key={num}>
                                <button onClick={()=> ejecucion(num)}>{num}</button>
                            </div>
                        )
                    }):<h2>No se han encontrado video juegos</h2>
                }
                </div>
            </ul>
        </nav>
    );
}

export default paginado;
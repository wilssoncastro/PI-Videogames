import React from "react";
import './styles/Paginado.css' 

export default function Paginado ({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers =[]

    for (let i = 1; i < Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i)
        }
    return(
        <nav>
            <ul className="paginado">
                { pageNumbers && pageNumbers.map(number =>(
                    <li className="number" key={number}>
                        <a onClick={()=> paginado(number)}>{number}</a>
                    </li>
                    
                ))}
            </ul>
        </nav>
    )
}

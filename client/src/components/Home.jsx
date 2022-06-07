import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllVideogames,
    filterVideogameByGenre,
    getGenres,
    getPlatforms,
    filterByCreated,
    filterByAlpha,
    filterByRating,
    filterVideogameByPlatform,
    getDetail
    
} from '../redux/actions.js'
import { Link } from 'react-router-dom'
import Paginado from "./Paginado.jsx";
import Cards from "./Cards";
import SearchBar from "./SearchBar.jsx";
import './styles/home.css'



export default function Home() {
    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.videogames)
    const allVideogamesLoad = useSelector((state) => state.allVideogames)
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    
    

    //orden alfabetico
    const [order, setOrder] = useState('')
    //paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setVideogamePerPage] = useState(15)
    const indexOfLastVideogame = currentPage * videogamesPerPage
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
  
   
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        dispatch(getAllVideogames())
        dispatch(getGenres());
        dispatch(getPlatforms())
        
    }, [dispatch])

    function handleClick(e) {

        dispatch(getAllVideogames())
    }

    function handleFilterGenre(e) {
        e.preventDefault()
        dispatch(filterVideogameByGenre(e.target.value))
    }
    function handleFilterPlatform(e) {
        e.preventDefault()
        dispatch(filterVideogameByPlatform(e.target.value))
    }

    function handleFilterByCreated(e) {
        e.preventDefault()
        dispatch(filterByCreated(e.target.value))
    }

    function handleFilterByAlpha(e) {
        e.preventDefault()
        dispatch(filterByAlpha(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }
    function handleFilterByRating(e) {
        e.preventDefault()
        dispatch(filterByRating(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    return (
        <div className="allHome">
            {!allVideogamesLoad.length ?
                <div className="loading">

                    <img src='https://i0.wp.com/www.puntogeek.com/wp-content/uploads/2013/11/hC2dAuK.gif?resize=150%2C150' alt="not found" />
                    <br />
                    <img src='https://www.tuoptica.co/wp-content/themes/ronby/images/blog-loader.gif' alt="loading" />
                </div> : <div className="allHome">

                    <div className="Nav">
                        <Link to='videogames/create'>
                            <button className="buttonHome">+ CREATE</button>
                        </Link>
                        <button className="buttonHome" onClick={e => { handleClick(e) }}>Reload Videogames</button>
                        <Link to='/'>
                            <button className="buttonHome">EXIT</button>
                        </Link>

                        <div className="SearchBar">
                            <SearchBar></SearchBar>
                        </div>
                        </div>

                        <div >
                        </div>
                            <div >
                                <select className="custom-select" onChange={e => { handleFilterByAlpha(e) }} >
                                    <option disabled={order}>Alphabetical order</option>
                                    <option value='asc'>A-Z</option>
                                    <option value='desc'>Z-A </option>
                                </select>
                            </div>
                            <select className="custom-select" id="ratingSelect" onChange={e => { handleFilterByRating(e) }}>
                                <option disabled={order}>Select Rating</option>
                                <option value="asc">to the least popular</option>
                                <option value="des">to the most popular</option>
                            </select>




                            <select className="custom-select" name="genres" onChange={(e) => handleFilterGenre(e)}>
                                <option value={'all'}>All Genres</option>

                                {genres?.map((x) => {
                                    return <option value={x.name}>{x.name}</option>;
                                })}
                            </select>

                            <select className="custom-select" name="platforms" onChange={(e) => handleFilterPlatform(e)}>
                                <option value={'all'}>All Platforms</option>

                                {platforms?.map((p) => {
                                    return <option value={p.name}>{p.name}</option>;
                                })}
                            </select>

                            <select className="custom-select" id="originSelect" onChange={(e) => handleFilterByCreated(e)}>
                                <option value="all">All Video Games</option>
                                <option value="api">Existing</option>
                                <option value="created">Created</option>
                            </select>

                        


                    
                    <Paginado
                        videogamesPerPage={videogamesPerPage}
                        allVideogames={allVideogames.length}
                        paginado={paginado}
                    />


                    <h1>Videogames</h1>

                    {currentVideogames.length ?
                        currentVideogames?.map(e => {
                            return (

                                <Link to={"/home/" + e.id}>
                                    <Cards
                                        name={e.name}
                                        image={e.image}
                                        genres={e.genres}
                                        platforms={e.platforms}
                                        rating={e.rating} />
                                </Link>

                            )
                        }) : <div className="errorFound">
                            <h1>Sorry!, the searched video game is not found</h1>
                            <h2>Error 404</h2>
                            <img src="https://www.pngplay.com/wp-content/uploads/6/Game-Over-Yellow-Transparent-PNG.png" />
                        </div>



                    }




                </div>
            }
        </div>


    )


}

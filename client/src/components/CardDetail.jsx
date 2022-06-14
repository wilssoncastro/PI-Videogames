import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
import { getDetail , deleteVideogame } from "../redux/actions"
import './styles/CardDetail.css'
import axios from "axios"



export default function CardDetail() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const history = useHistory()

    let videogame = useSelector(state => state.detail)
    
    // const [videogame, setVideogame] = useState("");
    
    useEffect(() => {
        dispatch(getDetail(id))         
    }, [dispatch, id])

    function handleDelete(id){
        function confirmacion(){
           var respuesta = window.confirm('Are you sure you want to delete the game?')
           if (respuesta === true){
               dispatch(deleteVideogame(id))
               history.push('/home')
            }
        } 
        confirmacion()                    
        }
        
    


    // useEffect(() => {
        
    //     axios.get(`http://localhost:3001/videogame/${id}`)
    //     .then((x) => {
    //         // ------------
    //         setVideogame(x.data);
    //         // ------------
    //       })
    //       .catch((e) => console.log(e));
    
    //     // willUnmount
    //     return () => {
    //       setVideogame("");
    //     };
    //   }, []);

   

    function handleClick(e) {
        
        history.push('/home')
        
    }
    return (
        <div>
            <div className="allCard">

                {videogame.id != id?        
                          

                    <div className="loading">

                        <img src='https://i0.wp.com/www.puntogeek.com/wp-content/uploads/2013/11/hC2dAuK.gif?resize=150%2C150' alt="not found" />
                        <br />
                        <img src='https://www.tuoptica.co/wp-content/themes/ronby/images/blog-loader.gif' alt="loading" />
                    </div>:
                     <div className="cardDetail">
                     <div className="containterLeft">

                         <h1>{videogame.name}</h1>
                         <img src={videogame.image} className="imgDetailCard" alt="Imagen del jueego" />
                         <br></br>
                         <h3>Description</h3>
                         <p>{videogame.description.replace(/<[^>]+>/g, '')}</p>
                         <h3>Genres:</h3>
                         {videogame.genres?.map(e => {
                             if (typeof (e) === 'string') {
                                 return (

                                     <span className="type" key={e}>
                                         {e.replace(e[0], e[0].toUpperCase())} |
                                     </span>

                                 )
                             }
                             else {
                                 return (

                                     <span key={e.name}>
                                         {e.name} |
                                     </span>

                                 )
                             }

                         })

                         }
                         <h3>Platforms:</h3>
                         {
                             videogame.platforms?.map(e => {
                                 if (typeof (e) === 'string') {
                                     return (

                                         <span className="type" key={e}>
                                             {e.replace(e[0], e[0].toUpperCase())} |
                                         </span>

                                     )
                                 }
                                 else {
                                     return (
                                         <span key={e.name}>
                                             {e.name} |
                                         </span>
                                     )
                                 }

                             })
                         }
                     </div>
                     <div className="containerRight">
                         <div className="info">
                             <label>Released</label>
                             <h6>{videogame.released}</h6>
                             <label>Rating</label>
                             <h3>{videogame.rating}</h3>
                             {
                            videogame.createdInDb && (
                                <div>
                                                                  
                                        <button onClick={() => handleDelete(id)} className="ButtonBack">
                                            DELETE
                                        </button>
                                       
                                    
                                 </div>
                            )
                        }
                         </div>
                     </div>
                    

                 </div>

                 
                }

            </div>
           
                <button onClick={(e) => {handleClick(e)}} className="ButtonBack">Back to home!</button>
            
        </div>
    )

}
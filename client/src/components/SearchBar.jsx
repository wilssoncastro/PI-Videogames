import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVidogamesByName } from "../redux/actions";
import './styles/SearchBar.css'

function validate(input) {
    let error = "";
    if (input === "") {
        error = "PLEASE INSERT A NAME";
    }
    return error;
}

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [error, setError] =useState("")
    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        
        console.log(name)
    }

    async function handleSubmit(e){
        e.preventDefault()
        if(name !== ""){
            await dispatch(getVidogamesByName(name))
            setName("")
        }
        setError(validate(name))       
    }
   

    return(
        <div className="containerSearch">
        <input type="text"
        className="inputSearch"
         name="name"
         value={name}
          placeholder="search game..." 
          onChange={e => handleInputChange(e)} />
        <button className="buttonHome"
        type="submit"        
        onClick={(e) => handleSubmit(e)}
        >Search
        </button>
        {error && (<h1 className="search-error">{error}</h1>)}
        
    </div>
    )
    
}
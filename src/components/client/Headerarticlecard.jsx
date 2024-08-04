import React, { memo } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {setPage,setSearchTerm} from "../../features/articleSlice";



const Headerarticlecard = () => {
console.log("hassan")
  const dispatch=useDispatch()
  
  let {searchTerm} = useSelector((state)=>state.storearticles);

  return (
    
  <div className="search-container">
            <i className="fa-solid fa-search"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(event)=>{ dispatch(setSearchTerm(event.target.value));dispatch(setPage(1))}}
              placeholder="Rechercher des articles..."
              className="search-input"
            />
          </div>
        

  )
}

export default memo(Headerarticlecard);

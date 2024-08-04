import React, { memo } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {setPage,setSearchTerm} from "../../../features/articleSlice";

// Sélecteur personnalisé pour extraire uniquement searchTerm
const useSearchTerm = () => useSelector(
  state => state.storearticles.searchTerm,
  (prev, next) => prev === next // Comparaison pour éviter les rerendus inutiles
);

const Headerarticle = () => {
console.log("headerarticle")
  const dispatch=useDispatch()
  
 
  const searchTerm = useSearchTerm();
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

export default memo(Headerarticle)


import React, { memo, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {setPage, setLimit, getArticlesPagination} from "../../../features/articleSlice";

import Affichearticle from './Affichearticle';
import Pagination from './Pagination';
import Headerarticle from './Headerarticle';


const useListArticlesState = () => {
  return useSelector(
    (state) => ({
      page: state.storearticles.page,
      limit: state.storearticles.limit,
      searchTerm: state.storearticles.searchTerm,
    }),
    (prev, next) => 
      prev.page === next.page &&
      prev.limit === next.limit &&
      prev.searchTerm === next.searchTerm
  );
};

const Listarticles = () => {
  console.log("listearticles")
  const dispatch=useDispatch()
  const { page, limit, searchTerm } = useListArticlesState();

  const getProducts = useCallback(async () => {
    await dispatch(getArticlesPagination());
  }, [dispatch, page, limit, searchTerm]);

useEffect(() => {
getProducts()
}, [getProducts])
const handleLimitChange = (event) => {
  dispatch(setLimit(parseInt(event.target.value, 10))); 
  dispatch(setPage(1)); // Réinitialiser la page lorsque le nombre d'éléments par page change

};


  return (
    <div>
     
    <div className="table-container-header">
    <Headerarticle/>
   </div>
     
   <Affichearticle/> 

     <div style={{ "display": "flex", "justifyContent": "right"}}> 
     <div className="limit-selector-container">
                
               <label>
                   Afficher &nbsp;
                   <select
                     value={limit}
                     onChange={(event) =>  {handleLimitChange(event)}}
                   >
                     <option value={5}>5</option>
                     <option value={10}>10</option>
                     <option value={20}>20</option>
                     <option value={100}>100</option>
                   </select>
                   
                 </label>
                 </div>
    <Pagination />
     </div>    
   </div>

  )
}

export default memo(Listarticles)

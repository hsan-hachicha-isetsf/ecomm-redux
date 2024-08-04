import React, { memo } from 'react'

import {  useSelector } from "react-redux";


 // Sélecteur personnalisé pour extraire uniquement searchTerm
 const useArticles = () => {
    return useSelector(
        (state) => ({
          articles: state.storearticles.articles,
          isLoading: state.storearticles.isLoading,
          error: state.storearticles.error,
        }),
        (prev, next) => 
          prev.articles === next.articles &&
          prev.isLoading === next.isLoading &&
          prev.error === next.error
      );
  };
  

const Affichearticle = () => {
    console.log("affichearticle")
    
     const { articles, isLoading, error } = useArticles()
  return (
    <div className="table-container">
      {isLoading ? (
                <div className="loading-message">Chargement en cours...</div>
            ) : error ? (
                <div className="error-message">Erreur : {error}</div>
            ) : (
    <table >
    
    <thead>
    <tr>
        <th >Image</th>
        <th>Référence</th>
        <th>Désignation</th>
        <th>Marque</th>
        <th>Quanité</th>
        <th>Prix</th>
        <th>Modifier</th>
        <th>Supprimer</th>
    </tr>
    </thead>
    <tbody>
        {
            articles.map((art,index)=>
            <tr key={index}>
                <td><img src ={art.imageart} width={80} height={80} /></td>
                <td>{art.reference}</td>
                <td>{art.designation}</td>
                <td>{art.marque}</td>
                <td>{art.qtestock}</td>
                <td>{art.prix}</td>
                <td><button className='edit'>
                <i className="fa-solid fa-pen-to-square"></i>Update</button></td>
    
                <td><button className="delete" >
            
                <i className="fa-solid fa-trash"></i>
                
                Delete</button></td>
    
            </tr>
            )}
    
    </tbody>
    <tfoot>
                
            </tfoot>
    </table>
         
)}

    </div>    
  )
}

export default memo(Affichearticle)

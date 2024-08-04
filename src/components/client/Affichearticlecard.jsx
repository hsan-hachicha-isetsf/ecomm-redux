import React, { memo } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";

import { useNavigate } from "react-router-dom";


const AfficheArticlecard = () => {
    const dispatch = useDispatch();

    
    const handleAddToCart = (art) => {
      dispatch(addToCart(art));
     // navigate("/cart");
    };
    
     
    
const {articles,isLoading,error} = useSelector((state)=>state.storearticles);
 
return (
<div className="card-container">
  {isLoading ? <center>Loading ....</center>:null}
  {error ? <center>Error ....</center>:null}
{isLoading===false && articles && articles.map((article,ind)=>{
    return <div className='card' key={ind}>
     {article.imageart &&  <img src={article.imageart} alt ={article.reference}/>}
    <div className='card-content'>
        <h1 className='card-title'>{article.reference}</h1>
        <p className='card-description'>{article.designation.substr(0,20)}</p>
        <h1 className='card-title'>Prix : {article.prix} TND</h1>
        <button className='card-button' disabled={article.qtestock<=1} onClick={() => handleAddToCart(article)}><i className="fa-solid fa-cart-shopping"></i>Add to card</button>
    </div>

    </div>
  })}
</div>

  )
}

export default memo(AfficheArticlecard)

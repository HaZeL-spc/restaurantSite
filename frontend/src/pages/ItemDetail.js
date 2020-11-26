import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Template from '../components/Template';

const ItemDetail = (props) => {

  const [ mealState, setMealState ] = useState({
    name:"",
    ingredients:[],
    image: ""
  })

  useEffect(() => {
    getMeal()
  }, [])

  const getMeal = async () => {
    let pathname = props.location.pathname.substring(1)
    let indexOfSlug = pathname.indexOf('/')

    const meal = await axios.get(`http://127.0.0.1:8000/api/meal-detail${pathname.substring(indexOfSlug)}/`)
    setMealState(meal.data)
  }

  return (
      <Template>
        <div className="row image-holder" >
          <div className="col-12 col-lg-8 item-detail-info">
            <img 
              className="image-card-detail" 
              src={"http://127.0.0.1:8000/api" + mealState.image.trim()} 
              alt="Card cap"
              width="110%"
            />
          </div>
          <div className="col-12 col-lg-4 item-detail-info-text d-flex flex-column">
            <h1 className="meal-detail-name text-italy">{mealState.name}</h1>
            <ul>
              {
                mealState.ingredients.map(ing => (
                  <li key={ing.id} style={{fontSize: "25px"}} className="text-italy">- {ing.name}</li>
                ))
              }
            </ul>
            <button type="button" className="btn btn-lg-buy-meal text-italy">Zamów</button>
            
          </div>
          <div style={{width: "100%"}} className="item-detail-info">
            <button type="button" className="btn btn-buy-meal text-italy">Zamów</button>
          </div>
        </div>
    </Template>
  );
};

export default ItemDetail;
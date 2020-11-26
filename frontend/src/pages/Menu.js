import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import {Link} from 'react-router-dom'
import CreateMeal from '../components/CreateMeal';
import useWindowSize from '../useWindowSize'
import axios from 'axios'
import SiteText from '../components/SiteText';
import Template from '../components/Template';

const Menu = () => {
  const [ meals, setMeals ] = useState([])

  useEffect(() => {
    getMeals()
  }, [])

  const getMeals = async () => {
    const meals = await axios.get("http://127.0.0.1:8000/api/meal-list/")
    setMeals(meals.data)
  }

  console.log(meals)

  return (
    <Template>
      <div className="row image-holder">
        {
          meals.map(meal => 
              <div
                key={meal.id} 
                className="image-card-div col-sm-6 col-md-4 col-lg-3 col-12 my-1"
              >
                <Link className="d-flex justify-content-center" 
                  to={{
                    pathname: `/menu/${meal.slug}`,
                  }}
                  >
                  <ul className="meal-description d-flex flex-column justify-content-center ml-3">
                    <h2
                      className="text-italy text-white text-center font-size-formula"
                      ><ins>{meal.name}</ins>
                    </h2>
                    <h5 className="text-italy text-white text-center">Składniki:</h5>
                    <div className="d-flex flex-row ml-5">
                      {
                        meal.ingredients.length > 0 && 
                        meal.ingredients.map(ing => {
                          return <span className="text-italy text-center text-white" key={ing.id}>&nbsp;{ing.name},</span>
                        })
                      }
                    </div>
                  </ul>
                  <img 
                    className="image-card" 
                    src={"http://127.0.0.1:8000/api" + meal.image.trim()} 
                    alt="Card image cap"
                  />
                </Link>
              </div>
          )
        }
      </div>
    </Template>
  );
};

export default Menu;
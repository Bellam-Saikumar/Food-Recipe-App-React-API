import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Mealinfo = () => {
    const { idMeal } = useParams(); 
    const [info, setInfo] = useState(null);

    useEffect(() => {
        const getInfo = async () => {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
            const jsonData = await response.json();
            setInfo(jsonData.meals[0]); 
        };
        getInfo();
    }, [idMeal]); 

    const getIngredients = (info) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = info[`strIngredient${i}`];
            const measure = info[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
            }
        }
        return ingredients;
    };


    return (
      <div>
        {!info ? (
          <p style={{ textAlign:"center" }}>Loading</p>
        ) : (
          <div>
            <h1 class="mealTitle">Food Recipe</h1>
          <div className="mealInfo">
            <img src={info.strMealThumb} alt={info.strMeal} />
            <div className="info">
              <h1>Recipe Detail: {info.strMeal}</h1>
              <h3>Ingredients:</h3>
              <ul>
                {getIngredients(info).map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h3>Instructions:</h3>
              <p>{info.strInstructions}</p>
              {info.strYoutube && (
                <div>
                  <h3>Watch the Recipe Video:</h3>
                  <a href={info.strYoutube} target="_blank" rel="noopener noreferrer">
                    {info.strYoutube}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        )}
      </div>
    );
   }
export default Mealinfo;

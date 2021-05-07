import React, { useState } from "react";
import RecipeDetails from "./RecipeDetails";

export default function Recipe({ recipe }) {
  const { label, image, url, ingredients, calories } = recipe.recipe;

  const [show, setShow] = useState(false);

  return (
    <div className="recipe">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={image} alt={label} />
      </a>
      <h2 className="recipe-title">{label}</h2>
      <p className="recipe-calories">{calories.toFixed(0)} cal.</p>
      <button className="btn recipe-btn" onClick={() => setShow(!show)}>
        Ingredients
      </button>
      <div className="ingredients">
        {show && <RecipeDetails ingredients={ingredients} />}
      </div>
    </div>
  );
}

import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function RecipeDetails({ ingredients }) {
  return (
    <div>
      {ingredients.map((ingredient) => {
        return (
          <ul className="ingredients-list" key={uuidv4()}>
            <li className="ingredient-text">{ingredient.text}</li>
          </ul>
        );
      })}
    </div>
  );
}

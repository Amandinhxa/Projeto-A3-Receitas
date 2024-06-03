import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/recipes')
      .then(response => { 
        console.log(response.data)
        setRecipes(response.data);
      });

  }, []);

  return (
    <div>
      <h2>Lista de Receitas</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <p>Ingredientes: {recipe.ingredieFnts}</p>
            <p>Passos: {recipe.steps}</p>
            <p>Autor: {recipe.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
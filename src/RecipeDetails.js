import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams(); // Accessing the recipe ID from URL params
  const [recipe, setRecipe] = useState(null); // State to store the recipe data

  // Fetch recipe details when the component mounts
  useEffect(() => {
    fetchRecipe();
  }, [id]);

  // Function to fetch recipe details based on the ID
  async function fetchRecipe() {
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipe');
      }
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  }

  // Render loading message while fetching data
  if (!recipe) {
    return <div>Loading...</div>;
  }

  // Render recipe details once fetched
  return (
    <div>
      <h2>{recipe.name}</h2>
      <img src={recipe.imageURL} alt={recipe.name} />
      <p>{recipe.details}</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      {/* Add more details as needed */}
    </div>
  );
}

export default RecipeDetails;
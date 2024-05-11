import './App.css';
import { useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  function handleSearchInputChange(event) {
    setSearchTerm(event.target.value);
  }

  async function searchRecipe() {
    const postdata = { term: searchTerm };
    console.log(postdata);
    fetch("http://localhost:5000/api/recipes/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postdata)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setRecipes(data);
      })
      .catch(error => console.log(error));
  }

  function handleRecipeClick(recipe) {
    setSelectedRecipe(recipe);
  }

  return (
    <div className="App">
      <h1>Recipe Search</h1>
      <label>Search Recipe : </label>
      <input type="text" onChange={handleSearchInputChange}></input>
      <button onClick={searchRecipe}>Search</button>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id} className="tooltip" onClick={() => handleRecipeClick(recipe)}>
            <img className='image' src={recipe.imageURL} alt={recipe.name} />
            <div>{recipe.name}</div>
            <span className="tooltip-text">{recipe.details}</span>
          </li>
        ))}
      </ul>
      {selectedRecipe && (
        <div className="recipe-details">
          <h2>{selectedRecipe.name}</h2>
          <img class='full' src={selectedRecipe.imageURL} alt={selectedRecipe.name} />
          <p id='deta'>{selectedRecipe.details}</p>
          <h3 id='in'>Ingredients</h3>
          <ul className='ing'>
        {selectedRecipe.ingredients && selectedRecipe.ingredients.map((ingredient, index) => (
          <li class='items' key={index}>{ingredient.name}: {ingredient.quantity}</li>
        ))}
        </ul>

        </div>
      )}
    </div>
  );
}

export default App;

// src/components/RecipeList.jsx
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  const displayRecipes = searchTerm ? filteredRecipes : recipes;

  if (!displayRecipes.length) return <div>No recipes found.</div>;

  return (
    <div>
      {displayRecipes.map((recipe) => (
        <div key={recipe.id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <div>
            <Link to={`/recipes/${recipe.id}`}>View</Link>{' '}
            <Link to={`/recipes/${recipe.id}/edit`}>Edit</Link>{' '}
            <DeleteRecipeButton id={recipe.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;

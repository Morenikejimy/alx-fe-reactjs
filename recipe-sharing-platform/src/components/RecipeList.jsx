// src/components/RecipeDetails.jsx
import { useParams } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams(); // get recipe id from URL
  const recipeId = Number(id);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const favorites = useRecipeStore((state) => state.favorites);

  if (!recipe) return <div>Recipe not found.</div>;

  const isFavorite = favorites.includes(recipe.id);

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      {/* ⭐ Favorite Button */}
      <button
        onClick={() => (!isFavorite ? addFavorite(recipe.id) : null)}
        disabled={isFavorite}
      >
        {isFavorite ? 'Favorited' : 'Add to Favorites'}
      </button>

      {/* Existing edit + delete */}
      <EditRecipeForm recipeId={recipeId} />
      <DeleteRecipeButton recipeId={recipeId} />
    </div>
  );
};

export default RecipeDetails;

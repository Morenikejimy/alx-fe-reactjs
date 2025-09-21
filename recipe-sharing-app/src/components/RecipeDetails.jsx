// src/components/RecipeDetails.jsx
import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = ({ recipeId: propRecipeId }) => {
  const params = useParams();
  // support both prop-based invocation (for tests) and route param
  const recipeId = propRecipeId ?? Number(params.id);

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === Number(recipeId))
  );

  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <div style={{ marginTop: 12 }}>
        <Link to={`/recipes/${recipe.id}/edit`}>Edit</Link>{' '}
        <DeleteRecipeButton id={recipe.id} />
      </div>

      <div style={{ marginTop: 12 }}>
        <Link to="/">Back to list</Link>
      </div>
    </div>
  );
};

export default RecipeDetails;

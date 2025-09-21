// src/components/EditRecipeForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = ({ recipeId: propRecipeId }) => {
  const params = useParams();
  const id = propRecipeId ?? Number(params.id);
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === Number(id))
  );
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
  }, [recipe]);

  if (!recipe) return <div>Recipe not found</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    // updateRecipe accepts id and a partial/whole recipe object
    updateRecipe(Number(id), { id: Number(id), title, description });
    navigate(`/recipes/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <button type="submit">Save</button>{' '}
      <button type="button" onClick={() => navigate(-1)}>Cancel</button>
    </form>
  );
};

export default EditRecipeForm;

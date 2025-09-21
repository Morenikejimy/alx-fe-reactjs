// src/components/SearchBar.jsx
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    filterRecipes(); // dynamically updates filteredRecipes
  };

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={handleChange}
      style={{ marginBottom: 12, padding: 6 }}
    />
  );
};

export default SearchBar;

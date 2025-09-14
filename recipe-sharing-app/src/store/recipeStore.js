// src/store/recipeStore.js
import { create } from "zustand";

const useRecipeStore = create(set => ({
  recipes: [], // Initial state: an empty array to hold recipes
  
  // Action to add a new recipe
  addRecipe: (newRecipe) => set(state => ({ 
    recipes: [...state.recipes, newRecipe] // Append newRecipe to the existing array
  })),
  
  // Action to replace all recipes (e.g., for initial loading)
  setRecipes: (recipes) => set({ recipes }) 
}));

export { useRecipeStore }; // Export the store so other components can use it
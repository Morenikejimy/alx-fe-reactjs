// src/components/AddRecipeForm.jsx
import React, { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore'; // Import our Zustand store

const AddRecipeForm = () => {
  // Get the 'addRecipe' action from our Zustand store
  const addRecipe = useRecipeStore(state => state.addRecipe);

  // Local state for the form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior (page reload)
    
    // Basic validation
    if (!title.trim() || !description.trim()) {
      alert("Please enter both a title and a description for the recipe.");
      return;
    }

    // Call the addRecipe action from our store
    addRecipe({ 
      id: Date.now(), // Simple unique ID for now
      title: title.trim(), 
      description: description.trim() 
    });

    // Clear the form fields after submission
    setTitle('');
    setDescription('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        maxWidth: '400px', 
        margin: '20px auto', 
        padding: '20px', 
        border: '1px solid #007bff', 
        borderRadius: '8px', 
        backgroundColor: '#e7f3ff' 
      }}
    >
      <h2>Add New Recipe</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        required
        style={{ marginBottom: '15px', padding: '10px', border: '1px solid #007bff', borderRadius: '4px' }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        rows="5"
        required
        style={{ marginBottom: '15px', padding: '10px', border: '1px solid #007bff', borderRadius: '4px' }}
      />
      <button 
        type="submit" 
        style={{ 
          padding: '12px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer', 
          fontSize: '16px' 
        }}
      >
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm; // Export the component
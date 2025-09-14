
import React from 'react';
import RecipeList from './Components/RecipeList';
import AddRecipeForm from './Components/AddRecipeForm'; // Import the AddRecipeForm component
import './App.css'; // Import default Vite CSS, or create your own

function App() {
  return (
    <div className="App" style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '900px', 
      margin: '30px auto', 
      padding: '20px', 
      backgroundColor: '#f9f9f9', 
      borderRadius: '10px', 
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <h1>My Recipe Sharing App</h1>
      <AddRecipeForm />   /* Render the form to add recipes */
      <RecipeList />      /* Render the list of recipes */
    </div>
  );
}

export default App;
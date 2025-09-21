// src/App.jsx
import React from 'react';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import './App.css'; // Assuming you might have some global styles

function App() {
  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Recipe Sharing App</h1>
      <AddRecipeForm />
      <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #eee' }} />
      <RecipeList />
    </div>
  );
}

export default App;
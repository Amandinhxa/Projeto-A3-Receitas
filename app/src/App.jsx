import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <RecipeList />
      </div>
    </AuthProvider>
  );
};

export default App;
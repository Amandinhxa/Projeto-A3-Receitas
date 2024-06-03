import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, login, logout } = useAuth();

  return (
    <nav>
      {user ? (
        <div>
          <p>Usuário logado: {user.username}</p>
          <button onClick={logout}>Sair</button>
        </div>
      ) : (
        <button onClick={() => login({ username: 'example_user' })}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;

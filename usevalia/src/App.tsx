
import './App.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { store } from './redux/store';
import Home from './components/Home';
import LoginForm from './components/Login';

const App: React.FC = () => {
  const isAuthenticated = Object.keys(store.getState().user).length !== 0;

  return (
    <div>
      {isAuthenticated ? <Home /> : <LoginForm />}
    </div>
  );
};

export default App;

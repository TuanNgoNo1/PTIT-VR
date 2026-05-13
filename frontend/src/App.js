import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/Router';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

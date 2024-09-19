// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage />} /> {/* Página de inicio con la cartelera */}
          <Route path="/app" element={<UserTable />} /> {/* Página principal */}
          <Route path="/login" element={<LoginPage />} /> {/* Página de inicio de sesión*/ }
          <Route path="/create" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
          <Route path="/signup" element={<UserForm />} />
          <Route path={'/select/${movieId}'} />
      </Routes>
    </Router>
  );
};

export default App;

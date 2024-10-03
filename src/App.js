// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SelectionInfoPage from "./pages/SelectionInfoPage";


const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage />} /> {/* Página de inicio con la cartelera */}
          <Route path="/app" element={<UserTable />} /> {/* Página principal */}
          <Route path="/login" element={<LoginPage />} /> {/* Página de inicio de sesión*/ }
          <Route path="/signup" element={<SignUpPage />} /> {/* Página de registro de usuarios*/ }
          <Route path="/create" element={<UserForm />} />
          <Route path="/signup" element={<UserForm />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/select/:id" element={<SelectionInfoPage/>} />
      </Routes>
    </Router>
  );
};

export default App;

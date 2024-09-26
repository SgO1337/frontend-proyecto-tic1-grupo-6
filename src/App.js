// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import SelectionInfoPage from './components/SelectionInfoPage';
import SelectInfoForm from "./components/SelectInfoForm";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage/>} /> {/* billboard */}
          <Route path="/app" element={<UserTable />} /> {/* users already registered */}
          <Route path="/login" element={<LoginPage />} /> {/* Login page*/ }
          <Route path="/signup" element={<SignUpPage />} /> {/* Sign up page*/ }
          <Route path="/signup" element={<UserForm />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/select/:id" element={<SelectionInfoPage/>} />
      </Routes>
    </Router>
  );
};

export default App;

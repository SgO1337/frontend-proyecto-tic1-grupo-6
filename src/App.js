// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTable />} />
        <Route path="/create" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm />} />
      </Routes>
    </Router>
  );
};

export default App;

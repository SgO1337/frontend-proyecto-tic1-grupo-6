// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserForm = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const { id } = useParams(); // Get user ID from the route if editing

  useEffect(() => {
    if (id) {
      // Fetch the user to edit
      axios.get(`https://backend-proyecto-tic1-grupo-6.onrender.com/api/users/view/${id}`)
          .then(response => setUser(response.data))
          .catch(error => console.error('Error fetching user!', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Update existing user
      axios.put(`https://backend-proyecto-tic1-grupo-6.onrender.com/api/users/update/${id}`, user)
          .then(() => window.location.href = '/')
          .catch(error => console.error('Error updating user!', error));
    } else {
      // Create new user
      axios.post('https://backend-proyecto-tic1-grupo-6.onrender.com/api/users/create', user)
          .then(() => window.location.href = '/')
          .catch(error => console.error('Error creating user!', error));
    }
  };

  return (
      <div>
        <h1>{id ? 'Edit User' : 'Create New User'}</h1>
        <form onSubmit={handleSubmit}>
          <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
          />
          <input
              type="password"
              placeholder="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
          />
          <button type="submit">{id ? 'Update User' : 'Create User'}</button>
        </form>
      </div>
  );
};

export default UserForm;


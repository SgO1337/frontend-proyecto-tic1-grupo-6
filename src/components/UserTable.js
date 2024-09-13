// src/components/UserTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from the backend
    axios.get('/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('There was an error fetching the users!', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/users/delete/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id)); // Remove deleted user from the list
      })
      .catch(error => console.error('There was an error deleting the user!', error));
  };

  return (
    <div>
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button onClick={() => window.location.href=`/edit/${user.id}`}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => window.location.href='/create'}>Create New User</button>
    </div>
  );
};

export default UserTable;


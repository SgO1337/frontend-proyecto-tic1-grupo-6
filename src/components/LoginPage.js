import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './stylesHomePage.css';
import axios from "axios"; // Si quieres añadir estilos específicos


const LoginPage = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState(''); // Para almacenar mensajes de error
    const navigate = useNavigate(); // Hook para navegación

    // To handle the form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    // To handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // checks if the email is registered
            const response = await axios.post('/api/auth/login', user);

            if (response.data.success) {
                // succesful login, redirect to the main page
                navigate('/');
            } else {
                // show the error message
                setError(response.data.message);
            }
        } catch (error) {
            // Handle the error
            if (error.response && error.response.status === 404) {
                setError('El email no está registrado.');
            } else if (error.response && error.response.status === 401) {
                setError('El email y la contraseña no coinciden.');
            } else {
                setError('Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.');
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra la advertencia de error */}
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
};

export default LoginPage;
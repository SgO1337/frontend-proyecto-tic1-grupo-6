import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './styles.css';
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
    const handleSubmit = (event) => {
        event.preventDefault();

        // Supongamos que estos son datos simulados para validación
        const registeredEmail = "user@example.com"; // Email registrado simulado
        const registeredPassword = "password123"; // Contraseña registrada simulada

        if (user.email !== registeredEmail) {
            setError('El email no está registrado.');
        } else if (user.password !== registeredPassword) {
            setError('El email y la contraseña no coinciden.');
        } else {
            setError('');
            navigate('/app'); // Redirige al usuario si el login es exitoso
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
        </div>
    );
};

export default LoginPage;
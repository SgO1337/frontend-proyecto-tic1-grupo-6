// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Si quieres añadir estilos específicos
import MoviesList from './MoviesList';

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // Redirige a la página principal
    };

    return (
        <div className="home-page">
            <h1>Current Movies Availables</h1>
            <MoviesList />
            <button className="login-button" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default HomePage;

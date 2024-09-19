// src/components/HomePage.js
import React, {useEffect} from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesHomePage.css'; // Si quieres añadir estilos específicos
import MoviesList from './MoviesList';
import axios from "axios";

const HomePage = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('billboard'); // Change from bildoard to snack menu
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogin = () => {
        navigate('/login'); // Goes to login page
    };

    const handleViewChange = (newView) => {
        setView(newView);
        setDropdownOpen(false);  // Close dropdown after choosing
    };

    return (
        <div className="home-page">
            {/* Top Bar */}
            <div className="navbar">
                <h1 className="cine-name">
                    <span className="Capital">W</span>
                    <span className="Lower">hat </span>
                    <span className="Capital">T</span>
                    <span className="Lower">he </span>
                    <span className="Capital">F</span>
                    <span className="Lower">un </span>
                    <span className="Capital">C</span>
                    <span className="Lower">inema</span>
                </h1>

                <div className="dropdown">
                    <button className="dropdown-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        {view === 'billboard' ? 'Billboard' : 'Snacks'} {/* Muestra la opción seleccionada */}
                    </button>
                    {dropdownOpen && (
                        <ul className="dropdown-menu">
                            <li onClick={() => handleViewChange('billboard')}>Billboard</li>
                            <li onClick={() => handleViewChange('snacks')}>Snacks</li>
                        </ul>
                    )}
                </div>
                {/* Placeholder for filters*/}

                <button className="login-button" onClick={handleLogin}>
                    Login
                </button>
            </div>

            {/* Principal content */}
            <div className="content">
                {view === 'billboard' ? (
                    <div>
                        <h2>ON SCREEN</h2>
                        <MoviesList/>
                    </div>
                ) : (
                    <div>
                        <h2>Snacks</h2>
                        <p>MENU</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;

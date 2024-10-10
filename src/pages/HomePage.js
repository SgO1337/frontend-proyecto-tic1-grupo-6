// src/components/HomePage.js
import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../components/stylesHomePage.css';
import MoviesList from '../components/MoviesList';


const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Use to get passed state
    const [view, setView] = useState('billboard'); // Change from billboard to snack menu
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        // Check if there is a view state passed from navigation
        if (location.state && location.state.view) {
            setView(location.state.view); // Set the view from navigation state
        }
    }, [location.state]);

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
                        {view === 'billboard' ? 'Billboard' : 'Snacks'}
                    </button>
                    {dropdownOpen && (
                        <ul className="dropdown-menu">
                            <li onClick={() => handleViewChange('billboard')}>Billboard</li>
                            <li onClick={() => handleViewChange('snacks')}>Snacks</li>
                        </ul>
                    )}
                </div>
                {/* Placeholder for filters*/}

                <button className="hlogin-button" onClick={handleLogin}>
                    Login
                </button>
            </div>

            {/* Principal content */}
            <div className="content">
                {view === 'billboard' ? (
                    <div>
                        <MoviesList />
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

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/stylesHomePage.css';
import Navbar from '../components/Navbar';
import MoviesList from '../components/MoviesList';

const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [view, setView] = useState('billboard'); // Default view is 'billboard'
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if there is a view state passed from navigation
        if (location.state && location.state.view) {
            setView(location.state.view);
        } else {
            setView('billboard'); // Set default view if none is passed
        }

        // Check if user is logged in (replace with your actual login check logic)
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);
    }, [location.state]);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleViewChange = (newView) => {
        setView(newView);
        setDropdownOpen(false);
    };

    return (
        <div className="home-page">
            <Navbar
                isHomePage={true}
                view={view}
                setDropdownOpen={setDropdownOpen}
                dropdownOpen={dropdownOpen}
                handleViewChange={handleViewChange}
                handleLogin={handleLogin}
                isLoggedIn={isLoggedIn}
            />
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

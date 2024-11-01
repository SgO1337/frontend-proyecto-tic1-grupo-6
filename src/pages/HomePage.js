import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/stylesHomePage.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import MoviesList from '../components/MoviesList';
import Snacks from '../components/Snacks';

const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [view, setView] = useState('billboard'); // Default view is 'billboard'
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        // Check if there is a view state passed from navigation
        if (location.state && location.state.view) {
            setView(location.state.view);
        } else {
            setView('billboard'); // Set default view if none is passed
        }
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
            />
            {/* Principal content */}
            <div className="content">
                {view === 'billboard' ? (
                    <MoviesList />
                ) : (
                    <Snacks />
                )}
            </div>
        </div>
    );
};

export default HomePage;
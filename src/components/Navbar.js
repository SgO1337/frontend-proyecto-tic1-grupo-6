import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './stylesNavBar.css';

const Navbar = ({ view, setDropdownOpen, dropdownOpen, handleViewChange }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const isHomePage = location.pathname === '/';
    const isLoginPage = location.pathname === '/login';
    const isSignUpPage = location.pathname === '/signup';

    return (
        <div className="navbar">
            <button className="cine-name-button" onClick={() => window.location.href='/'}>
                <span className="Capital">W</span>
                <span className="Lower">hat </span>
                <span className="Capital">T</span>
                <span className="Lower">he </span>
                <span className="Capital">F</span>
                <span className="Lower">un </span>
                <span className="Capital">C</span>
                <span className="Lower">inema</span>
            </button>

            {isHomePage && (
                <>
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
                </>
            )}

            {isLoggedIn ? (
                <div className="profile-dropdown" onMouseEnter={() => setProfileDropdownOpen(true)} onMouseLeave={() => setProfileDropdownOpen(false)}>
                    <button className="profile-button" onClick={() => navigate('/myprofile')}>
                        My Profile
                    </button>
                    {isProfileDropdownOpen && (
                        <ul className="profile-menu">
                            <li onClick={() => navigate('/mypurchases')}>My Purchases</li>
                            <li onClick={handleLogout}>Log Out</li>
                        </ul>
                    )}
                </div>
            ) : (
                !isLoginPage && !isSignUpPage && (
                    <button className="hlogin-button" onClick={() => navigate('/login')}>
                        Login
                    </button>
                )
            )}
        </div>
    );
};

export default Navbar;

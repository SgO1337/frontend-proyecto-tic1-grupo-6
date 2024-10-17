// Navbar.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './stylesNavBar.css';

const Navbar = ({ view, setDropdownOpen, dropdownOpen, handleViewChange, handleLogin }) => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token); // Set isLoggedIn based on the presence of the token
    }, []);


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
                <button className="logout-button" onClick={() => {/* handle logout */}}>
                    Logout
                </button>
            ) : (
                !isLoginPage && !isSignUpPage && (
                    <button className="hlogin-button" onClick={handleLogin}>
                        Login
                    </button>
                )
            )}
        </div>
    );
}

export default Navbar;

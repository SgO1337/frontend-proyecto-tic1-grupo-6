import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/stylesNavBar.css';

const Navbar = ({ view, setDropdownOpen, dropdownOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(''); // Store userId
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
        if (token) {
            const id = localStorage.getItem('userId');
            if (id) {
                setUserId(id); // Set userId
                axios.get(`https://backend-proyecto-tic1-grupo-6.onrender.com/api/users/view/${id}`)
                    .then(response => {
                        setUserName(response.data.name);
                    })
                    .catch(error => {
                        console.error("Error fetching user details:", error);
                    });
            }
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        setShowLogoutModal(false);
        setUserName('');
        setUserId(''); // Clear userId on logout
        navigate('/'); // Redirect to home page after logout
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    const isLoginPage = location.pathname === '/login';
    const isSignUpPage = location.pathname === '/signup';

    const handleDropdownItemClick = (newView) => {
        setDropdownOpen(false);
        if (newView === 'billboard') {
            navigate('/');
        } else {
            navigate('/', { state: { view: newView } });
        }
    };

    return (
        <div className="navbar">
            <button className="cine-name-button" onClick={() => navigate('/')} style={{ fontFamily: "Book Antiqua", fontWeight: "bold" }}>
                <span className="Capital">W</span>
                <span className="Lower">hat </span>
                <span className="Capital">T</span>
                <span className="Lower">he </span>
                <span className="Capital">F</span>
                <span className="Lower">un </span>
                <span className="Capital">C</span>
                <span className="Lower">inema</span>
            </button>

            {!isLoginPage && !isSignUpPage && (
                <div className="dropdown" ref={dropdownRef}>
                    <button className="dropdown-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        {view === 'billboard' ? 'Billboard' : 'Snacks'}
                    </button>
                    {dropdownOpen && (
                        <ul className="dropdown-menu">
                            <li onClick={() => handleDropdownItemClick('billboard')}>Billboard</li>
                            <li onClick={() => handleDropdownItemClick('snacks')}>Snacks</li>
                        </ul>
                    )}
                </div>
            )}

            {isLoggedIn ? (
                <div className="profile-dropdown" onMouseEnter={() => setProfileDropdownOpen(true)} onMouseLeave={() => setProfileDropdownOpen(false)}>
                    <span className="welcome-message">Welcome, {userName}! </span>
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

            {showLogoutModal && (
                <div className="logout-modal-overlay">
                    <div className="logout-modal">
                        <p style={{ color: '#FBFFCD' }}>Are you sure you want to Log Out?</p>
                        <button className="logout-button yes-button" onClick={confirmLogout}>Yes</button>
                        <button className="logout-button no-button" onClick={cancelLogout}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
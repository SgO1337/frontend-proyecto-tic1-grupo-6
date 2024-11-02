import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/stylesMyPurchasesPage.css';
import '../styles/styles.css';
import axios from 'axios';
import Bookings from '../components/Bookings'; // Import the Bookings component
import Orders from '../components/Orders'; // Import the Orders component

const MyPurchasesPage = () => {
    const [error, setError] = useState('');
    const [view, setView] = useState('bookings'); // Default view set to bookings
    const [userId, setUserId] = useState(null); // State to hold user ID
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        // Retrieve user ID from local storage
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.error('User ID not found in local storage.');
            // Optionally navigate to login page or show an error
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <Navbar view={view} setDropdownOpen={setDropdownOpen} dropdownOpen={dropdownOpen} handleViewChange={setView} />
            <div className="my-purchases-page">
                <h1>My Purchases</h1>
                <div className="menu">
                    <button onClick={() => setView('bookings')} className={view === 'bookings' ? 'active' : ''}>
                        Bookings
                    </button>
                    <button onClick={() => setView('snacks')} className={view === 'snacks' ? 'active' : ''}>
                        Snacks
                    </button>
                </div>
                {view === 'bookings' && userId && <Bookings userId={userId} error={error} />} {/* Pass userId to Bookings */}
                {view === 'snacks' && userId && <Orders userId={userId} />} {/* Pass userId to Orders */}
            </div>
        </div>
    );
};

export default MyPurchasesPage;

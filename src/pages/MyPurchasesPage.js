import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/stylesMyPurchasesPage.css';
import '../styles/styles.css';
import axios from "axios";
import Bookings from '../components/Bookings'; // Import the Bookings component
import Orders from '../components/Orders'; // Import the Snacks component

const MyPurchasesPage = () => {
    const [error, setError] = useState('');
    const [view, setView] = useState('bookings'); // Default view set to bookings
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
                {view === 'bookings' && <Bookings error={error} />}
                {view === 'snacks' && <Orders />}
            </div>
        </div>
    );
};

export default MyPurchasesPage;
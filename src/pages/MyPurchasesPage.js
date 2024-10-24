import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/stylesMyPurchasesPage.css';
import '../styles/styles.css';
import axios from "axios";
import mockMovies from '../data/mockMovies.js'; // Import mock movies
import mockPurchases from '../data/mockPurchases';

const MyPurchasesPage = () => {
    const [error, setError] = useState('');
    const [purchases, setPurchases] = useState([]);
    const navigate = useNavigate();
    const [view, setView] = useState('billboard');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                // Mock for testing
                setPurchases(mockPurchases);
            } catch (error) {
                setError('Failed to load purchases. Please try again later.');
            }
        };

        fetchPurchases();
    }, []);

    // Sort purchases by date in descending order (latest first)
    const sortedPurchases = [...purchases].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div>
            <Navbar view={view} setDropdownOpen={setDropdownOpen} dropdownOpen={dropdownOpen} handleViewChange={setView} />
            <div className="my-purchases-page">
                <h1>My Purchases</h1>
                {error && <p className="error-message">{error}</p>}
                {sortedPurchases.length > 0 ? (
                    <div className="purchases-list">
                        {sortedPurchases.map((purchase) => (
                            <div key={purchase.id} className="purchase-item">
                                <div className="purchase-description">
                                    <p className="purchase-name">{purchase.itemName}</p>
                                    <p className="purchase-date">Date: {new Date(purchase.date).toLocaleDateString()}</p>
                                    <p className="purchase-price">Price: ${purchase.price.toFixed(2)}</p>
                                </div>
                                {purchase.type === 'movie' && (
                                    <img
                                        src={mockMovies.find(movie => movie.id === purchase.movieId)?.posterUrl}
                                        alt={purchase.itemName}
                                        className="movie-poster"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No purchases found.</p>
                )}
            </div>
        </div>
    );
};

export default MyPurchasesPage;

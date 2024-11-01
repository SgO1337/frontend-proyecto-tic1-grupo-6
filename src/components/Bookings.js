// Bookings.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bookings = ({ error }) => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/booking-screening/get-by-user-id/2');
                const bookings = response.data;

                // Map the bookings data to match the display structure
                const mappedPurchases = bookings.map(booking => ({
                    id: booking.idBookingScreening,
                    itemName: booking.screening.movie.title,
                    date: booking.screening.date,
                    price: booking.screening.movie.price || 0, // Assuming price is in the movie data, otherwise set default
                    type: 'movie',
                    moviePoster: `data:image/jpeg;base64,${booking.screening.movie.verticalPosterBASE64}`,
                    seats: booking.seats.map(seat => `${seat.seatRow}-${seat.seatCol}`).join(', ')
                }));

                setPurchases(mappedPurchases);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setPurchases([]); // Clear purchases on error
            }
        };

        fetchPurchases();
    }, []);

    // Sort purchases by date in descending order (latest first)
    const sortedPurchases = [...purchases].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div>
            {error && <p className="error-message">{error}</p>}
            {sortedPurchases.length > 0 ? (
                <div className="purchases-list">
                    {sortedPurchases.map((purchase) => (
                        <div key={purchase.id} className="purchase-item">
                            <div className="purchase-description">
                                <p className="purchase-name">{purchase.itemName}</p>
                                <p className="purchase-date">Date: {new Date(purchase.date).toLocaleDateString()}</p>
                                <p className="purchase-seats">Seats: {purchase.seats}</p>
                            </div>
                            {purchase.type === 'movie' && (
                                <img
                                    src={purchase.moviePoster}
                                    alt={purchase.itemName}
                                    className="movie-poster"
                                />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default Bookings;
// Bookings.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const Bookings = ({ error }) => {
    const { userId } = useUser(); // Access userId from the context
    const [purchases, setPurchases] = useState([]);
    const [isLoading,setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchases = async () => {
            if (!userId) return; // Ensure userId is available before fetching

            try {
                const response = await axios.get(`https://backend-proyecto-tic1-grupo-6.onrender.com/get-by-user-id/${userId}`);
                const bookings = response.data;

                // Map the bookings data to match the display structure
                const mappedPurchases = bookings.map(booking => ({
                    id: booking.idBookingScreening,
                    itemName: booking.screening.movie.title,
                    date: booking.screening.date,
                    price: booking.screening.movie.price || 0, // Assuming price is in the movie data, otherwise set default
                    type: 'movie',
                    moviePoster: `data:image/jpeg;base64,${booking.screening.movie.verticalPosterBASE64}`,
                    seats: booking.seats.map(seat => `${seat.seatRow + 1 }-${seat.seatCol + 1 }`).join(', ')
                }));

                setPurchases(mappedPurchases);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setPurchases([]); // Clear purchases on error
                setLoading(false);
            }
        };

        fetchPurchases();
    }, [userId]); // Run effect when userId changes

    // Sort purchases by date in descending order (latest first)
    const sortedPurchases = [...purchases].sort((a, b) => new Date(b.date) - new Date(a.date));

    const cancelBooking = async (Bookingid) => {
        try {
            const response = await axios.delete(`https://backend-proyecto-tic1-grupo-6.onrender.com/delete/${Bookingid}`);
            window.location.reload()
            console.log('Booking cancelled:', response.data);
        } catch (error) {
            console.error('Error canceling booking:', error);
        }
    };

    return (
        <div>
            {error && <p className="error-message">{error}</p>}

            {isLoading ? (
                <p  style={{ color: '#79AE92' }}>Loading...</p>
            ) : sortedPurchases.length > 0 ? (
                <div className="purchases-list">
                    {sortedPurchases.map((purchase) => (
                        <div key={purchase.id} className="purchase-item">
                            <div className="purchase-description">
                                <p className="purchase-name">{purchase.itemName}</p>
                                <p className="purchase-date">Date: {new Date(purchase.date).toLocaleDateString()}</p>
                                <p className="purchase-seats">Seats: {purchase.seats}</p>
                            </div>
                            <button onClick={() => cancelBooking(purchase.id)} className="cancel-button">Cancel</button>
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
                <p style={{ color: '#79AE92' }}>No bookings found.</p>
            )}
        </div>
    );

};

export default Bookings;
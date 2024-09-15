import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoviesList = () => {
    const [currentPage, setCurrentPage] = useState(0); // Actual page number
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch the list of movies currently in theaters from the API
        axios.get('/api/movies/currently-available')
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching movies!', error));
    }, []);

    const moviesPerPage = 4; // How many per page

    const availableMovies = movies.filter(movie => movie.isAvailable); // available movies

    const totalPages = Math.ceil(availableMovies.length / moviesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Calculates which picture to show
    const startIndex = currentPage * moviesPerPage;
    const selectedMovies = availableMovies.slice(startIndex, startIndex + moviesPerPage);

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {movies.length > 0 ? (
                    movies.map(movie => (
                        <div key={movie.id} style={{ width: '200px' }}>
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                style={{ width: '100%', height: 'auto' }}
                            />
                            <h2>{movie.title}</h2>
                        </div>
                    ))
                ) : (
                    <p>No movies available</p>
                )}
            </div>
        </div>
    );
};

export default MoviesList;

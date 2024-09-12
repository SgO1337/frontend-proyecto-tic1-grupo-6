import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch the list of movies currently in theaters from the API
        axios.get('/api/movies/currently-available')
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching movies!', error));
    }, []);

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

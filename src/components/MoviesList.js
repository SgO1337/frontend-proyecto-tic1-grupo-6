import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import mockMovies from '../data/mockMovies.js';

const MoviesList = () => {
    const [currentPage, setCurrentPage] = useState(0); // Actual page number
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    // useEffect to load mock movie data when the component mounts

     useEffect(() => {
        // Mock data for movies

        setTimeout(() => {
            setMovies(mockMovies);  // Set mock movies data to state
        });
    }, []);

/*
    useEffect(() => {
        axios.get('/api/movies/currently-available')
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching movies!', error));
    }, []);*/

    const moviesPerPage = 6; // How many per page

    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(0);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(totalPages - 1);
        }
    };

    const [hoveredMovie, setHoveredMovie] = useState(null);

    // Calculates which picture to show
    const startIndex = currentPage * moviesPerPage;

    const selectedMovies = movies.slice(startIndex, startIndex + moviesPerPage);

    const handleSelectMovie = (movieId) => {
        navigate(`/select/${movieId}`);
    };

    return (
        <div className="movies-container">

            <div className="title-container">
                <h2>ON SCREEN</h2>
            </div>

            <div className="movies-pagination">

                <button onClick={handlePrevPage} className="arrow-button">
                    ←
                </button>

                <div className="movies-grid">
                    {movies.length > 0 ? (
                        selectedMovies.map(movie => (
                            <div key={movie.id} className="movie-item">
                                <div
                                    className="movie-poster-container"
                                    onMouseEnter={() => setHoveredMovie(movie.id)}
                                    onMouseLeave={() => setHoveredMovie(null)}
                                >
                                    <img
                                        src={movie.posterUrl}
                                        alt={movie.title}
                                        className={`movie-poster ${hoveredMovie=== movie.id ? 'hovered' : ''}`} //aplies opacity on hovered movie
                                    />
                                    {hoveredMovie && (
                                        <div className="movie-info">
                                            <h3 className="movie-cast">{movie.cast || ""}</h3>
                                            <h4 className="movie-director">{movie.director || ""}</h4>
                                            <h5 className="movie-duration">{movie.duration || ""}</h5>
                                            <h6 className="movie-genre">{movie.genre || ""}</h6>
                                            <h7 className="movie-releaseDate">{movie.releaseDate || ""}</h7>
                                            <h8 className="movie-distributer">{movie.distributer || ""}</h8>
                                            <h8 className="movie-distributer">{movie.rating || ""}</h8>
                                        </div>
                                    )}
                                </div>
                                <h2 className="movie-title">{movie.title}</h2>
                                <button className="buy-button" onClick={() => handleSelectMovie(movie.id)}>
                                    BUY TICKETS
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No movies available</p>
                    )}
                </div>

                <button onClick={handleNextPage} className="arrow-button">
                    →
                </button>

            </div>
        </div>
    );
};

export default MoviesList;

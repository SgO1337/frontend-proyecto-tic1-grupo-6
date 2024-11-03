import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../styles/stylesHomePage.css';

const MoviesList = () => {
    const [currentPage, setCurrentPage] = useState(0); // Actual page number
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:9090/api/movies/currently-available')
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching movies!', error));
    }, []);

    const moviesPerPage = 6; // How many per page
    const totalPages = Math.ceil(movies.length / moviesPerPage);

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

    const [hoveredMovie, setHoveredMovie] = useState(null);
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
                {currentPage > 0 && (
                    <button onClick={handlePrevPage} className="arrow-button">
                        ←
                    </button>
                )}

                <div className="movies-grid">
                    {movies.length > 0 ? (
                        selectedMovies.map(movie => (
                            <div key={movie.idMovie} className="movie-item">
                                <div
                                    className="movie-poster-container"
                                    onMouseEnter={() => setHoveredMovie(movie.idMovie)}
                                    onMouseLeave={() => setHoveredMovie(null)}
                                    onClick={() => handleSelectMovie(movie.idMovie)} // Make the image clickable
                                >
                                    <img
                                        src={`data:image/png;base64,${movie.verticalPosterBASE64}`}
                                        alt={movie.title}
                                        className={`movie-poster ${hoveredMovie === movie.idMovie ? 'hovered' : ''}`}
                                    />
                                    {hoveredMovie === movie.idMovie && (
                                        <div className="movie-info">
                                            <h3 className="movie-genre">{movie.genre || ""}</h3>
                                            <h7 className="movie-cast">Cast: {movie.cast || ""}</h7>
                                            <h7 className="movie-director">Directed by: {movie.director || ""}</h7>
                                            <div className="movie-duration-rating">
                                                <h8 className="movie-duration">{movie.duration || ""} min</h8>
                                                <h8 className="movie-rating">{movie.rating || ""}</h8>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <h2 className="movie-title">{movie.title}</h2>
                                <button className="buy-button" onClick={() => handleSelectMovie(movie.idMovie)}>
                                    BUY TICKETS
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No movies available</p>
                    )}
                </div>

                {currentPage < totalPages - 1 && (
                    <button onClick={handleNextPage} className="arrow-button">
                        →
                    </button>
                )}
            </div>
        </div>
    );
};

export default MoviesList;

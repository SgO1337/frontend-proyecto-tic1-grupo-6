import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const MoviesList = () => {
    const [currentPage, setCurrentPage] = useState(0); // Actual page number
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    // useEffect to load mock movie data when the component mounts
    useEffect(() => {
        // Mock data for movies
        const mockMovies = [
            {
                id: 1,
                title: 'Inception',
                posterUrl: 'https://m.media-amazon.com/images/I/51zUbui+gbL._AC_SY679_.jpg',
                isAvailable: true,
            },
            {
                id: 2,
                title: 'The Matrix',
                posterUrl: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg',
                isAvailable: true,
            },
            {
                id: 3,
                title: 'Harry Potter and the Order of the Phoenix',
                posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6DX4m9ThWvIjbyFvA2jAec7mmZOYytj4-8w&s',
                isAvailable: true,
            },
            {
                id: 4,
                title: 'Avengers: Endgame',
                posterUrl: 'https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SY679_.jpg',
                isAvailable: true,
            },
            {
                id: 5,
                title: 'Garfield',
                posterUrl: 'https://cartelera.montevideo.com.uy/imagenes_espectaculos/moviecat13/36467.jpg',
                isAvailable: true,
            },
            {
                id: 6,
                title: 'Intensamente 2',
                posterUrl: 'https://cartelera.montevideo.com.uy/imagenes_espectaculos/moviecat13/36649.jpg',
                isAvailable: true,
            },
            {
                id: 7,
                title: 'Mi villano favorito 4',
                posterUrl: 'https://cartelera.montevideo.com.uy/imagenes_espectaculos/moviecat13/36650.jpg',
                isAvailable: true,
            },
            {
               id: 8,
                title: 'Rápidos y furiosos 9',
                posterUrl: 'https://static.wixstatic.com/media/d56791_a520ebeb2d3647d1910d54a4a5072cb9~mv2.jpeg/v1/fill/w_687,h_974,al_c,q_85,enc_auto/d56791_a520ebeb2d3647d1910d54a4a5072cb9~mv2.jpeg',
                isAvailable: false,
            }
        ];

        setTimeout(() => {
            setMovies(mockMovies);  // Set mock movies data to state
        }, 500);

    }, []);
     /*
    useEffect(() => {
        // Fetch the list of movies currently in theaters from the API
        axios.get('/api/movies/currently-available')
            .then(response => setMovies(response.data))
            .catch(error => console.error('Error fetching movies!', error));
    }, []);

    */

    const moviesPerPage = 6; // How many per page

    const availableMovies = movies.filter(movie => movie.isAvailable); // available movies

    const totalPages = Math.ceil(availableMovies.length / moviesPerPage);

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

    // Calculates which picture to show
    const startIndex = currentPage * moviesPerPage;
    const selectedMovies = availableMovies.slice(startIndex, startIndex + moviesPerPage);

    const handleSelectMovie = (movieId) => {
        navigate(`/select/${movieId}`);  // Redirects to the selection page
    };

    return (
        <div className="container">

            <button onClick={handlePrevPage} className="arrow-button">
                ←
            </button>

            <div className="movies-grid">
                {movies.length > 0 ? (
                    selectedMovies.map(movie => (
                        <div key={movie.id} className="movie-item">
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="movie-poster"
                            />
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
    );
};

export default MoviesList;

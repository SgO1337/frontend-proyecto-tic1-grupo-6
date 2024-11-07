import {useNavigate, useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../styles/stylesSelectionInfoPage.css';

const MovieInformation = () => {

    const {id} = useParams();
    const [movie, setMovie] = useState(null);

    const fetchMovieDetails = async (movieId) => {
        try {
            const response = await axios.get('http://localhost:9090/api/movies/view/' + movieId);
            setMovie(response.data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchMovieDetails(id);
        }
    },);



    return (
        <div className="movie-detail">
            {movie ? (
                <div className="movie-info-container">
                    <img src={`data:image/png;base64,${movie.horizontalPosterBASE64}`} className="movie-poster-hor" alt="Movie Poster"/>
                    <div className="movie-attributes">
                        <h1 className="movie-info-title">{movie.title}</h1>
                        <h3 className="movie-info-description">{movie.description}</h3>
                        <h4>Director: {movie.director}</h4>
                        <h4>Cast: {movie.cast}</h4>
                        <div className="movie-info-inline">
                            <h5>Year: {movie.releaseDate}</h5>
                            <h5>Suitable for: {movie.rating}</h5>
                            <h5>Duration: {movie.duration} min</h5>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )

}

export default MovieInformation;
import React from 'react';
import { useParams } from 'react-router-dom';
import mockMovies from '../data/mockMovies';
import SelectionInfoForm from './SelectInfoForm.js';
import {useNavigate} from "react-router-dom";
import './stylesSelectionInfoPage.css';

const SelectionInfoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const movie = mockMovies.find(movie => movie.id === parseInt(id));

    const handleMainPage = () => {
        navigate('/')
    }



    return (
        <div>
            {/* Navbar */}
            <div className="navbar">
                <div onClick={handleMainPage} className="cine-name">
                    <span className="Capital">W</span>
                    <span className="Lower">hat </span>
                    <span className="Capital">T</span>
                    <span className="Lower">he </span>
                    <span className="Capital">F</span>
                    <span className="Lower">un </span>
                    <span className="Capital">C</span>
                    <span className="Lower">inema</span>
                </div>
            </div>

            {/* Movie Details */}
            <div className="movie-detail">
                {movie ? (
                    <div className="movie-info-container">
                        <img src={movie.posterUrlHorizontal} className="movie-poster-hor" alt="Movie Poster"/>
                        <div className="movie-attributes">
                            <h3>{movie.description}</h3>
                            <h4>Director: {movie.director}</h4>
                            <h4>Cast: {movie.cast}</h4>
                            <div className="movie-info-inline">
                                <h5>Year: {movie.releaseDate}</h5>
                                <h5>Genre: {movie.genre}</h5>
                                <h5>Duration: {movie.duration}</h5>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Movie not found</p>
                )}
            </div>

            <div className="movie-selection-form">
                <SelectionInfoForm/>
            </div>
        </div>
    );
};

export default SelectionInfoPage;
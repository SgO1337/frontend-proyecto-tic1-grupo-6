import React from 'react';
import { useParams } from 'react-router-dom';
import mockMovies from '../data/mockMovies';
import SelectionInfoForm from './SelectInfoForm.js';

const SelectionInfoPage = () => {
    const { id } = useParams();
    const movie = mockMovies.find(movie => movie.id === parseInt(id));

    return (
        <div>
            {/* Navbar */}
            <div className="navbar">
                <h1 className="cine-name">
                    <span className="Capital">W</span>
                    <span className="Lower">hat </span>
                    <span className="Capital">T</span>
                    <span className="Lower">he </span>
                    <span className="Capital">F</span>
                    <span className="Lower">un </span>
                    <span className="Capital">C</span>
                    <span className="Lower">inema</span>
                </h1>
            </div>

            {/* Movie Details */}
            <div className="movie-detail">
                {movie ? (
                    <div>
                        <img src={movie.posterUrlHorizontal} className="movie-poster-hor"/>
                    </div>
                ) : (
                    <p>Movie not found</p>
                )}
            </div>

            <div className="movie-selection-form">
                <SelectionInfoForm />
            </div>
        </div>
    );
};

export default SelectionInfoPage;
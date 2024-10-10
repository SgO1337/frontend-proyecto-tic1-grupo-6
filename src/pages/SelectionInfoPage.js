import React from 'react';
import { useParams } from 'react-router-dom';
import mockMovies from '../data/mockMovies';
import SelectionInfoForm from '../components/SelectInfoForm.js';
import {useNavigate} from "react-router-dom";
import '../components/stylesSelectionInfoPage.css';
import MovieInformation from '../components/MovieInformation.js';

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

            <div className="movie-information">
                <MovieInformation/>
            </div>

            <div className="movie-selection-form">
                <SelectionInfoForm/>
            </div>

        </div>
    );
};

export default SelectionInfoPage;
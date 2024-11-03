import React from 'react';
import { useParams } from 'react-router-dom';
import SelectionInfoForm from '../components/SelectInfoForm.js';
import {useNavigate} from "react-router-dom";
import '../styles/stylesSelectionInfoPage.css';
import MovieInformation from '../components/MovieInformation.js';
import Navbar from '../components/Navbar.js';

const SelectionInfoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleMainPage = () => {
        navigate('/')
    }


    return (
        <div>
            {/* Navbar */}
            <Navbar isHomePage={false} />

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
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SelectionInfoForm from '../components/SelectInfoForm.js';
import '../styles/stylesSelectionInfoPage.css';
import MovieInformation from '../components/MovieInformation.js';
import Navbar from '../components/Navbar';
import Snacks from '../components/Snacks';

const SelectionInfoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // State to manage dropdown open status
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [view, setView] = useState('billboard'); // Default view as 'billboard'

    const handleMainPage = () => {
        navigate('/');
    };

    const handleViewChange = (newView) => {
        setView(newView); // Change the view to snacks or billboard
        setDropdownOpen(false); // Close the dropdown after selecting an item
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar
                view={view}
                setDropdownOpen={setDropdownOpen}
                dropdownOpen={dropdownOpen}
                handleViewChange={handleViewChange}
            />

            <div className="movie-information">
                <MovieInformation />
            </div>

            <div className="movie-selection-form">
                <SelectionInfoForm />
            </div>
        </div>
    );
};

export default SelectionInfoPage;

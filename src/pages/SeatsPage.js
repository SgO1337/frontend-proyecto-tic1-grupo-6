import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import MovieInformation from "../components/MovieInformation";
import SeatsForm from "../components/SeatsForm";
import Navbar from "../components/Navbar";

const SeatsPage = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown open status
    const [view, setView] = useState('billboard'); // Default view set to 'billboard'
    const navigate = useNavigate();

    const handleViewChange = (newView) => {
        setView(newView); // Change the view to either 'billboard' or 'snacks'
        setDropdownOpen(false); // Close the dropdown after selecting
        if (newView === 'billboard') {
            navigate('/');
        } else if (newView === 'snacks') {
            navigate('/snacks'); // Ensure this route is set up for snacks page
        }
    };

    return (
        <div>
            <Navbar
                view={view}
                setDropdownOpen={setDropdownOpen}
                dropdownOpen={dropdownOpen}
                handleViewChange={handleViewChange}
            />

            <div className="seats-page">
                <div className="movie-information">
                    <MovieInformation/>
                </div>

                <div className="seats-display">
                    <SeatsForm/>
                </div>
            </div>
        </div>
    );
}

export default SeatsPage;

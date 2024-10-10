import React, { useState, useEffect } from 'react';
import './stylesSelectionInfoPage.css';
import {useNavigate, useParams} from "react-router-dom";
import mockMovies from "../data/mockMovies";
import axios from "axios";

const SelectInfoForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [locations,setLocations] = useState([]);

    /*const fetchMovieLocation = async (movieId) => {
        try {
            const response = await axios.get();
            setLocations(response.data);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    const fetchMovieDate = async (movieId,location) => {
        try {
            const response = await axios.get();
            setLocations(response.data);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };



    useEffect(() => {
        if (id) {
            fetchMovieDetails(id);
        }
    },);

    */

    const [formData, setFormData] = useState({
        date: '',
        time: '',
        location: '',
        language: '',
        subtitles: '',
        quantity: '',
    });

    const handleSeats = (movieId) => {
        navigate(`/seats/${movieId}/${formData.quantity}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
    };

    return (
        <form className="movie-selection-form" onSubmit={handleSubmit}>
            <h1>BOOK YOUR TICKETS:</h1>

            {/* Location */}
            <div className="form-group">
                <label htmlFor="location">Location:</label>
                <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select location</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                </select>
            </div>


            {/* Date */}
            <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Time */}
            <div className="form-group">
                <label htmlFor="time">Time:</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Language */}
            <div className="form-group">
                <label htmlFor="language">Language:</label>
                <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select language</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                </select>
            </div>

            {/* Subtitles */}
            <div className="form-group">
                <label htmlFor="subtitles">Subtitles:</label>
                <select
                    id="subtitles"
                    name="subtitles"
                    value={formData.subtitles}
                    onChange={handleChange}
                    required
                >
                    <option value="None">None</option>
                    <option value="English">English Subtitles</option>
                    <option value="Spanish">Spanish Subtitles</option>
                </select>
            </div>

            {/* Quantity */}
            <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    max="4"
                    required
                />
            </div>

            <button type="submit" onClick={() => handleSeats(id)} className="submit-button">
                Continue
            </button>
        </form>
    );
};

export default SelectInfoForm;

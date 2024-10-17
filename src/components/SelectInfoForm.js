import React, { useState, useEffect } from 'react';
import './stylesSelectionInfoPage.css';
import {useNavigate, useParams} from "react-router-dom";
import mockMovies from "../data/mockMovies";
import axios from "axios";

const SelectInfoForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [branches, setBranches] = useState([]);
    const [dates, setDates] = useState([]);
    const [times, setTimes] = useState([]);

    const [selectedBranchId, setSelectedBranchId] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const [formData, setFormData] = useState({
        date: '',
        time: '',
        location: '',
        quantity: '',
    });

    const isFormValid = selectedBranchId && selectedDate && selectedTime && formData.quantity;

    useEffect(() => {
        const fetchBranches = async () => {
            if (id) {
                const response = await axios.get(`http://localhost:9090/api/movies/${id}/branches`);
                setBranches(response.data);
                setSelectedBranchId(''); // Reset branch selection
                setDates([]); // Clear dates
                setTimes([]); // Clear times
                setSelectedDate(''); // Reset date selection
                setSelectedTime(''); // Reset time selection
            } else {
                setBranches([]);
                setSelectedBranchId(''); // Reset branch selection if no movie is selected
            }
        };
        fetchBranches();
    }, [id]);

    useEffect(() => {
        const fetchDates = async () => {
            if (selectedBranchId) {
                const response = await axios.get(`http://localhost:9090/api/movies/${id}/branches/${selectedBranchId}/screening-dates`);
                setDates(response.data);
                setSelectedDate(''); // Reset date selection
                setTimes([]); // Clear times
                setSelectedTime(''); // Reset time selection
            } else {
                setDates([]);
                setSelectedDate(''); // Reset date selection if no branch is selected
            }
        };
        fetchDates();
    }, [selectedBranchId]);

    useEffect(() => {
        const fetchTimes = async () => {
            if (selectedDate) {
                const response = await axios.get(`http://localhost:9090/api/movies/${id}/branches/${selectedBranchId}/dates/${selectedDate}/screening-times`);
                setTimes(response.data);
                setSelectedTime(''); // Reset time selection
            } else {
                setTimes([]);
                setSelectedTime(''); // Reset time selection if no date is selected
            }
        };
        fetchTimes();
    }, [selectedDate]);

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
                <label htmlFor="branches">Select Branch:</label>
                <select id="branches"  value={selectedBranchId} onChange={(e) => setSelectedBranchId(e.target.value)}
                        disabled={!id}>
                    <option value="">Select a branch</option>
                    {branches.map(branch => (
                        <option key={branch.branchId} value={branch.branchId}>{branch.location}</option>
                    ))}
                </select>
            </div>


            {/* Date */}
            <div className="form-group">
                <label htmlFor="dates">Select Screening Date:</label>
                <select id="dates" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                        disabled={!selectedBranchId}>
                    <option value="">Select a date</option>
                    {dates.map(date => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </select>
            </div>

            {/* Time */}
            <div className="form-group">
                <label htmlFor="times">Select Screening Time:</label>
                <select id="times" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}
                        disabled={!selectedDate}>
                    <option value="">Select a time</option>
                    {times.map(time => (
                        <option key={time} value={time}>{time}</option>
                    ))}
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

            <button type="submit" onClick={() => handleSeats(id)} className="submit-button" disabled={!isFormValid}>
                Continue
            </button>
        </form>
    );
};

export default SelectInfoForm;

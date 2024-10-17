import React, { useState, useEffect } from 'react';
import './stylesSelectionInfoPage.css';
import {useNavigate, useParams} from "react-router-dom";
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
        movieId: id,
        branchId: '',
        date: '',
        time: '',
        quantity: 1
    });

    const isFormValid = selectedBranchId && selectedDate && selectedTime && formData.quantity;

    useEffect(() => {
        const fetchBranches = async () => {
            if (id) {
                const response = await axios.get(`http://localhost:9090/api/movies/${id}/branches`);
                setBranches(response.data);
                setSelectedBranchId('');
                setDates([]);
                setTimes([]);
                setSelectedDate('');
                setSelectedTime('');
            } else {
                setBranches([]);
                setSelectedBranchId('');
            }
        };
        fetchBranches();
    }, [id]);

    useEffect(() => {
        const fetchDates = async () => {
            if (selectedBranchId) {
                const response = await axios.get(`http://localhost:9090/api/movies/${id}/branches/${selectedBranchId}/screening-dates`);
                setDates(response.data);
                setSelectedDate('');
                setTimes([]);
                setSelectedTime('');
            } else {
                setDates([]);
                setSelectedDate('');
            }
        };
        fetchDates();
    }, [selectedBranchId]);

    useEffect(() => {
        const fetchTimes = async () => {
            if (selectedDate) {
                const response = await axios.get(`http://localhost:9090/api/movies/${id}/branches/${selectedBranchId}/dates/${selectedDate}/screening-times`);
                setTimes(response.data);
                setSelectedTime('');
            } else {
                setTimes([]);
                setSelectedTime('');
            }
        };
        fetchTimes();
    }, [selectedDate]);

    const handleSeats = (movieId,screeningId) => {
        navigate(`/seats/${movieId}/${formData.quantity}/${screeningId}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleBranchChange = (e) => {
        const branchId = e.target.value;
        setSelectedBranchId(branchId);
        setFormData({ ...formData, branchId });
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        setFormData({ ...formData, date });
    };

    const handleTimeChange = (e) => {
        const time = e.target.value;
        setSelectedTime(time);
        setFormData({ ...formData, time });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9090/api/movies/get-screening-from-cascade-dropdown', formData);
            const { screeningId } = response.data;
            handleSeats(id, screeningId);
        } catch (error) {
            console.error('Error al crear la reserva:', error);
        }
    };

    return (
        <form className="movie-selection-form" onSubmit={handleSubmit}>
            <h1>BOOK YOUR TICKETS:</h1>

            {/* Location */}
            <div className="form-group">
                <label htmlFor="branches">Select Branch:</label>
                <select id="branches"  value={selectedBranchId} onChange={handleBranchChange}
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
                <select id="dates" value={selectedDate} onChange={handleDateChange}
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
                <select id="times" value={selectedTime} onChange={handleTimeChange}
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

            <button type="submit" className="submit-button" disabled={!isFormValid}>
                Continue
            </button>
        </form>
    );
};

export default SelectInfoForm;

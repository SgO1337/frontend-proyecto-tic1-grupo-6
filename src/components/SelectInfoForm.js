import React, { useState, useEffect } from 'react';
import '../styles/stylesSelectionInfoPage.css';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useUser} from "../context/UserContext";

const SelectInfoForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userId } = useUser();

    const [branches, setBranches] = useState([]);
    const [dates, setDates] = useState([]);
    const [times, setTimes] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState('');
    const [isLoading,setLoading] = useState(true);


    const [screeningId, setScreeningId] = useState('')

    const [formData, setFormData] = useState({
        movieId: id,
        branchId: '',
        date: '',
        time: '',
        roomId: '',
    });




    useEffect(() => {
        const fetchBranches = async () => {
            try {
                if (id) {
                    const response = await axios.get(`https://backend-proyecto-tic1-grupo-6.onrender.com/api/movies/${id}/branches`);
                    setBranches(response.data);
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        branchId: '',
                        date: '',
                        time: '',
                        roomId: '',
                    }));
                    setDates([]);
                    setTimes([]);
                    setError(''); // Resetea el error si la solicitud es exitosa
                    setLoading(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('No se encontraron sucursales para esta película.');
                    setLoading(false);
                } else {
                    setError('Ocurrió un error al cargar las sucursales. Inténtalo nuevamente.');
                    setLoading(false);
                }
            }
        };
        fetchBranches();
    }, [id]);

    useEffect(() => {
        const fetchDates = async () => {
            if (formData.branchId) {
                const response = await axios.get(`https://backend-proyecto-tic1-grupo-6.onrender.com/api/movies/${id}/branches/${formData.branchId}/screening-dates`);
                setDates(response.data);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    date: '',
                    time: '',
                    roomId: '',
                    setIsFormValid: false
                }));
                setTimes([]);
            }
        };
        fetchDates();
    }, [formData.branchId]);

    useEffect(() => {
        const fetchTimes = async () => {
            if (formData.date) {
                const response = await axios.get(`https://backend-proyecto-tic1-grupo-6.onrender.com/api/movies/${id}/branches/${formData.branchId}/dates/${formData.date}/screening-times`);
                setTimes(response.data);
                setFormData(prevFormData => ({ ...prevFormData, time: '' , roomId: '', setIsFormValid: false}));
            }
        };
        fetchTimes();
    }, [formData.date]);

    useEffect(() => {
        const fetchRooms = async () => {
            if (formData.time) {
                const response = await axios.get(`https://backend-proyecto-tic1-grupo-6.onrender.com/api/movies/${id}/branches/${formData.branchId}/dates/${formData.date}/screening-times/${formData.time}/get-available-rooms`);
                setRooms(response.data);
                setFormData(prevFormData => ({ ...prevFormData, roomId: '' , setIsFormValid: false}));
            }
        };
        fetchRooms();
    }, [formData.time]);

    useEffect(() => {
        const fetchScreeningId = async () => {
            if (formData.roomId) {
                try {
                    const response = await axios.post('https://backend-proyecto-tic1-grupo-6.onrender.com/api/movies/get-screening-from-cascade-dropdown', formData);
                    setScreeningId(response.data.screeningId);
                    setIsFormValid(true);
                } catch (error) {
                    console.error("Error fetching screening ID:", error);
                }
            }
        };
        fetchScreeningId();
    }, [formData.roomId]);

    const handleSeats = (movieId) => {
        navigate(`/seats/${movieId}/${screeningId}/${quantity}`);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form className="movie-selection-form" onSubmit={handleSubmit}>
            <h1>BOOK YOUR TICKETS:</h1>

            {!userId && (
                <p className="login-required-message">Please log in to reserve a ticket.</p>
            )}

            {isLoading && (
                <p className="no-functions-message">Loading...</p>
            )}

            <div className="form-group">
                {id && branches.length === 0 && !isLoading &&(
                    <p className="no-functions-message">There are no screenings available yet.</p>
                )}

                <label htmlFor="branches">Select Branch:</label>
                <select
                    id="branches"
                    name="branchId"
                    value={formData.branchId}
                    onChange={(e) => {
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            branchId: e.target.value,
                            date: '',
                            time: '',
                        }));
                    }}
                    disabled={!userId || !id || branches.length === 0}
                >
                    <option value="">Select a branch</option>
                    {branches.map(branch => (
                        <option key={branch.branchId} value={branch.branchId}>{branch.location}</option>
                    ))}
                </select>
            </div>




            {/* Date */}
            <div className="form-group">
                <label htmlFor="dates">Select Screening Date:</label>
                <select
                    id="dates"
                    name="date"
                    value={formData.date}
                    onChange={(e) => {
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            date: e.target.value,
                            time: '',
                        }));
                    }}
                    disabled={!formData.branchId || isLoading} // Disables if still loading
                >
                    <option value="">Select a date</option>
                    {dates.map(date => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </select>
            </div>

            {/* Time */}
            <div className="form-group">
                <label htmlFor="times">Select Screening Time:</label>
                <select
                    id="times"
                    name="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prevFormData => ({...prevFormData, time: e.target.value}))}
                    disabled={!formData.date || isLoading}
                >
                    <option value="">Select a time</option>
                    {times.map(time => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
            </div>

            {/* Room */}
            <div className="form-group">
                <label htmlFor="rooms">Select Room:</label>
                <select
                    id="rooms"
                    name="room"
                    value={formData.roomId}
                    onChange={(e) => setFormData(prevFormData => ({...prevFormData, roomId: e.target.value}))}
                    disabled={!formData.time || isLoading}
                >
                    <option value="">Select a room</option>
                    {rooms.map(room => (
                        <option key={room.idRoom} value={room.idRoom}>{room.roomName}</option>
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
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    max="4"
                    required
                    disabled={!isFormValid || !userId || isLoading}
                />
            </div>

            <button type="submit" onClick={() => handleSeats(id)} className="submit-button" disabled={!isFormValid || !userId || isLoading || quantity==0} >
                Continue
            </button>
        </form>
    );


};

export default SelectInfoForm;

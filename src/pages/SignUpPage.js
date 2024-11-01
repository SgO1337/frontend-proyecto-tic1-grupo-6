import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/stylesRegisterPage.css';
import '../styles/styles.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import bcrypt from 'bcryptjs'; // Import bcryptjs

const SignUpPage = () => {
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        reEnteredPassword: '',
        identification: '',
        day: '',
        month: '',
        year: ''
    });
    const [error, setError] = useState(''); // For error messages
    const [currentPage, setCurrentPage] = useState(''); // Track current page
    const navigate = useNavigate(); // Hook for navigation
    const [view, setView] = useState('billboard'); // View state
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
        setError(''); // Clear any previous error when typing starts
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted');

        // Validate name, surname, and birthday
        const namePattern = /^[a-zA-Z\s]+$/;
        if (!user.name) {
            setError('Name cannot be empty');
            return;
        } else if (!namePattern.test(user.name)) {
            setError('Name can only contain letters and spaces');
            return;
        } else if (user.name.length < 2 || user.name.length > 50) {
            setError('Name should be between 2 and 50 characters');
            return;
        }
        if (!user.surname) {
            setError('Surname cannot be empty');
            return;
        } else if (!namePattern.test(user.surname)) {
            setError('Surname can only contain letters and spaces');
            return;
        } else if (user.surname.length < 2 || user.surname.length > 50) {
            setError('Surname should be between 2 and 50 characters');
            return;
        }

        // Validate birthday
        if (!user.day || !user.month || !user.year) {
            setError('Please select a valid birthday');
            return;
        }

        // Check if password and re-entered password match
        if (user.password !== user.reEnteredPassword) {
            setError('The passwords do not match');
            return;
        }

        // If validation passes, proceed to calculate age and submit
        try {
            const day = user.day;
            const month = user.month - 1; // Months are 0-indexed in JS
            const year = user.year;

            // Calculate age from birthday
            const birthDate = new Date(year, month, day);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            // Hash the password before sending
            const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
            console.log(hashedPassword);

            // Send registration request
            const response = await axios.post('/auth/register', {
                ci: user.identification,
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: hashedPassword, // Use hashed password
                age: age // Include age in the request
            });

            if (response.data.success) {
                // Store user data and token in sessionStorage
                sessionStorage.setItem('authToken', response.data.token);
                sessionStorage.setItem('userData', JSON.stringify({
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    identification: user.identification,
                    age: age // Store the calculated age
                }));
                navigate('/'); // Redirect on successful registration
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setError('El email ya está registrado.');
            } else {
                setError('Ocurrió un error al registrarse. Por favor, inténtalo de nuevo.');
            }
        }
    };

    // Generate options for day, month, and year dropdowns
    const renderDayOptions = () => {
        const daysInMonth = new Date(user.year || 2000, user.month || 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>);
    };

    const renderMonthOptions = () => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames.map((month, index) => <option key={index + 1} value={index + 1}>{month}</option>);
    };

    const renderYearOptions = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 100 }, (_, i) => <option key={i} value={currentYear - i}>{currentYear - i}</option>);
    };

    useEffect(() => {
        if (window.location.href.includes("login")) {
            setCurrentPage('login');
        } else if (window.location.href.includes("signup")) {
            setCurrentPage('signup');
        }
    }, []); // Runs when the component mounts

    return (
        <div className="RegPage">
            {/* Top Bar */}
            <Navbar />
            <div className="login-form-wrapper">
                <div className="login-container">
                    <div className="button-group">
                        <Link to="/login">
                            <button className={`login-button ${currentPage === 'login' ? 'active' : ''}`}>Login</button>
                        </Link>
                        <button className={`signup-button ${currentPage === 'signup' ? 'active' : ''}`}>Sign Up</button>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name" style={{ color: '#FBFFCD' }}>Name</label>
                                <input
                                    placeholder="John"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname" style={{ color: '#FBFFCD' }}>Surname</label>
                                <input
                                    placeholder="Doe"
                                    type="text"
                                    id="surname"
                                    name="surname"
                                    value={user.surname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" style={{ color: '#FBFFCD' }}>Email Address</label>
                            <input
                                placeholder="johndoe@gmail.com"
                                type="email"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="identification" style={{ color: '#FBFFCD' }}>I.D.</label>
                            <input
                                placeholder="12345678"
                                type="text"
                                id="identification"
                                name="identification"
                                value={user.identification}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Birthday Selector */}
                        <div className="form-group">
                            <label htmlFor="birthday" style={{ color: '#FBFFCD' }}>Birthday</label>
                            <div className="birthday-selector">
                                <select name="day" value={user.day} onChange={handleChange} required>
                                    <option value="">Day</option>
                                    {renderDayOptions()}
                                </select>
                                <select name="month" value={user.month} onChange={handleChange} required>
                                    <option value="">Month</option>
                                    {renderMonthOptions()}
                                </select>
                                <select name="year" value={user.year} onChange={handleChange} required>
                                    <option value="">Year</option>
                                    {renderYearOptions()}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" style={{ color: '#FBFFCD' }}>Password</label>
                            <input
                                placeholder="••••••••"
                                type="password"
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reEnteredPassword" style={{ color: '#FBFFCD' }}>Re-enter Password</label>
                            <input
                                placeholder="••••••••"
                                type="password"
                                id="reEnteredPassword"
                                name="reEnteredPassword"
                                value={user.reEnteredPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}
                        <button className="submit-button" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
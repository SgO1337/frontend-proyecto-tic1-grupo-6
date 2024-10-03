import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../components/styleRegisterPage.css';
import '../components/styles.css';
import axios from "axios";

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
        year: '' // Fields for day, month, and year
    });
    const [error, setError] = useState(''); // To store error messages
    const [currentPage, setCurrentPage] = useState(''); // Track the current page
    const navigate = useNavigate(); // Hook for navigation
    const [view, setView] = useState('billboard'); // Change from bildoard to snack menu
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Handle the form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
        setError(''); // Clear any previous error when user starts typing
    };

    const handleLogin = () => {
        navigate('/login'); // Goes to login page
    };

    const handleViewChange = (newView) => {
        setView(newView);
        setDropdownOpen(false);  // Close dropdown after choosing
    };

    // Handle the form submission
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

        // Submit the form if validation passes
        /*try {
            const response = await axios.post('/api/auth/signup', {
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: user.password,
                birthday: `${user.year}-${user.month}-${user.day}` // Send birthday in YYYY-MM-DD format
            });

            if (response.data.success) {
                navigate('/'); // Redirect to the main page on success
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError('El email ya está registrado.');
            } else {
                setError('Ocurrió un error al registrarse. Por favor, inténtalo de nuevo.');
            }
        }*/
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
    }, []); // Runs once when the component mounts

    return (
        <>
            {/* Top Bar */}
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
                            <label htmlFor="name">Name</label>
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
                            <label htmlFor="surname">Surname</label>
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
                        <label htmlFor="email">Email Address</label>
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
                        <label htmlFor="identification">I.D.</label>
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
                        <label htmlFor="birthday">Birthday</label>
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
                        <br/>
                        <label htmlFor="password">Password</label>
                        <input
                            placeholder="password"
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reEnteredPassword">Re-Enter Password</label>
                        <input
                            placeholder="password"
                            type="password"
                            id="reEnteredPassword"
                            name="reEnteredPassword"
                            value={user.reEnteredPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>} {/* Show error message */}
                    <button type="submit" className="submit-button">Sign Up</button>
                </form>
            </div>
        </>
    );
};

export default SignUpPage;

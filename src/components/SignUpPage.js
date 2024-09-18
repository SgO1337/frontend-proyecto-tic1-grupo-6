import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';
import axios from "axios";

const SignUpPage = () => {
    const [user, setUser] = useState({ name: '', surname: '', email: '', password: '', reEnteredPassword: '' });
    const [error, setError] = useState(''); // To store error messages
    const [currentPage, setCurrentPage] = useState(''); // Track the current page
    const navigate = useNavigate(); // Hook for navigation

    // Handle the form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
        setError(''); // Clear any previous error when user starts typing
    };

    // Handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted');

        // Basic name and surname validation
        const namePattern = /^[a-zA-Z\s]+$/;
        if (!user.name) {
            setError('Name cannot be empty');
            return; // Stop form submission
        } else if (!namePattern.test(user.name)) {
            setError('Name can only contain letters and spaces');
            return; // Stop form submission
        } else if (user.name.length < 2 || user.name.length > 50) {
            setError('Name should be between 2 and 50 characters');
            return; // Stop form submission
        }

        if (!user.surname) {
            setError('Surname cannot be empty');
            return; // Stop form submission
        } else if (!namePattern.test(user.surname)) {
            setError('Surname can only contain letters and spaces');
            return; // Stop form submission
        } else if (user.surname.length < 2 || user.surname.length > 50) {
            setError('Surname should be between 2 and 50 characters');
            return; // Stop form submission
        }

        // Check if password and re-entered password match
        if (user.password !== user.reEnteredPassword) {
            setError('The passwords do not match');
            return; // Stop form submission
        }

        // Submit the form if validation passes
        /*try {
            const response = await axios.post('/api/auth/signup', {
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: user.password,
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

    useEffect(() => {
        if (window.location.href.includes("login")) {
            setCurrentPage('login');
        } else if (window.location.href.includes("signup")) {
            setCurrentPage('signup');
        }
    }, []); // Runs once when the component mounts

    return (
        <>
            <div className="title">
                <img src="/TituloTic1Logo2.png" alt="Title Logo"></img>
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
                        <br/><br/><br/>
                    </div>
                    <div className="form-group">
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
                        <br/>
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
                        <br/><br/>
                    </div>
                    {error && <div className="error-message">{error}</div>} {/* Show error message */}
                    <button type="submit" className="submit-button">Sign Up</button>
                </form>
            </div>
        </>
    );
};

export default SignUpPage;

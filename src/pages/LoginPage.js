import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use navigate for programmatic navigation
import '../components/styleRegisterPage.css';
import axios from "axios";
import Navbar from '../components/Navbar';

const LoginPage = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState(''); // To store error messages
    const [currentPage, setCurrentPage] = useState(''); // Track the current page
    const navigate = useNavigate(); // Hook for navigation

    // To handle the form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };


    //ESTO ES PARA TESTEAR, BORRAR EN LA VERSION FINAL
    const handleLogin = async (event) => {
        event.preventDefault();
        // Mock successful login response
        const response = {
            data: {
                success: true,
                token: 'mock-jwt-token'
            }
        };
        if (response.data.success) {
            localStorage.setItem('authToken', response.data.token);
            navigate('/');
        } else {
            setError('Login failed.');
        }
    };



    // The function responsible for handling login logic
    // const handleLogin = async () => {
    //     try {
    //         // Checks if the email is registered
    //         const response = await axios.post('/auth/login', user); // Now you can use await
    //         if (response.status === 200) {
    //             // Successful login, redirect to the main page
    //             localStorage.setItem('authToken', response.data.token);
    //             navigate('/'); // Navigate after successful login
    //         } else {
    //             // Show the error message
    //             setError(response.data.message); // Show error message
    //         }
    //     } catch (error) {
    //         // Handle the error
    //         if (error.response && error.response.status === 404) {
    //             setError('El email no está registrado.');
    //         } else if (error.response && error.response.status === 401) {
    //             setError('El email y la contraseña no coinciden.');
    //         } else {
    //             setError('Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.');
    //         }
    //     }
    // };

    // The function that handles form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the default form submission
        handleLogin(); // Calls handleLogin when the form is submitted
    };

    useEffect(() => {
        if (window.location.href.includes("login")) {
            setCurrentPage('login');
        } else if (window.location.href.includes("signup")) {
            setCurrentPage('signup');
        }
    }, []); // Dependency array ensures this runs once

    return (
        <>
            <Navbar isHomePage={false} />
            <div className="login-container">
                <div className="button-group">
                    <button className={`login-button ${currentPage === 'login' ? 'active' : ''}`}>Login</button>
                    <button
                        className={`signup-button ${currentPage === 'signup' ? 'active' : ''}`}
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </button>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            placeholder="johndoe@gmail.com"
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            placeholder="password"
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            required
                        />
                        <br /><br />
                        <button
                            type="button"
                            className="forgot-password-button"
                            onClick={() => navigate('/forgot-password')}
                        >
                            Forgot password?
                        </button>
                    </div>
                    <button type="submit" className="submit-button" style={{ color: 'white' }}>Login</button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;

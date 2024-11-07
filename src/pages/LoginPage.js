import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/stylesRegisterPage.css';
import '../styles/styles.css';
import Navbar from '../components/Navbar';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState('');
    const navigate = useNavigate(); // For navigation after login

    // Handle form input changes
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setError(''); // Clear previous error when typing starts
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setError(''); // Clear previous error when typing starts
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Login form submitted');
        
        try {
            const response = await axios.post('http://localhost:9090/auth/login', {
                email: email,
                password: password, // Send the hashed password
            }, { withCredentials: false }); // Include credentials for cookie handling
    
            if (response.status === 200) {
                console.log(response.data.message); // Handle success message
                
                // Store user ID in local storage
                // Assuming the user ID is sent as 'userId'
                localStorage.setItem('userId', response.data.userId); // Correct this line if needed
                localStorage.setItem('authToken', response.data.authToken); // Correct this line if needed

                
                navigate('/'); // Redirect to homepage after successful login
                window.location.reload()
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message); // Show error message from server
            } else {
                console.error("Login error:", error); // Log the unexpected error for debugging
                setError('An error occurred during login. Please try again.');
            }
        }
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
            <Navbar/>
            <div className="login-form-wrapper">
                <div className="login-container" style={{paddingBottom: '20px', marginBottom: '20px'}}>
                    <div className="button-group">
                        <button className={`login-button ${currentPage === 'login' ? 'active' : ''}`}>Login</button>
                        <Link to="/signup">
                            <button className={`signup-button ${currentPage === 'signup' ? 'active' : ''}`} type="button">Sign Up
                            </button>
                        </Link>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" style={{color: '#FBFFCD'}}>Email Address</label>
                            <input
                                placeholder="johndoe@gmail.com"
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" style={{color: '#FBFFCD'}}>Password</label>
                            <input
                                placeholder="password"
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div className="error-message">{error && <p>{error}</p>}</div>
                        <button className="submit-button" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
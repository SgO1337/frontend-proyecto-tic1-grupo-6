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


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login form submitted');

        // Hardcoded credentials for testing
        const hardcodedEmail = 'testuser@gmail.com';
        const hardcodedPassword = 'password123';

        if (email === hardcodedEmail && password === hardcodedPassword) {
            // Simulate successful login response
            localStorage.setItem('authToken', 'fakeAuthToken');
            localStorage.setItem('userData', JSON.stringify({ email: hardcodedEmail, name: 'Test User' }));
            navigate('/'); // Redirect to homepage after successful login
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    // Handle form submission for login
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log('Login form submitted');
    //
    //     try {
    //         // Send login request
    //         const response = await axios.post('/auth/login', {
    //             email: email,
    //             password: password
    //         });
    //
    //         if (response.data.success) {
    //             // Store token and user data in localStorage
    //             localStorage.setItem('authToken', response.data.token);
    //             localStorage.setItem('userData', JSON.stringify(response.data.user));
    //             navigate('/'); // Redirect to homepage after successful login
    //         } else {
    //             setError(response.data.message);
    //         }
    //     } catch (error) {
    //         if (error.response && error.response.status === 401) {
    //             setError('Invalid credentials. Please try again.');
    //         } else {
    //             setError('An error occurred during login. Please try again.');
    //         }
    //     }
    // };

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
            <div className="login-container" style={{ paddingBottom: '20px', marginBottom: '20px'}}>
                <div className="button-group">
                    <button className={`login-button ${currentPage === 'login' ? 'active' : ''}`}>Login</button>
                    <Link to="/signup">
                        <button className={`signup-button ${currentPage === 'signup' ? 'active' : ''}`}>Sign Up</button>
                    </Link>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" style= {{color: '#FBFFCD'}}>Email Address</label>
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
                        <label htmlFor="password" style= {{color: '#FBFFCD'}}>Password</label>
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
    );
};

export default LoginPage;

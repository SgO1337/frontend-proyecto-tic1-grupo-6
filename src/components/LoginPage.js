import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styleRegisterPage.css';
import axios from "axios"; // Si quieres añadir estilos específicos
import { Link } from 'react-router-dom';


const LoginPage = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState(''); // Para almacenar mensajes de error
    const [currentPage, setCurrentPage] = useState(''); // Track the current page
    const navigate = useNavigate(); // Hook para navegación
    const [view, setView] = useState('billboard'); // Change from bildoard to snack menu
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // To handle the form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleLogin = () => {
        navigate('/login'); // Goes to login page
    };

    const handleViewChange = (newView) => {
        setView(newView);
        setDropdownOpen(false);  // Close dropdown after choosing
    };

    // To handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted');

        try {
            // checks if the email is registered
            const response = await axios.post('/api/auth/login', user);

            if (response.data.success) {
                // succesful login, redirect to the main page
                navigate('/');
            } else {
                // show the error message
                setError(response.data.message);
            }
        } catch (error) {
            // Handle the error
            if (error.response && error.response.status === 404) {
                setError('El email no está registrado.');
            } else if (error.response && error.response.status === 401) {
                setError('El email y la contraseña no coinciden.');
            } else {
                setError('Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.');
            }
        }
    };

    useEffect(() => {
        if (window.location.href.includes("login")) {
            setCurrentPage('login');
        } else if (window.location.href.includes("signup")) {
            setCurrentPage('signup');
        }
    }, []); //El array de depenecia vacio significa que esto corre una sola vez cada vez que el componente hace el mount.

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
                <button className={`home-button ${currentPage === 'login' ? 'active' : ''}`}>Login</button>
                <Link to="/"></Link>

            </div>
            <div className="login-container">
                <div className="button-group">
                    <button className={`login-button ${currentPage === 'login' ? 'active' : ''}`}>Login</button>
                    <Link to="/signup">
                        <button className={`signup-button ${currentPage === 'signup' ? 'active' : ''}`}>Sign Up</button>
                    </Link>
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
                        <br/><br/>
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                    <button type="submit" className="submit-button">Login</button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;

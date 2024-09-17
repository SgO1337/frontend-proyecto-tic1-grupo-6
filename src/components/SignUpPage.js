import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import axios from "axios"; // Si quieres añadir estilos específicos
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState(''); // Para almacenar mensajes de error
    const [currentPage, setCurrentPage] = useState(''); // Track the current page
    const navigate = useNavigate(); // Hook para navegación

    // To handle the form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    // To handle the form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted');

        /*Revisar caules tienen que ser los errores a manejar y cual es el system error que sale acorde al problema que ocurre*/
        /*try {
            // checks if the email is registered
            const response = await axios.post('/api/auth/login', user);

            if (response.data.success) {
                // succesful sign up, redirect to the main page
                navigate('/');
            } else {
                // show the error message
                setError(response.data.message);
            }
        } catch (error) {
            // Handle the error
            if (error.response && error.response.status === 409) {
                setError('El email ya está registrado.');
            } else {
                setError('Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.');
            }
        }*/
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
            <div className="title">
                <h1>
                    WTF             {/*Agregar el logo de "WTF(un) Cinema" en la posicion del texto*/}
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
                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" id="email" name="email" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" onChange={handleChange} />
                        <br />
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                    <button type="submit" className="submit-button">Login</button>
                </form>
            </div>
        </>
    );
};

export default SignUpPage;

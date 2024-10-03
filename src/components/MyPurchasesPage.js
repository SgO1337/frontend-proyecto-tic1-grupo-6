/*
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styleRegisterPage.css';
import axios from "axios"; // Si quieres añadir estilos específicos
import { Link } from 'react-router-dom';
import HomePage from "./HomePage";

const MyPurchasesPage = () => {
    const [error, setError] = useState(''); // Para almacenar mensajes de error
    const navigate = useNavigate();
    const [view, setView] = useState('billboard'); // Change from bildoard to snack menu
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpenProfile , setDropdownOpenProfile] = useState(false);

    const handleViewChange = (newView) => {
        setView(newView);
        setDropdownOpen(false);  // Close dropdown after choosing
        setDropdownOpenProfile(false);
    };

    const handleSnacksClick = () => {
        navigate("/", { state: { view: 'snacks' } }); // Pass the view state when navigating
    };


    return (
        <>
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

                <div className="dropdown">
                    <button className="dropdown-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        {view === 'billboard' ? 'Billboard' : 'Snacks'} {/!* Muestra la opción seleccionada *!/}
                    </button>
                    {dropdownOpen && (
                        <ul className="dropdown-menu">
                            <li onClick={() => navigate("/")}>Billboard</li>
                            <li onClick={() => handleSnacksClick()}>Snacks</li>
                        </ul>
                    )}
                </div>

                <button className="profile-button" onClick={() => setDropdownOpenProfile(!dropdownOpenProfile)}>
                    {view === '{/!*Nombre y Apellido*!/}' ? '{/!*Nombre y Apellido*!/}' : 'My account' & ""}
                </button>
                {dropdownOpenProfile && (
                    <ul className="dropdownprofile-menu">
                        <li onClick={() => handleViewChange('myaccount')}>{/!*Nombre y Apellido*!/}</li>
                        <li OnClick={() => handleViewChange()}></li>
                        <li onClick={() => handleViewChange('logout')}>Log Out</li>
                    </ul>
                )}

            </div>
        </>
    )

}

export default MyPurchasesPage;*/

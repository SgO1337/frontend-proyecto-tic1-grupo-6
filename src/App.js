// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SelectionInfoPage from './pages/SelectionInfoPage';
import MyPurchasesPage from './pages/MyPurchasesPage';
import MyProfilePage from './pages/MyProfilePage';
import SeatsPage from './pages/SeatsPage';
import { UserProvider } from './context/UserContext'; // Import the UserProvider

const App = () => {
    return (
        <UserProvider> {/* Wrap all routes in UserProvider */}
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} /> {/* Página de inicio con la cartelera */}
                    <Route path="/app" element={<UserTable />} /> {/* Página principal */}
                    <Route path="/login" element={<LoginPage />} /> {/* Página de inicio de sesión */}
                    <Route path="/signup" element={<SignUpPage />} /> {/* Página de registro de usuarios */}
                    <Route path="/create" element={<UserForm />} /> {/* Página para crear usuario */}
                    <Route path="/select/:id" element={<SelectionInfoPage />} /> {/* Página de selección de película */}
                    <Route path="/mypurchases" element={<MyPurchasesPage />} /> {/* Página de compras */}
                    <Route path="/myprofile" element={<MyProfilePage />} /> {/* Página de perfil de usuario */}
                    <Route path="/seats/:id/:screeningId/:q" element={<SeatsPage />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;

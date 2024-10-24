import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/stylesMyProfilePage.css';
import '../styles/styles.css';

const MyProfilePage = () => {
    const [view, setView] = useState('profile'); // Default view
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false); // State for logout confirmation modal
    const navigate = useNavigate();

    const user = {
        id: '123456',
        name: 'John',
        surname: 'Doe',
        birthday: '01/15/1990',
        email: 'johndoe@example.com',
        password: 'oldPassword123',
    };

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleOldPasswordSubmit = () => {
        if (!oldPassword) {
            setErrorMessage('First enter old Password.');
            return;
        }
        if (oldPassword !== user.password) {
            setErrorMessage('Password is incorrect. Please double-check your password.');
            return;
        }
        setErrorMessage('');
        setView('newPassword');
    };

    const handleNewPasswordSubmit = () => {
        if (!newPassword || !confirmPassword) {
            setErrorMessage('Please fill in both fields.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrorMessage('New passwords do not match.');
            return;
        }
        alert('Password changed successfully!');
        setView('profile');
    };

    const handleLogout = () => {
        setShowLogoutModal(true); // Show confirmation modal
    };

    const confirmLogout = () => {
        setShowLogoutModal(false);
        localStorage.removeItem('authToken');
        navigate('/'); // Navigate to the login page or handle actual logout
    };

    const cancelLogout = () => {
        setShowLogoutModal(false); // Close the modal
    };

    const renderContent = () => {
        switch (view) {
            case 'profile':
                return (
                    <div className="profile-info">
                        <div className="info-block">
                            <p className="info-item">Name: {user.name} {user.surname}</p>
                            <p className="info-item">ID: {user.id}</p>
                            <p className="info-item">Birthday: {user.birthday}</p>
                            <p className="info-item">Email: {user.email}</p>
                        </div>
                    </div>
                );
            case 'password':
                return (
                    <div className="password-info">
                        <div className="info-block">
                            <p className="info-item">Enter Old Password:</p>
                            <input
                                type="password"
                                placeholder="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="password-input"
                            />
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <button className="change-password-button" onClick={handleOldPasswordSubmit}>
                                Change Password
                            </button>
                        </div>
                    </div>
                );
            case 'newPassword':
                return (
                    <div className="password-info">
                        <div className="info-block">
                            <p className="info-item">Enter New Password:</p>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="password-input"
                            />
                            <p className="info-item">Re-enter New Password:</p>
                            <input
                                type="password"
                                placeholder="Re-enter Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="password-input"
                            />
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <button className="change-password-button" onClick={handleNewPasswordSubmit}>
                                Change Password
                            </button>
                        </div>
                    </div>
                );
            default:
                return <div>Your Profile Information</div>;
        }
    };

    return (
        <div className="my-profile-page">
            <Navbar view={view} setDropdownOpen={setDropdownOpen} dropdownOpen={dropdownOpen} handleViewChange={setView} />
            <div className="content">
                <div className="sidebar">
                    <div className="rounded-button" onClick={() => setView('profile')}>Profile</div>
                    <div className="rounded-button" onClick={() => setView('password')}>Change Password</div>
                    <div className="rounded-button" onClick={handleLogout}>Log Out</div>
                </div>
                <div className="main-content">
                    {renderContent()}
                </div>
            </div>

            {showLogoutModal && (
                <div className="logout-modal-overlay">
                    <div className="logout-modal">
                        <p style={{color: '#FBFFCD'}}>Are you sure you want to Log Out?</p>
                        <button className="logout-button yes-button" onClick={confirmLogout}>Yes</button>
                        <button className="logout-button no-button" onClick={cancelLogout}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyProfilePage;

// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(() => localStorage.getItem('userId')); // Initialize from localStorage

    useEffect(() => {
        if (userId) {
            localStorage.setItem('userId', userId); // Update localStorage whenever userId changes
        }
    }, [userId]);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

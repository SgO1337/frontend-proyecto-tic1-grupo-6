// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

// UserProvider component
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(() => localStorage.getItem('userId')); // Initialize from localStorage

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('user');

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    try {
        const parsedUser = JSON.parse(user);
        if (!parsedUser) {
            return <Navigate to="/login" replace />;
        }
    } catch (error) {
        console.error('Error parsing user:', error);
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

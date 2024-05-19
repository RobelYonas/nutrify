// src/components/Profile/Profile.jsx
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Weight:</strong> {user.weight} kg</p>
            <p><strong>Dietary Goal:</strong> {user.dietaryGoal}</p>
        </div>
    );
};

export default Profile;

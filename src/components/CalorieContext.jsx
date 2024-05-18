import React, { createContext, useContext, useState } from 'react';

const CalorieContext = createContext();

export const useCalories = () => {
    return useContext(CalorieContext);
};

export const CalorieProvider = ({ children }) => {
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalFat, setTotalFat] = useState(0);

    const addCalories = (calories) => {
        setTotalCalories(prevCalories => prevCalories + calories);
    };

    const addProtein = (protein) => {
        setTotalProtein(prevProtein => prevProtein + protein);
    };

    const addFat = (fat) => {
        setTotalFat(prevFat => prevFat + fat);
    };

    return (
        <CalorieContext.Provider value={{ totalCalories, addCalories, totalProtein, addProtein, totalFat, addFat }}>
            {children}
        </CalorieContext.Provider>
    );
};

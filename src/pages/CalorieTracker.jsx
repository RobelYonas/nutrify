import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';
import { useCalories } from '../components/CalorieContext'; // Import the useCalories hook

const CalorieTracker = () => {
    const { totalCalories, totalProtein, totalFat } = useCalories(); // Get the total values from context
    const calorieGoal = 2000; // Example calorie goal
    const proteinGoal = 100; // Example protein goal
    const fatGoal = 70; // Example fat goal

    const [currentNutrient, setCurrentNutrient] = useState('calories');

    const nutrients = {
        calories: { total: totalCalories, goal: calorieGoal, label: 'kcal' },
        protein: { total: totalProtein, goal: proteinGoal, label: 'g' },
        fat: { total: totalFat, goal: fatGoal, label: 'g' },
    };

    const nutrient = nutrients[currentNutrient];
    const remaining = nutrient.goal - nutrient.total;

    return (
        <Container>
            <ButtonContainer>
                <NutrientButton
                    isActive={currentNutrient === 'calories'}
                    onClick={() => setCurrentNutrient('calories')}
                >
                    Calories
                </NutrientButton>
                <NutrientButton
                    isActive={currentNutrient === 'protein'}
                    onClick={() => setCurrentNutrient('protein')}
                >
                    Protein
                </NutrientButton>
                <NutrientButton
                    isActive={currentNutrient === 'fat'}
                    onClick={() => setCurrentNutrient('fat')}
                >
                    Fat
                </NutrientButton>
            </ButtonContainer>
            <ProgressWrapper>
                <GoalContainer>
                    <p>Goal: {nutrient.goal} {nutrient.label}</p>
                </GoalContainer>
                <ProgressContainer>
                    <CircularProgressbar
                        value={nutrient.total}
                        maxValue={nutrient.goal}
                        text={`${nutrient.total} ${nutrient.label}`}
                        styles={buildStyles({
                            textSize: '16px',
                            textColor: '#f88',
                            pathColor: '#f88',
                            trailColor: '#d6d6d6',
                        })}
                    />
                </ProgressContainer>
                <RemainingContainer>
                    <p>Left: {remaining} {nutrient.label}</p>
                </RemainingContainer>
            </ProgressWrapper>
        </Container>
    );
};

const Container = styled.div`
    text-align: center;
    margin: 20px auto;
    padding: 20px;
    border-radius: 10px;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        margin-bottom: 10px;
    }
`;

const NutrientButton = styled.button`
    padding: 1em 2em;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    letter-spacing: 5px;
    text-transform: uppercase;
    cursor: pointer;
    color: ${(props) => (props.isActive ? '#ffffff' : '#2c9caf')};
    transition: all 1000ms;
    font-size: 15px;
    position: relative;
    overflow: hidden;
    outline: 2px solid ${(props) => (props.isActive ? '#70bdca' : '#2c9caf')};
    background-color: ${(props) => (props.isActive ? '#2c9caf' : 'transparent')};

    &:hover {
        color: #ffffff;
        transform: scale(1.1);
        outline: 2px solid #70bdca;
        box-shadow: 4px 5px 17px -4px #268391;
    }

    &::before {
        content: "";
        position: absolute;
        left: -50px;
        top: 0;
        width: 0;
        height: 100%;
        background-color: #2c9caf;
        transform: skewX(45deg);
        z-index: -1;
        transition: width 1000ms;
    }

    &:hover::before {
        width: 250%;
    }

    @media (max-width: 768px) {
        padding: 0.5em 1em;
        font-size: 12px;
        margin: 5px;
    }
`;

const ProgressWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const GoalContainer = styled.div`
    margin-right: 20px;

    @media (max-width: 768px) {
        margin-right: 0;
        margin-bottom: 10px;
    }
`;

const ProgressContainer = styled.div`
    width: 150px;

    @media (max-width: 768px) {
        width: 100px;
        margin-bottom: 10px;
    }
`;

const RemainingContainer = styled.div`
    margin-left: 20px;

    @media (max-width: 768px) {
        margin-left: 0;
    }
`;

export default CalorieTracker;

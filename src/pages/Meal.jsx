import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'

function Meal() {
    const [meals, setMeals] = useState([])
    let params = useParams();

    useEffect(() => {
        getMeal(params.type)
    }, [params.type])

    const getMeal = async (meal) => {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type=${meal}`)
        const recipe = await api.json();
        setMeals(recipe.results)
    }

    return (
        <Grid
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {meals.map((meal) => {
                return (
                    <Card key={meal.id}>
                        <Link to={'/recipe/' + meal.id}>
                            <img src={meal.image} alt={meal.title} />
                            <h4>{meal.title}</h4>
                        </Link>
                    </Card>
                )
            })}
        </Grid>
    )
}

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: 2rem;
    padding: 2rem;

    @media (max-width: 768px) {
        grid-gap: 1rem;
        padding: 1rem;
    }
`;

const Card = styled.div`
    background-color: #fff;
    border-radius: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }

    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-bottom: 1px solid #ddd;
        border-radius: 1rem 1rem 0 0;
    }

    a {
        text-decoration: none;
        color: #333;
    }

    h4 {
        text-align: center;
        padding: 1rem;
        font-size: 1rem;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        img {
            height: 150px;
        }

        h4 {
            font-size: 0.9rem;
            padding: 0.5rem;
        }
    }
`;

export default Meal;

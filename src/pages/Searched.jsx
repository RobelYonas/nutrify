import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

function Searched() {

    const [searched, setSearched] = useState([])
    let params = useParams()

    const getSearched = async (meal) => {
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${meal}`)
        const recipe = await api.json();
        setSearched(recipe.results)
    }

    useEffect(() => {
        getSearched(params.query)
    }, [params.query])

    return (
        <Grid>
            {searched.map((item) => {
                return (
                    <Card key={item.id}>
                        <Link to={'/recipe/' + item.id}>
                            <img src={item.image} alt={item.title} />
                            <p>{item.title}</p>
                        </Link>
                    </Card>
                )
            })}
        </Grid>
    )
}

const Grid = styled.div`
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
    }

    a {
        text-decoration: none;
        color: #333;
    }

    p {
        text-align: center;
        padding: 1rem;
        font-size: 1rem;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        img {
            height: 150px;
        }

        p {
            font-size: 0.9rem;
            padding: 0.5rem;
        }
    }
`;

export default Searched;

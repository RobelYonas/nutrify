import { FaBreadSlice } from "react-icons/fa";
import { MdLunchDining } from "react-icons/md";
import { MdDinnerDining } from "react-icons/md";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Category() {
    return (
        <List>
            <SLink to={'/meal/breakfast'}>
                <FaBreadSlice />
                <h4>BreakFast</h4>
            </SLink>
            <SLink to={'/meal/maincourse'}>
                <MdLunchDining />
                <h4>Lunch</h4>
            </SLink>
            <SLink to={'/meal/fingerfood'}>
                <MdDinnerDining />
                <h4>Dinner</h4>
            </SLink>
            <SLink to={'/tracker'}>
                <MdDinnerDining />
                <h4>Tracker</h4>
            </SLink>
        </List>
    )
}

const List = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const SLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 2rem;
    text-decoration: none;
    background: teal;
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    transform: scale(0.8);
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(0.9);
    }

    h4 {
        color: white;
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }
    
    svg {
        color: white;
        font-size: 1.5rem;
    }

    &.active {
        background: #ec3877;

        svg {
            color: white;
        }

        h4 {
            color: white;
        }
    }

    @media (max-width: 768px) {
        margin-right: 0;
        margin-bottom: 1rem;
        width: 5rem;
        height: 5rem;

        h4 {
            font-size: 0.7rem;
        }

        svg {
            font-size: 1.2rem;
        }
    }
`;

export default Category;

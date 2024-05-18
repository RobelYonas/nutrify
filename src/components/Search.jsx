import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function Search() {

    const [input, setInput] = useState("")
    const navigate = useNavigate()

    const Submithandler = (e) => {
        e.preventDefault();
        navigate('/searched/' + input)
    }

    return (
        <FormStyle onSubmit={Submithandler}>
            <InputContainer>
                <Input
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    value={input}
                    placeholder="Search..."
                />
                <Icon>
                    <FaSearch />
                </Icon>
            </InputContainer>
        </FormStyle>
    )
}

const FormStyle = styled.form`
    margin: 0 20rem;
    position: relative;

    @media (max-width: 1200px) {
        margin: 0 10rem;
    }

    @media (max-width: 768px) {
        margin: 0 2rem;
    }
`;

const InputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: none;
    outline: none;
    padding: 18px 16px;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.5s ease-in-out;

    &::placeholder {
        color: transparent;
    }

    &:focus::placeholder {
        color: rgb(131, 128, 128);
    }

    &:focus, &:not(:placeholder-shown) {
        background-color: #fff;
        border: 1px solid rgb(98, 0, 255);
        width: 290px;
        cursor: none;
        padding: 18px 16px 18px 40px;
    }
`;

const Icon = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    width: 40px;
    background-color: #fff;
    border-radius: 10px;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(98, 0, 255);
    transition: transform 0.2s ease-in-out;

    svg {
        fill: rgb(98, 0, 255);
    }

    ${Input}:hover + & {
        transform: rotate(360deg);
    }

    ${Input}:focus + &, ${Input}:not(:placeholder-shown) + & {
        z-index: 0;
        background-color: transparent;
        border: none;
    }
`;

export default Search;

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.scss';
import video from '../assets/video.mp4';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setMessage('Login successful');
            navigate('/home'); // Redirect to home page
        } catch (error) {
            console.error('Error logging in user:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className='loginPage flex'>
            <div className="container flex">
                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>
                    <div className="textDiv">
                        <h2 className="title">Meal Prep Properly</h2>
                        <p>Healthy You is the Best You</p>
                    </div>
                    <div className="footerDiv flex">
                        <span className="text">Don't have an account?</span>
                        <Link to={'/register'}>
                            <button className="btn">Sign Up</button>
                        </Link>
                    </div>
                </div>
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <h3>Welcome Back!</h3>
                    </div>
                    <form onSubmit={handleSubmit} className='form grid'>
                        {error && <p className="showMessage">{error}</p>}
                        {message && <p className="showMessage">{message}</p>}
                        <div className="inputDiv">
                            <label htmlFor='email'>Email</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input type='email' id='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor='password'>Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input type='password' id='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
                            </div>
                        </div>
                        <button type='submit' className='btn flex'>
                            <span>Login</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

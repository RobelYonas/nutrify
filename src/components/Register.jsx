import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.scss';
import video from '../assets/video.mp4';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';
import { FaWeightScale } from 'react-icons/fa6';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        weight: '',
        dietaryGoal: ''
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setMessage('Registration successful');
            navigate('/home'); // Redirect to home page
        } catch (error) {
            console.error('Error registering user:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className='registerPage flex'>
            <div className="container flex">
                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>
                    <div className="textDiv">
                        <h2 className="title">Meal Prep Properly</h2>
                        <p>Healthy You is the Best You</p>
                    </div>
                    <div className="footerDiv flex">
                        <span className="text">Have an account?</span>
                        <Link to={'/login'}>
                            <button className="btn">Login</button>
                        </Link>
                    </div>
                </div>
                <div className="formDiv flex">
                    <div className="headerDiv">
                        <h3>Let Us Know You!</h3>
                    </div>
                    <form onSubmit={handleSubmit} className='form grid'>
                        {error && <p className="showMessage">{error}</p>}
                        {message && <p className="showMessage">{message}</p>}
                        <div className="inputDiv">
                            <label htmlFor='username'>Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input type='text' id='username' name='username' placeholder='Username' value={formData.username} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor='weight'>Current Weight</label>
                            <div className="input flex">
                                <FaWeightScale className='icon' />
                                <input type='text' id='weight' name='weight' placeholder='Current Weight (kg)' value={formData.weight} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor='dietaryGoal'>Dietary Goal</label>
                            <div className="input flex">
                                <FaWeightScale className='icon' />
                                <input type='text' id='dietaryGoal' name='dietaryGoal' placeholder='Dietary Goal (bulk, cut, maintain)' value={formData.dietaryGoal} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor='email'>Email</label>
                            <div className="input flex">
                                <MdMarkEmailRead className='icon' />
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
                            <span>Register</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

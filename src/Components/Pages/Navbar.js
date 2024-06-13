import React from 'react';
import { useStateContext } from '../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../AxiosClient';
import '../Assets/Navbar.css';

export const Navbar = () => {
    const navigate = useNavigate();
    const { setToken, setUser } = useStateContext();

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
            navigate('/login');
        });
    };
    return(
        <header className='header'>
           <span className="navbar-brand">MyApp</span>
           <button className="logout-button" onClick={onLogout}>Logout</button>
        </header>
    )
}
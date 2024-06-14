import React, { useState } from 'react';
import { useStateContext } from '../Context/ContextProvider';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../../AxiosClient';
import '../Assets/Navbar.css';

export const Navbar = () => {
    const navigate = useNavigate();
    const { setToken, setUser } = useStateContext();
    const [isActive, setIsActive] = useState(false);

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
            navigate('/login');
        });
    };

    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };

    const closeDropdown = () => {
        setIsActive(false);
    };

    return (
        <div className="App-navbar">
            <header className="App-header">
                <nav className="navbar">
                    <a href='#home' className="logo">Web Auth </a>
                    <ul className={`navMenu ${isActive ? 'active' : ''}`}>
                        <li>
                            <Link to="/home" onClick={closeDropdown}>Home</Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={closeDropdown}>Contact</Link>
                        </li>
                        <li className="dropdown">
                            <div className="dropbtn">
                                Dropdown
                                <div className={`dropdown-content ${isActive ? 'active' : ''}`}>
                                    <Link to="#" onClick={closeDropdown}>Link 1</Link>
                                    <Link to="#" onClick={closeDropdown}>Link 2</Link>
                                    <Link to="#" onClick={onLogout}>Log Out</Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={toggleActiveClass}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </nav>
            </header>
        </div>
    );
};


export default Navbar;

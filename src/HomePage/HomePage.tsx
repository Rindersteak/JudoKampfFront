import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/kadokan_logo.svg';
import './HomePage.css';

const HomePage: React.FC = () => {
    return (
        <div>
            <div className="top-banner">
                <img src={logo} alt="Logo" className="logo" />
                <h1 style={{ textAlign: 'center' }}>Willkommen bei<br />kadokan</h1>
            </div>
            <div className="lower-container">
                <Link to="/participant-manager" className="left-container">
                    <h1>Neues Turnier<br />anlegen</h1>
                </Link>
                <Link to="/participant-manager" className="right-container">
                    <h1>Bestehendes<br />Turnier öffnen</h1>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;

// HomePage.tsx

import React, { CSSProperties } from 'react';
import logo from '../../img/kadokan_logo.svg';
import './HomePage.css';

interface HomePageProps {
    onOpenParticipantManager: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenParticipantManager }) => {
    return (
        <div className="content">
            <div className="top-banner">
                <img src={logo} alt="Logo" className="logo" />
                <h1 style={{ textAlign: 'center' }}>Willkommen bei<br />kadokan</h1>
            </div>
            <div className="lower-container">
                <div onClick={onOpenParticipantManager} className="left-container">
                    <h1>Neues Turnier<br />anlegen</h1>
                </div>
                <div onClick={onOpenParticipantManager} className="right-container">
                    <h1>Bestehendes<br />Turnier öffnen</h1>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

// HomePage.tsx

import React, { CSSProperties } from 'react';
import logo from '../../img/kodokan_logo.svg';
import './HomePage.css';

interface HomePageProps {
    onOpenFighterManager: () => void;
    onOpenTournamentForm: () => void; 
    onOpenTournamentList: () => void; 
}

const HomePage: React.FC<HomePageProps> = ({ onOpenTournamentList, onOpenTournamentForm }) => {
    return (
        <div className="content">
            <div className="top-banner">
                <img src={logo} alt="Logo" className="logo" />
                <h1 style={{ textAlign: 'center' }}>Willkommen bei<br />kodokan</h1>
            </div>
            <div className="lower-container">
                <div onClick={onOpenTournamentForm} className="left-container">
                    <h1>Neues Turnier<br />anlegen</h1>
                </div>
                <div onClick={onOpenTournamentList} className="right-container">
                    <h1>Bestehendes<br />Turnier öffnen</h1>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

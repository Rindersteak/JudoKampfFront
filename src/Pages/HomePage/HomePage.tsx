// HomePage.tsx

import React, { CSSProperties } from 'react';
import logo from '../../img/kadokan_logo.svg';
import './HomePage.css';

interface HomePageProps {
    onOpenFighterManager: () => void;
    onOpenTournamentForm: () => void;
}



const HomePage: React.FC<HomePageProps> = ({ onOpenFighterManager, onOpenTournamentForm }) => {
=======
    onOpenFighterManager: () => void; // Props-Typ definieren, der eine Funktion erwartet
}

const HomePage: React.FC<HomePageProps> = ({ onOpenFighterManager }) => { // Deklaration der HomePage-Komponente als Funktionskomponente
>>>>>>> b7a44c0172934c6eb2371e13f402cfa03397d2a7
    return (
        <div className="content">
            <div className="top-banner">
                <img src={logo} alt="Logo" className="logo" />
                <h1 style={{ textAlign: 'center' }}>Willkommen bei<br />kodokan</h1>
            </div>
            <div className="lower-container">
                <div onClick={onOpenFighterManager} className="left-container">
                    <h1>Neues Turnier<br />anlegen</h1>
                </div>
                <div onClick={onOpenFighterManager} className="right-container">
                    <h1>Bestehendes<br />Turnier öffnen</h1>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

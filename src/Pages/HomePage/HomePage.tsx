import React, { CSSProperties } from 'react'; // React und CSSProperties importieren
import logo from '../../img/kadokan_logo.svg'; // Importieren des Logos als Bild
import './HomePage.css'; // Importieren von Styling für HomePage

interface HomePageProps {
<<<<<<< HEAD
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
        <div className="content"> {/* Div-Container mit der Klasse "content" */}
            <div className="top-banner"> {/* Div-Container für den oberen Banner */}
                <img src={logo} alt="Logo" className="logo" /> {/* Logo-Bild */}
                <h1 style={{ textAlign: 'center' }}>Willkommen bei<br />kodokan</h1> {/* Überschrift für die Startseite */}
            </div>
<<<<<<< HEAD
            <div className="lower-container">
                <div onClick={onOpenTournamentForm} className="left-container">
                    <h1>Neues Turnier<br />anlegen</h1>
=======
            <div className="lower-container"> {/* Div-Container für den unteren Bereich */}
                <div onClick={onOpenFighterManager} className="left-container"> {/* Div-Container für den linken Bereich */}
                    <h1>Neues Turnier<br />anlegen</h1> {/* Überschrift für die Option, ein neues Turnier anzulegen */}
>>>>>>> b7a44c0172934c6eb2371e13f402cfa03397d2a7
                </div>
                <div onClick={onOpenFighterManager} className="right-container"> {/* Div-Container für den rechten Bereich */}
                    <h1>Bestehendes<br />Turnier öffnen</h1> {/* Überschrift für die Option, ein bestehendes Turnier zu öffnen */}
                </div>
            </div>
        </div>
    );
};

export default HomePage; // Export der HomePage-Komponente als Standardexport
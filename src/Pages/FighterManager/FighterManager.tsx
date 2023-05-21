import React, { useState } from 'react';
import FighterForm from '../FighterForm/FighterForm'; 
import FighterList from '../FighterList/FighterList'; 
import { Fighter } from '../../types'; 
import './FighterManager.css'; 

const FighterManager: React.FC = () => {
    const [fighters, setFighters] = useState<Fighter[]>([]);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const addFighter = (fighter: Fighter) => {
        // Funktion, um Kämpfer zur Liste hinzuzufügen
        setFighters([fighter, ...fighters]);
    };

    const handleSuccessPopup = (status: boolean) => {
        // Funktion, um Popup nur bei Erfolg anzuzeigen
        setShowSuccessPopup(status);
        if (status) {
            setTimeout(() => {
                setShowSuccessPopup(false);
            }, 3000); // Popup nach 3 Sekunden ausblenden
        }
    };

    return (
        <div className="innerContainer">
            <div className="formContainer">
                <FighterForm onAddFighter={addFighter} onShowSuccessPopup={handleSuccessPopup} />
            </div>
            <div className="listSection">
                <h1 className="titleStyleList">Teilnehmerliste</h1>
                <div className="listContainer">
                    <FighterList fighters={fighters} />
                </div>
            </div>
            {showSuccessPopup && (
                <div className="successPopup">
                    Eintrag erfolgreich hinzugefügt!
                </div>
            )}
        </div>
    );
};

export default FighterManager;

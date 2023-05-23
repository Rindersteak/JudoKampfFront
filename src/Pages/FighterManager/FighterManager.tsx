import React, { useState } from 'react';
import FighterForm from '../FighterForm/FighterForm';
import FighterList from '../FighterList/FighterList';
import './FighterManager.css';

const FighterManager: React.FC = () => {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [listKey, setListKey] = useState(Math.random());

    const handleSuccessPopup = (status: boolean) => {
        setShowSuccessPopup(status);
        if (status) {
            setTimeout(() => {
                setShowSuccessPopup(false);
            }, 3000);
            setListKey(Math.random());
        }
    };

    return (
        <div className="innerContainer">
            <div className="formContainer">
                <FighterForm onAddFighter={() => {}} onShowSuccessPopup={handleSuccessPopup} />
            </div>
            <div className="listSection">
                <h1 className="titleStyleList">Teilnehmerliste</h1>
                <div className="listContainer">
                    <FighterList key={listKey} detailedView={false} />
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

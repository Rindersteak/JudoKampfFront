import React, { useState } from 'react';
import FighterForm from '../FighterForm/FighterForm';
import FighterList from '../FighterList/FighterList';
import './FighterManager.css';

const FighterManager: React.FC = () => {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
    const [listKey, setListKey] = useState(Math.random());

    const handleSuccessPopup = (status: boolean) => {
        setShowSuccessPopup(status);
        setShowConfirmDeletePopup(true);
        if (status) {
            setTimeout(() => {
                setShowSuccessPopup(false);
            }, 3000);
            setListKey(Math.random());
        }
    };

    const handleConfirmDeletePopup = () => {
        setShowConfirmDeletePopup(true);
    };
    
    const handleCloseConfirmDeletePopup = () => {
        setShowConfirmDeletePopup(false);
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

            {showConfirmDeletePopup && (
                <div className="popupOverlay">
                    <div className="confirmDeletePopUp">
                        <div className='close'>
                        <span className="close">&times;</span>
                        </div> 
                        <div className='headTitle'>
                            Möchten Sie den Teilnehmer wirklich löschen?
                        </div>
                
                        <div className='buttonContainer'>
                            <div className='abortDeleteButton'>
                                <div className='abortDeleteButtonText'>
                                    Nein, behalten
                                </div>
                            </div>

                            <div className='ConfirmDeleteButton'>
                                <div className='ConfirmButtonText'>
                                    Ja, löschen
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FighterManager;

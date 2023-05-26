import React, { useState } from 'react';
import FighterForm from '../FighterForm/FighterForm';
import FighterList, { deleteFighterHandler } from '../FighterList/FighterList';
import Modal from '../../Modal/Modal';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import './FighterManager.css';

const FighterManager: React.FC = () => {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
    const [fighterIdToDelete, setFighterToDelete] = useState<number | null>(null); 
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

    const handleConfirmDelete = (fighterId: number) => {
        setShowConfirmDeletePopup(true);
        setFighterToDelete(fighterId);
    }
    const handleDeleteConfirmed = async () => {
        if (fighterIdToDelete !== null) {
            await deleteFighterHandler(fighterIdToDelete);
            setShowConfirmDeletePopup(false);
            setListKey(Math.random()); 
        }
    }
    
    const handleDeleteCanceled = () => {
        setShowConfirmDeletePopup(false);
    }

    return (
        <div className="innerContainer">
            <div className="formContainer">
                <FighterForm onAddFighter={() => { }} onShowSuccessPopup={handleSuccessPopup} />
            </div>
            <div className="listSection">
                <h1 className="titleStyleList">Teilnehmerliste</h1>
                <div className="listContainer">
                <FighterList key={listKey} detailedView={false} onDeleteFighter={handleConfirmDelete} />
                </div>
            </div>
            {showSuccessPopup && (
                <div className="successPopup">
                    Eintrag erfolgreich hinzugefügt!
                </div>
            )}
            {showConfirmDeletePopup && fighterIdToDelete !== null && (
                <Modal size="small" onClose={handleDeleteCanceled}>
                    <ConfirmDelete
                        onClose={handleDeleteCanceled}
                        onConfirmDelete={handleDeleteConfirmed}
                        fighterId={fighterIdToDelete}
                    />
                </Modal>
            )}
        </div>
    );
};


export default FighterManager;

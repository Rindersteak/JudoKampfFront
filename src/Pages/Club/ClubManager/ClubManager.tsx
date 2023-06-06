import React, { useState } from 'react';
import ClubForm from '../ClubForm/ClubForm';
import ClubList, { deleteClubHandler } from '../ClubList/ClubList';
import Modal from '../../../Tools/Modal/Modal';
import ConfirmDelete from '../../../Tools/ConfirmDelete/ConfirmDelete';
import './ClubManager.scss';

const ClubManager: React.FC = () => {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
    const [clubIDToDelete, setClubToDelete] = useState<number | null>(null);
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

    const handleConfirmDelete = (clubID: number) => {
        setShowConfirmDeletePopup(true);
        setClubToDelete(clubID);
    }
    const handleDeleteConfirmed = async () => {
        if (clubIDToDelete !== null) {
            await deleteClubHandler(clubIDToDelete);
            setShowConfirmDeletePopup(false);
            setListKey(Math.random());
        }
    }

    const handleDeleteCanceled = () => {
        setShowConfirmDeletePopup(false);
    }

    return (
        <div className="innerContainer">
            
                <ClubForm onAddClub={() => { }} onShowSuccessPopup={handleSuccessPopup} />
            
            <div className="listSection">
                <h1 className="titleStyleList">Vereinsliste</h1>
                
                    <ClubList key={listKey} detailedView={false} onDeleteClub={handleConfirmDelete} />
                
            </div>
            {showSuccessPopup && (
                <div className="successPopup">
                    Eintrag erfolgreich hinzugefügt!
                </div>
            )}
            {showConfirmDeletePopup && clubIDToDelete !== null && (
                <Modal size="small" onClose={handleDeleteCanceled}>
                    <ConfirmDelete
                        onClose={handleDeleteCanceled}
                        onConfirmDelete={handleDeleteConfirmed}
                        idToDelete={clubIDToDelete}
                    />
                </Modal>
            )}
        </div>
    );
};


export default ClubManager;

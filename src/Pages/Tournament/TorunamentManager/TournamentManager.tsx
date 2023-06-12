import React, { useState } from 'react';
import Modal from '../../../Tools/Modal/Modal';
import ConfirmDelete from '../../../Tools/ConfirmDelete/ConfirmDelete';
import TournamentEdit from '../TournamentEdit/TournamentEdit';
import './FighterManager.scss';
import '../../../Styles/GlobalStyles.scss'

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
    return (
        <div className='innerContainerScrollbar'>
            teest
        </div>
    );
};


export default FighterManager;

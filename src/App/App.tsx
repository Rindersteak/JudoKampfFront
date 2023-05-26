import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../Routes/Routes';
import Modal from '../Modal/Modal';
import TournamentList from '../Pages/TournamentList/TournamentList';
import TournamentForm from '../Pages/TournamentForm/TournamentForm';
import FighterList from '../Pages/FighterList/FighterList'
import FighterManager from '../Pages/FighterManager/FighterManager';
import { Tournament } from '../types';

const App: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    const handleOpenTournamentForm = () => {
        setModalContent(
            <TournamentForm
                onAddTournament={handleAddTournament}
            />
        );
        setModalOpen(true);
    };

    const handleAddTournament = (tournament: Tournament) => {
        // Add logic for adding the tournament
        console.log('Add Tournament:', tournament);
    };

    const handleShowSuccessPopup = (status: boolean) => {
        // Add logic for showing success popup
        console.log('Show Success Popup:', status);
    };

    const handleOpenTournamentList = () => {
        setModalContent(<TournamentList onClose={handleCloseModal} />);
        setModalOpen(true);
    };

    const handleOpenFighterManager = () => {
        setModalContent(<FighterManager />);
        setModalOpen(true);
    };

    const handleOpenFighterList = () => {
        setModalContent(<FighterList onDeleteFighter={handleDeleteFighter} />);
        setModalOpen(true);
    };

    const handleDeleteFighter = (fighterId: number) => {
        // Add logic for deleting the fighter
        console.log('Delete Fighter:', fighterId);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Router>
            <div className="container">
                <AppRoutes
                    onOpenTournamentForm={handleOpenTournamentForm}
                    onOpenFighterManager={handleOpenFighterManager}
                    onOpenFighterList={handleOpenFighterList}
                    onOpenTournamentList={handleOpenTournamentList}
                />
                {modalOpen && (
                    <Modal onClose={handleCloseModal}>
                        {modalContent}
                    </Modal>
                )}
            </div>
        </Router>
    );
};

export default App;

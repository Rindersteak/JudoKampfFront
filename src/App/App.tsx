import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../Routes/Routes';
import Modal from '../Tools/Modal/Modal';
import TournamentList from '../Pages/Tournament/TournamentList/TournamentList';
import TournamentForm from '../Pages/Tournament/TournamentForm/TournamentForm';
import FighterList from '../Pages/Fighter/FighterList/FighterList'
import FighterManager from '../Pages/Fighter/FighterManager/FighterManager';
import { Tournament } from '../types';
import ClubManager from '../Pages/Club/ClubManager/ClubManager';
import ClubList from '../Pages/Club/ClubList/ClubList';

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

    const handleOpenClubList = () => {
        setModalContent(<ClubList onDeleteClub={handleDeleteClub} />);
        setModalOpen(true);
    };

    const handleDeleteClub = (clubID: number) => {
        // Add logic for deleting the fighter
        console.log('Delete Club:', clubID);
    };

    const handleDeleteFighter = (fighterId: number) => {
        // Add logic for deleting the fighter
        console.log('Delete Fighter:', fighterId);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOpenClubManager = () => {
        setModalContent(<ClubManager />);
        setModalOpen(true);
    };

    return (
        <Router>
            <div className="container">
                <AppRoutes
                    onOpenTournamentForm={handleOpenTournamentForm}
                    onOpenFighterManager={handleOpenFighterManager}
                    onOpenFighterList={handleOpenFighterList}
                    onOpenTournamentList={handleOpenTournamentList}
                    onOpenClubList={handleOpenClubList}
                    onOpenClubManager={handleOpenClubManager}
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

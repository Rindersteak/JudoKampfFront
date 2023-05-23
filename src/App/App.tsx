// App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../Routes/Routes';
import Modal from '../Modal/Modal';
import TournamentList from '../Pages/TournamentList/TournamentList';
import TournamentForm from '../Pages/TournamentForm/TournamentForm';
import FighterList from '../Pages/FighterList/FighterList'
import FighterManager from '../Pages/FighterManager/FighterManager';


const App: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    const handleOpenTournamentForm = () => {
        setModalContent(<TournamentForm />);
        setModalOpen(true);
    };

    const handleOpenTournamentList = () => {
        setModalContent(<TournamentList />);
        setModalOpen(true);
    };

    const handleOpenFighterManager = () => {
        setModalContent(<FighterManager />);
        setModalOpen(true);
    };

    const handleOpenFighterList = () => {
        setModalContent(<FighterList />);
        setModalOpen(true);
    };

    return (
        <Router>
            <div className="container">
                <AppRoutes onOpenTournamentForm={handleOpenTournamentForm} onOpenFighterManager={handleOpenFighterManager} onOpenFighterList={handleOpenFighterList}/>
                {modalOpen &&
                    <Modal onClose={() => setModalOpen(false)}>
                        {modalContent}
                    </Modal>
                }
            </div>
        </Router>
    );
};

export default App;

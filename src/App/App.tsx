// App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../Routes/Routes';
import Modal from '../Modal/Modal';
import TournamentForm from '../Pages/TournamentForm/TournamentForm';
import FighterManager from '../Pages/FighterManager/FighterManager';

const App: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    const handleOpenTournamentForm = () => {
        setModalContent(<TournamentForm />);
        setModalOpen(true);
    };

    const handleOpenFighterManager = () => {
        setModalContent(<FighterManager />);
        setModalOpen(true);
    };

    return (
        <Router>
            <div className="container">
                <AppRoutes onOpenTournamentForm={handleOpenTournamentForm} onOpenFighterManager={handleOpenFighterManager} />
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

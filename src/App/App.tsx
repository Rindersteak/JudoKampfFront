import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import FighterManager from '../Pages/FighterManager/FighterManager';
import SelectedTournament from '../selectedTournament';
import Modal from '../Modal/Modal';
import './App.css';

const App: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenFighterManager = () => {
        setModalOpen(true);
    };

    return (
        <Router>
            <div className="container">
                    <Routes>
                        <Route path="/" element={<HomePage onOpenFighterManager={handleOpenFighterManager} />} />
                        <Route path="/selected-tournament" element={<SelectedTournament />} />
                    </Routes>
                    {modalOpen &&
                        <Modal onClose={() => setModalOpen(false)}>
                            <FighterManager />
                        </Modal>
                    }
                </div>
        </Router>
    );
};

export default App;
import React, { CSSProperties } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import ParticipantManager from '../ParticipantManager/ParticipantManager';
import SelectedTournament from '../selectedTournament';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="container">
                <div className="content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/participant-manager" element={<ParticipantManager />} />
                        <Route path="/selected-tournament" element={<SelectedTournament />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;

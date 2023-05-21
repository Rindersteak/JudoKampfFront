// Routes.tsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import TournamentForm from '../Pages/TournamentForm/TournamentForm';
import FighterManager from '../Pages/FighterManager/FighterManager';
import TournamentDetails from '../Pages/TournamentDetails/TournamentDetails';

interface AppRoutesProps {
    onOpenTournamentForm: () => void;   
    onOpenFighterManager: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ onOpenTournamentForm, onOpenFighterManager }) => (
    <Routes>
        <Route path="/" element={<HomePage onOpenTournamentForm={onOpenTournamentForm} onOpenFighterManager={onOpenFighterManager} />} />
        <Route path="/tournament-form" element={<TournamentForm />} />
        <Route path="/fighter-manager" element={<FighterManager />} />
        <Route path="/tournament-details" element={<TournamentDetails />} />
    </Routes>
);

export default AppRoutes;

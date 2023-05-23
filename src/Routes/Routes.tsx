// Routes.tsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import TournamentForm from '../Pages/TournamentForm/TournamentForm';
import FighterList from '../Pages/FighterList/FighterList'
import FighterManager from '../Pages/FighterManager/FighterManager';
import TournamentDetails from '../Pages/TournamentDetails/TournamentDetails';
import TournamentList from '../Pages/TournamentList/TournamentList';

interface AppRoutesProps {
    onOpenTournamentForm: () => void;   
    onOpenFighterManager: () => void;
    onOpenFighterList: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ onOpenTournamentForm, onOpenFighterManager }) => (
    <Routes>
        <Route path="/" element={<HomePage onOpenTournamentForm={onOpenTournamentForm} onOpenFighterManager={onOpenFighterManager} />} />
        <Route path="/tournament-form" element={<TournamentForm />} />
        <Route path="/fighter-manager" element={<FighterManager />} />
        <Route path="/fighter-list" element={<FighterList />} />
        <Route path="/tournament-details" element={<TournamentDetails />} />
        <Route path="/tournament-list" element={<TournamentList />} />
    </Routes>
);

export default AppRoutes;

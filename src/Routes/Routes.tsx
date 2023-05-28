import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import TournamentForm from '../Pages/TournamentForm/TournamentForm';
import FighterList from '../Pages/FighterList/FighterList';
import FighterManager from '../Pages/FighterManager/FighterManager';
import TournamentDetails from '../Pages/TournamentDetails/TournamentDetails';
import TournamentList from '../Pages/TournamentList/TournamentList';
import ClubList from '../Pages/Club/ClubList/ClubList'

interface AppRoutesProps {
    onOpenTournamentForm: () => void;
    onOpenFighterManager: () => void;
    onOpenFighterList: () => void;
    onOpenTournamentList: () => void;
    onOpenClubManager: () => void;
    onOpenClubList: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
    onOpenTournamentForm,
    onOpenFighterManager,
    onOpenFighterList,
    onOpenClubManager,
    onOpenTournamentList,
    onOpenClubList
}) => (
    <Routes>
        <Route
            path="/"
            element={<HomePage
                onOpenTournamentForm={onOpenTournamentForm}
                onOpenFighterManager={onOpenFighterManager}
                onOpenTournamentList={onOpenTournamentList}
            />}
        />
        <Route path="/tournament-form" element={<TournamentForm onAddTournament={onOpenTournamentForm} />} />
        <Route
            path="/fighter-manager"
            element={<FighterManager />}
        />
        <Route
            path="/fighter-list"
            element={<FighterList onDeleteFighter={() => {}} />} // Füge hier das onDeleteFighter-Prop hinzu
        />
        <Route
            path="/tournament-details/:tournamentId"
            element={
                <TournamentDetails
                    onOpenFighterList={onOpenFighterList}
                    onOpenFighterManager={onOpenFighterManager}
                    onOpenClubManager={onOpenClubManager}
                    onOpenClubList={onOpenClubList}
                />
            }
        />
        <Route path="/tournament-list" element={<TournamentList onClose={onOpenTournamentList} />} />
        <Route path="/club-list" element={<ClubList onDeleteClub={() => {}}/>} />
    </Routes>
);

export default AppRoutes;

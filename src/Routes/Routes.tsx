import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import TournamentForm from '../Pages//Tournament/TournamentForm/TournamentForm';
import FighterList from '../Pages/Fighter/FighterList/FighterList';
import FighterManager from '../Pages/Fighter/FighterManager/FighterManager';
import TournamentDetails from '../Pages/Tournament/TournamentDetails/TournamentDetails';
import TournamentList from '../Pages/Tournament/TournamentList/TournamentList';
import ClubList from '../Pages/Club/ClubList/ClubList'
import FighterDetails from '../Pages/Fight/FightDetails/FightDetails'

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
                onLogoClick={() => {}} 
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
        <Route path="/fighter-details" element={<FighterDetails/>} />
    </Routes>
);

export default AppRoutes;

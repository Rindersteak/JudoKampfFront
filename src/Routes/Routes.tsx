import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import TournamentForm from '../Pages/Tournament/TournamentForm/TournamentForm';
import FighterList from '../Pages/Fighter/FighterList/FighterList';
import FighterManager from '../Pages/Fighter/FighterManager/FighterManager';
import TournamentDetails from '../Pages/Tournament/TournamentDetails/TournamentDetails';
import TournamentList from '../Pages/Tournament/TournamentList/TournamentList';
import ClubList from '../Pages/Club/ClubList/ClubList'
import FightDetails from '../Pages/Fight/FightDetails/FightDetails'
import TournamentEdit from '../Pages/Tournament/TournamentEdit/TournamentEdit';
import TreeForTwo from '../Pages/Tournament/TournamentTree/TournamentTrees/TreeForTwo';
import FightGroupList from '../Pages/FightGroup/FightGroupList';

interface AppRoutesProps {
  onOpenTournamentForm: () => void;
  onOpenFighterManager: () => void;
  onOpenFighterList: () => void;
  onOpenFightGroupList: (tournamentId: string) => void; // Ändere den Typ hier entsprechend der Anforderungen
  onOpenTournamentList: () => void;
  onOpenClubManager: () => void;
  onOpenClubList: () => void;
  onOpenTournamentEdit: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  onOpenTournamentForm,
  onOpenFighterManager,
  onOpenFighterList,
  onOpenFightGroupList,
  onOpenTournamentList,
  onOpenClubManager,
  onOpenClubList,
  onOpenTournamentEdit
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
                    onOpenTournamentEdit={onOpenTournamentEdit}
                />
            }
        />
        <Route path="/tournament-list" element={<TournamentList onClose={onOpenTournamentList} />} />
        <Route path="/club-list" element={<ClubList onDeleteClub={() => {}}/>} />
        <Route path="/fight-details" element={<FightDetails/>} />
        <Route path="/fight-group-list" element={<FightGroupList />} />
        <Route
  path="/tournament-tree-for-two"
  element={<TreeForTwo fightgroupId={1} bannerTitle="Example Title" />}
/>


  </Routes>
);

export default AppRoutes;

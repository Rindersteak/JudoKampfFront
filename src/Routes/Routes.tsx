import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import TournamentForm from "../Pages/Tournament/TournamentForm/TournamentForm";
import FighterList from "../Pages/Fighter/FighterList/FighterList";
import FighterManager from "../Pages/Fighter/FighterManager/FighterManager";
import { Tournament, Fight } from "../types";
import TournamentDetails from "../Pages/Tournament/TournamentDetails/TournamentDetails";
import TournamentList from "../Pages/Tournament/TournamentList/TournamentList";
import ClubList from "../Pages/Club/ClubList/ClubList";
import FightDetails from "../Pages/Fight/FightDetails/FightDetails";
import TournamentEdit from "../Pages/Tournament/TournamentEdit/TournamentEdit";
import TreeForTwo from "../Pages/Tournament/TournamentTree/TournamentTrees/TreeForTwo";
import FightGroupList from "../Pages/FightGroup/FightGroupList";
import Spielwiese from "./Spielwiese";

interface AppRoutesProps {
  onOpenTournamentForm: () => void;
  onOpenFighterManager: (tournamentId: string) => void;
  onOpenFighterList: (tournamentId: string) => void;
  onOpenFightGroupList: (tournamentId: string) => void;
  onOpenTournamentList: () => void;
  onOpenClubManager: () => void;
  onOpenClubList: () => void;
  onOpenTournamentEdit: () => void;
  fights: Fight[];
}

const FighterListWrapper = () => {
  const { tournamentId = "defaultTournamentId" } = useParams();

  return <FighterList onDeleteFighter={() => {}} tournamentId={tournamentId} />;
};

const AppRoutes: React.FC<AppRoutesProps> = ({
  onOpenTournamentForm,
  onOpenFighterManager,
  onOpenFighterList,
  onOpenFightGroupList,
  onOpenTournamentList,
  onOpenClubManager,
  onOpenClubList,
  onOpenTournamentEdit,
  fights,
}) => (
  <Routes>
    <Route
      path="/"
      element={
        <HomePage
          onOpenTournamentForm={onOpenTournamentForm}
          onOpenTournamentList={onOpenTournamentList}
          onLogoClick={() => {}}
        />
      }
    />
    <Route
      path="/tournament-form"
      element={<TournamentForm onAddTournament={onOpenTournamentForm} />}
    />

    <Route
      path="/tournament-details/:tournamentId"
      element={
        <TournamentDetails
          onOpenFighterList={onOpenFighterList}
          onOpenFighterManager={onOpenFighterManager}
          onOpenFightGroupList={onOpenFightGroupList}
          onOpenClubManager={onOpenClubManager}
          onOpenClubList={onOpenClubList}
          onOpenTournamentEdit={onOpenTournamentEdit}
        />
      }
    />
    <Route
      path="/tournament-list"
      element={<TournamentList onClose={onOpenTournamentList} />}
    />
    <Route path="/club-list" element={<ClubList onDeleteClub={() => {}} />} />
    <Route path="/fight-details" element={<FightDetails />} />
    {fights.map((fight: Fight, index: number) => (
      <Route
        key={index}
        path={`/tournament-tree/${fight.id}`}
        element={getFightTreeComponent(fight)}
      />
    ))}
    <Route path="/Spielwiese" element={<Spielwiese />} />
  </Routes>
);

const getFightTreeComponent = (fight: Fight) => {
  const participants = fight.fightGroup.fighters.length;
  if (participants === 2) {
    return <TreeForTwo fightgroupId={fight.fightGroup.id} />;
  } else if (participants === 3) {
    // Hier sollte die Komponente für Kämpfe mit drei Teilnehmern eingefügt werden
  } else {
    // Hier sollte die Komponente für Kämpfe mit mehr als drei Teilnehmern eingefügt werden
  }
};

export default AppRoutes;

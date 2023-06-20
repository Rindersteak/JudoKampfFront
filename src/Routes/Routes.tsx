import React, { useEffect } from 'react';
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import TournamentForm from '../Pages/Tournament/TournamentForm/TournamentForm';
import FighterList from '../Pages/Fighter/FighterList/FighterList';
import FighterManager from '../Pages/Fighter/FighterManager/FighterManager';
import { Tournament, Fight, Fightgroup } from '../types';
import TournamentDetails from '../Pages/Tournament/TournamentDetails/TournamentDetails';
import TournamentList from '../Pages/Tournament/TournamentList/TournamentList';
import ClubList from '../Pages/Club/ClubList/ClubList';
import FightDetails from '../Pages/Fight/FightDetails/FightDetails';
import TournamentEdit from '../Pages/Tournament/TournamentEdit/TournamentEdit';
import TreeForTwo from '../Pages/Tournament/TournamentTree/TournamentTrees/TreeForTwo';
import FightGroupList from '../Pages/FightGroup/FightGroupList';
import Spielwiese from './Spielwiese';
import { getFightTreeComponent } from '../Tools/FightTree/FightTreeComponents';
import TreeForNone from '../Pages/Tournament/TournamentTree/TournamentTrees/TreeForNone';
import TreeForThreeToSix from '../Pages/Tournament/TournamentTree/TournamentTrees/TreeForThreeToSix';
import TreeForSevenToEight from '../Pages/Tournament/TournamentTree/TournamentTrees/TreeForSevenToEight';
import TreeForMoreThanEight from '../Pages/Tournament/TournamentTree/TournamentTrees/TreeForMoreThanEight';

interface AppRoutesProps {
  onOpenTournamentForm: () => void;
  onOpenFighterManager: (tournamentId: string) => void;
  onOpenFighterList: (tournamentId: string) => void;
  onOpenFightGroupList: (tournamentId: string) => void;
  onOpenTournamentList: () => void;
  onOpenClubManager: () => void;
  onOpenClubList: () => void;
  onOpenTournamentEdit: () => void;
  onOpenTreeForSix: (fightgroupId: string) => void;
  fights: Fight[];
}



const TreeForTwoWrapper = () => {
  const { fightgroupId } = useParams();
  // Convert to number
  const fightgroupIdNumber = fightgroupId ? Number(fightgroupId) : undefined;

  // Conditional rendering
  if (fightgroupIdNumber === undefined) {
    return <div>Error: No fight group ID provided</div>;
  }

  return <TreeForTwo fightgroupId={fightgroupIdNumber} />;
};

const TreeForThreeToSixWrapper = ({ onOpenTreeForSix }: { onOpenTreeForSix: (fightgroupId: string) => void }) => {
  const { fightgroupId } = useParams<{ fightgroupId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (fightgroupId) {
      onOpenTreeForSix(fightgroupId);
    } else {
      navigate('/'); // Handle the case when no fightgroupId is provided
    }
  }, [fightgroupId, navigate, onOpenTreeForSix]);

  return null; // Return null or a placeholder component if needed
};

const FighterListWrapper = () => {
  const { tournamentId = 'defaultTournamentId' } = useParams();

  return <FighterList onDeleteFighter={() => {}} tournamentId={tournamentId} />;
};

const handleOpenTreeForSix = (fightgroupId: string) => {
  console.log('Open TreeForThreeToSix:', fightgroupId);
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
  onOpenTreeForSix = handleOpenTreeForSix,
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
    <Route path="/tournament-form" element={<TournamentForm onAddTournament={onOpenTournamentForm} />} />
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
    <Route path="/tournament-list" element={<TournamentList onClose={onOpenTournamentList} />} />
    <Route path="/club-list" element={<ClubList onDeleteClub={() => {}} />} />
    <Route path="/fight-details" element={<FightDetails />} />
    {fights.map((fight: Fight, index: number) => (
      <Route key={index} path={`/tournament-tree/${fight.id}`} />
    ))}
    <Route path="/Spielwiese" element={<Spielwiese />} />
    <Route path="/tree-for-none" element={<TreeForNone />} />
    <Route path="/tree-for-two" element={<TreeForTwoWrapper />} />
    <Route
      path="/tree-for-three-to-six/:fightgroupId"
      element={<TreeForThreeToSixWrapper onOpenTreeForSix={handleOpenTreeForSix} />} 
    />
    <Route path="/tree-for-seven-to-eight" element={<TreeForSevenToEight />} />
    <Route path="/tree-for-more-than-eight" element={<TreeForMoreThanEight />} />
  </Routes>
);

export default AppRoutes;

import React, { useEffect } from 'react';
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import TournamentForm from '../Pages/Tournament/TournamentForm/TournamentForm';
import FighterList from '../Pages/Fighter/FighterList/FighterList';
import FighterManager from '../Pages/Fighter/FighterManager/FighterManager';
import { Tournament, Fight, Fightgroup, Fightpool } from '../types';
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
  onOpenFighterManager: (tournamentId: string) => Promise<void>;
  onOpenFighterList: (tournamentId: string) => Promise<void>;
  onOpenFightGroupList: (tournamentId: string) => Promise<void>;
  onOpenTournamentList: () => void;
  onOpenClubList: () => void;
  onOpenClubManager: () => void;
  onOpenTournamentEdit: () => void;
  onOpenTreeForTwo: (fightgroupId: string) => void;
  onOpenTreeForSix: (fightgroupId: string) => void;
  onOpenTreeForSevenToEight: (fightgroupId: string) => void;
  fightpool: Fight[];
}



// Tree Wrappers

const TreeForNoneWrapper = () => {
  const { fightgroupId } = useParams();
  // Convert to number
  const fightgroupIdNumber = fightgroupId ? Number(fightgroupId) : undefined;

  // Conditional rendering
  if (fightgroupIdNumber === undefined) {
    return <div>Error: No fight group ID provided</div>;
  }

  return <TreeForNone fightgroupId={fightgroupIdNumber} />;
};

const TreeForTwoWrapper = ({ onOpenTreeForTwo }: { onOpenTreeForTwo: (fightgroupId: string) => void }) => {
  const { fightgroupId } = useParams<{ fightgroupId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (fightgroupId) {
      onOpenTreeForTwo(fightgroupId);
    } else {
      navigate('/'); // Handle the case when no fightgroupId is provided
    }
  }, [fightgroupId, navigate, onOpenTreeForTwo]);

  // If there is a fightgroupId, render TreeForTwo
  if (fightgroupId) {
    return <TreeForTwo fightgroupId={Number(fightgroupId)} />;
  } else {
    console.log('No ID for TreeForTwo');
    console.log(fightgroupId);
  }
  return null; // Return null or a placeholder component if needed
};

const TreeForSevenToEightWrapper = ({ onOpenTreeForSevenToEight }: { onOpenTreeForSevenToEight: (fightgroupId: string) => void }) => {
  const { fightgroupId } = useParams<{ fightgroupId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (fightgroupId) {
      onOpenTreeForSevenToEight(fightgroupId);
    } else {
      navigate('/'); // Handle the case when no fightgroupId is provided
    }
  }, [fightgroupId, navigate, onOpenTreeForSevenToEight]);

  // If there is a fightgroupId, render TreeForSevenToEight
  if (fightgroupId) {
    return <TreeForSevenToEight fightgroupId={Number(fightgroupId)} />;
  } else {
    console.log('No ID for TreeForSevenToEight');
    console.log(fightgroupId);
  }
  return null; // Return null or a placeholder component if needed
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

  // If there is a fightgroupId, render TreeForThreeToSix
  if (fightgroupId) {
    return <TreeForThreeToSix fightgroupId={Number(fightgroupId)} />;
  } else {
    console.log('No ID for TreeForThreeToSix');
    console.log(fightgroupId);
  }
  return null; // Return null or a placeholder component if needed
};

const TreeForMoreThanEightWrapper = () => {
  const { fightgroupId } = useParams();
  // Convert to number
  const fightgroupIdNumber = fightgroupId ? Number(fightgroupId) : undefined;

  // Conditional rendering
  if (fightgroupIdNumber === undefined) {
    return <div>Error: No fight group ID provided</div>;
  }

  return <TreeForMoreThanEight fightgroupId={fightgroupIdNumber} />;
};



const FightDetailsWrapper = () => {
  const { fightId } = useParams();
  // Convert to number
  const fightIdNumber = fightId ? Number(fightId) : undefined;

  // Conditional rendering
  if (fightIdNumber === undefined) {
    return <div>Error: No fight ID provided</div>;
  }

  return <FightDetails fightId={fightIdNumber} />;
};


const FighterListWrapper = () => {
  const { tournamentId = 'defaultTournamentId' } = useParams();

  return <FighterList onDeleteFighter={() => {}} tournamentId={tournamentId} />;
};

const handleOpenTreeForSix = (fightgroupId: string) => {
  console.log('Open TreeForThreeToSix:', fightgroupId);
};

const handleOpenTreeForTwo = (fightgroupId: string) => {
  console.log('Open TreeForTwo:', fightgroupId);
};

const handleOpenTreeForSevenToEight = (fightgroupId: string) => {
  console.log('Open TreeForSevenToEight:', fightgroupId);
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
    fightpool,
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
    <Route path="/fight-details/:fightId" element={<FightDetailsWrapper />} />
    {fightpool.map((fight: Fight, index: number) => (
      <Route key={index} path={`/tournament-tree/${fight.id}`} />
    ))}
    <Route path="/Spielwiese" element={<Spielwiese />} />
    <Route path="/tree-for-none" element={<TreeForNoneWrapper />} />
    <Route
        path="/tree-for-two/:fightgroupId"
        element={<TreeForTwoWrapper onOpenTreeForTwo={handleOpenTreeForTwo} />}
    />

    <Route
  path="/tree-for-three-to-six/:fightgroupId"
  element={<TreeForThreeToSixWrapper onOpenTreeForSix={handleOpenTreeForSix} />}
/>
    <Route
        path="/tree-for-seven-to-eight/:fightgroupId"
        element={<TreeForSevenToEightWrapper onOpenTreeForSevenToEight={handleOpenTreeForSevenToEight} />}
    />
<Route path="/tree-for-more-than-eight" element={<TreeForMoreThanEightWrapper />} />
  </Routes>
);

export default AppRoutes;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate } from 'react-router-dom';
import AppRoutes from '../Routes/Routes';
import Modal from '../Tools/Modal/Modal';
import TournamentList from '../Pages/Tournament/TournamentList/TournamentList';
import TournamentForm from '../Pages/Tournament/TournamentForm/TournamentForm';
import FighterList from '../Pages/Fighter/FighterList/FighterList';
import FighterManager from '../Pages/Fighter/FighterManager/FighterManager';
import { Tournament, Fight, Fightgroup, Fightpool } from '../types';
import ClubManager from '../Pages/Club/ClubManager/ClubManager';
import ClubList from '../Pages/Club/ClubList/ClubList';
import TournamentEdit from '../Pages/Tournament/TournamentEdit/TournamentEdit';
import FightGroupList from '../Pages/FightGroup/FightGroupList';
import { getFightList } from '../API/fightAPI';
import TournamentManager from './../Pages/Tournament/TournamentManager/TournamentManager';

const handleOpenTreeForSix = (fightgroupId: string) => {
  console.log('Open TreeForThreeToSix:', fightgroupId);
};

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<React.ReactNode | null>(null);
  const [fights, setFights] = React.useState<Fight[]>([]);
  const [fightgroupId, setFightgroupId] = React.useState<number | undefined>(undefined);

  useEffect(() => {
    async function fetchFightList() {
      try {
        if (fightgroupId !== undefined) {
          const fightList = await getFightList(fightgroupId);
          setFights(fightList);
        }
      } catch (error) {
        console.error('Error fetching fight list:', error);
      }
    }

    fetchFightList();
  }, [fightgroupId]);

  const handleOpenTournamentForm = () => {
    setModalContent(<TournamentForm onAddTournament={handleAddTournament} />);
    setModalOpen(true);
  };

  const handleAddTournament = (tournament: Tournament) => {
    console.log('Add Tournament:', tournament);
  };

  const handleOpenTournamentList = () => {
    setModalContent(<TournamentList onClose={handleCloseModal} />);
    setModalOpen(true);
  };

  const handleOpenFighterManager = async (tournamentId: string) => {
    if (tournamentId !== undefined) {
      setModalContent(
        <FighterManager tournamentId={tournamentId} onClose={handleCloseModal} />
      );
      setModalOpen(true);
    }
  };

  const handleOpenFighterList = async (tournamentId: string) => {
    try {
      setModalContent(
        <FighterList tournamentId={tournamentId} onDeleteFighter={handleDeleteFighter} />
      );
      setModalOpen(true);
    } catch (error) {
      console.error('Error loading fighter List by ID:', error);
    }
  };

  const handleOpenFightGroupList = async (tournamentId: string) => {
    try {
      setModalContent(<FightGroupList tournamentId={tournamentId} onClose={handleCloseModal} />);
      setModalOpen(true);
    } catch (error) {
      console.error('Error loading fight groups by tournament ID:', error);
    }
  };

  const handleOpenClubList = () => {
    setModalContent(<ClubList onDeleteClub={handleDeleteClub} />);
    setModalOpen(true);
  };

  const handleDeleteClub = (clubID: number) => {
    console.log('Delete Club:', clubID);
  };

  const handleDeleteFighter = (fighterId: number) => {
    console.log('Delete Fighter:', fighterId);
  };

  const handleDeleteTournament = (tournamentId: number) => {
    console.log('Delete Tournament:', tournamentId);
  };

  const handleUpdateTournament = (tournamentId: Tournament) => {
    console.log('Update Tournament:', tournamentId);
  };

  const handleOpenTreeForThreeToSix = (fightgroupId: string) => {
    handleOpenTreeForSix(fightgroupId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenClubManager = () => {
    setModalContent(<ClubManager />);
    setModalOpen(true);
  };

  const handleOpenTournamentEdit = () => {
    setModalContent(<TournamentManager />);
    setModalOpen(true);
  };

  return (
    <Router>
      <div className="container">
        <AppRoutes
          onOpenTournamentForm={handleOpenTournamentForm}
          onOpenFighterManager={handleOpenFighterManager}
          onOpenFighterList={handleOpenFighterList}
          onOpenFightGroupList={handleOpenFightGroupList}
          onOpenTournamentList={handleOpenTournamentList}
          onOpenClubList={handleOpenClubList}
          onOpenClubManager={handleOpenClubManager}
          onOpenTournamentEdit={handleOpenTournamentEdit}
          onOpenTreeForSix={handleOpenTreeForThreeToSix}
          fightpool={fights}
        />
      </div>
      {modalOpen && (
        <Modal onClose={handleCloseModal}>
          {modalContent}
        </Modal>
      )}
    </Router>
  );
};

export default App;

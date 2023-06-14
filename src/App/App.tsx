import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../Routes/Routes";
import Modal from "../Tools/Modal/Modal";
import TournamentList from "../Pages/Tournament/TournamentList/TournamentList";
import TournamentForm from "../Pages/Tournament/TournamentForm/TournamentForm";
import FighterList from "../Pages/Fighter/FighterList/FighterList";
import FighterManager from "../Pages/Fighter/FighterManager/FighterManager";
import { Tournament, Fight, Fightgroup } from '../types';
import ClubManager from "../Pages/Club/ClubManager/ClubManager";
import ClubList from "../Pages/Club/ClubList/ClubList";
import TournamentEdit from "../Pages/Tournament/TournamentEdit/TournamentEdit";
import FightGroupList from "../Pages/FightGroup/FightGroupList";
import { getFightList } from '../API/fightAPI';
import TournamentManager from "./../Pages/Tournament/TorunamentManager/TournamentManager";

interface TournamentEditProps {
  tournament?: Tournament;
  onUpdateTournament: (tournament: Tournament) => void;
  onDeleteTournament: (tournamentId: string) => void;
}

interface FighterManagerContainerProps {
  tournamentId: string;
  onOpenFighterManager: () => void;
}

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
    const [fights, setFights] = useState<Fight[]>([]);
  const [fightgroupId, setFightgroupId] = useState<number | undefined>(undefined);

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
    setModalContent(
      <TournamentForm
        onAddTournament={handleAddTournament}
      />
    );
    setModalOpen(true);
  };

  const handleAddTournament = (tournament: Tournament) => {
    // Add logic for adding the tournament
    console.log('Add Tournament:', tournament);
  };

  const handleOpenTournamentList = () => {
    setModalContent(<TournamentList onClose={handleCloseModal} />);
    setModalOpen(true);
  };

  const handleOpenFighterManager = async (tournamentId: string) => {
    if (tournamentId !== undefined) {
      setModalContent(<FighterManager tournamentId={tournamentId} onClose={handleCloseModal} />);
      setModalOpen(true);
    }
  };
  
  

  const handleOpenFighterList = async (tournamentId: string) => {
    try {
    setModalContent(<FighterList tournamentId={tournamentId} onDeleteFighter={handleDeleteFighter} />);
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
    // Add logic for deleting the fighter
    console.log('Delete Club:', clubID);
  };

  const handleDeleteFighter = (fighterId: number) => {
    // Add logic for deleting the fighter
    console.log('Delete Fighter:', fighterId);
  };

  const handleDeleteTournament = (tournamentId: number) => {
    // Add logic for deleting the tournament
    console.log('Delete Tournament:', tournamentId);
  };

  const handleUpdateTournament = (tournamentId: Tournament) => {
    // Add logic for updating the tournament
    console.log('Update Tournament:', tournamentId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenClubManager = () => {
    setModalContent(<ClubManager />);
    setModalOpen(true);
  };

  const handleOpenTournamentEdit = () => {
    setModalContent(
      <TournamentManager/>
    );
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
          fights={fights} // Übergebe das fights-Prop hier
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

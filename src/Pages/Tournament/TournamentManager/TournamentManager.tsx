import React, { useState } from 'react';
import Modal from '../../../Tools/Modal/Modal';
import ConfirmDelete from '../../../Tools/ConfirmDelete/ConfirmDelete';
import TournamentEdit from '../TournamentEdit/TournamentEdit';
import TournamentRules from '../TournamentRules/TournamentRules';
import '../TournamentRules/TournamentRules.scss';
import './TournamentManager.scss';
import '../../../Styles/GlobalStyles.scss';
import { Tournament } from '../../../types';

const TournamentManager: React.FC = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [fighterIdToDelete, setFighterToDelete] = useState<number | null>(null);
  const [listKey, setListKey] = useState(Math.random());

  const handleSuccessPopup = (status: boolean) => {
    setShowSuccessPopup(status);
    if (status) {
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      setListKey(Math.random());
    }
  };

  return (
    <div className='innerContainerScrollbar'>
      <div className='tournamentManagerContainer'>
        <div className='tournamentEditContainer'>
          <TournamentEdit
            onUpdateTournament={(tournament:Tournament) => {}}
            onDeleteTournament={(tournamentId: number) => {}}
          />
        </div>
        <div className='tournamentEditContainer'>
          <TournamentRules />
        </div>
        <div className='tournamentButtonsContainer'>
          {/* Add your update and delete buttons here */}
        </div>
      </div>
    </div>
  );
};

export default TournamentManager;

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
      <div className='tournamentManagerContainer'>
        <div className='tournamentEditContainer'>
          <TournamentEdit
            onUpdateTournament={(tournament:Tournament) => {}}
            onDeleteTournament={(tournamentId: number) => {}}
          />
        </div>
        <div className='tournamentRulesContainer'>
          <TournamentRules />
        </div>
        
      <div className='tournamentButtonsContainer'>
        <div className='buttonSectionTournamentEdit'>
        <button className="blueButton" type="submit" >
         Änderung speichern!
        </button>
        {showSuccessPopup && (
                <div className="successPopup">
                    Turnier wurde erfolgreich aktualisiert!
                </div>
            )}
        <button className="redButton" type="button" >
          Turnier löschen
        </button>
      </div>
    </div>
    </div>
  );
};

export default TournamentManager;

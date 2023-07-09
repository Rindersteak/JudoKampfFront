// Manager vereinen Form und List (Erstellen und Liste)

import React, { useState } from "react";
import FighterForm from "../FighterForm/FighterForm";
import FighterList, { deleteFighterHandler } from "../FighterList/FighterList";
import Modal from "../../../Tools/Modal/Modal";
import ConfirmDelete from "../../../Tools/ConfirmDelete/ConfirmDelete";
import "./FighterManager.scss";
import "../../../Styles/GlobalStyles.scss";

interface FighterManagerProps {
  tournamentId: string;
  onClose: () => void;
}

const FighterManager: React.FC<FighterManagerProps> = ({
  tournamentId,
  onClose,
}) => {
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

  const handleConfirmDelete = (fighterId: number) => {
    setShowConfirmDeletePopup(true);
    setFighterToDelete(fighterId);
  };

  const handleDeleteConfirmed = async () => {
    if (fighterIdToDelete !== null) {
      await deleteFighterHandler(fighterIdToDelete);
      setShowConfirmDeletePopup(false);
      setListKey(Math.random());
    }
  };

  const handleDeleteCanceled = () => {
    setShowConfirmDeletePopup(false);
  };

  console.log("Tournament ManagerID:", tournamentId);
  return (
    <div className="innerContainerScrollbar">
      <div className="innerContainer">
        <FighterForm
          tournamentId={tournamentId}
          onShowSuccessPopup={handleSuccessPopup}
        />
        <div className="listSection">
          <h1 className="titleStyleList">Teilnehmerliste</h1>
          <FighterList
            tournamentId={tournamentId}
            key={listKey}
            detailedView={false}
            onDeleteFighter={handleConfirmDelete}
          />
        </div>
        {showSuccessPopup && (
          <div className="successPopup">Eintrag erfolgreich hinzugefügt!</div>
        )}
        {showConfirmDeletePopup && fighterIdToDelete !== null && (
          <Modal size="small" onClose={handleDeleteCanceled}>
            <ConfirmDelete
              onClose={handleDeleteCanceled}
              onConfirmDelete={handleDeleteConfirmed}
              idToDelete={fighterIdToDelete}
              text="Möchten Sie den Eintrag wirklich löschen?"
              subTextAvailable = {false}
              topButtonClassName="#b40000"
              bottomButtonClassName="#001aff"
              buttonTextBlue="Nein, behalten"
              buttonTextRed="Ja, löschen"
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default FighterManager;

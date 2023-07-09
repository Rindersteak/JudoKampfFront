// Manager vereinen Form und List (Erstellen und Liste)

import React, { useState } from "react";
import "../../../Styles/GlobalStyles.scss";
import "./TournamentManager.scss";
import TournamentEdit from "../TournamentEdit/TournamentEdit";
import RulesEdit from "../../Rules/RulesEdit/RulesEdit";
import { Tournament } from "../../../types";

const FighterManager: React.FC = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [listKey, setListKey] = useState(Math.random());
  const [loading, setLoading] = useState(false);
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);

  const handleSuccessPopup = (status: boolean) => {
    setShowSuccessPopup(status);
    if (status) {
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      setListKey(Math.random());
    }
  };

  const handleDelete = async () => {
    setShowConfirmDeletePopup(true);
  };

  interface TournamentEditProps {
    tournament?: Tournament;
    onUpdateTournament: (tournament: Tournament) => void;
    onDeleteTournament: (tournamentId: string) => void;
  }

  const handleUpdateTournament = (tournamentId: Tournament) => {
    // Add logic for updating the tournament
    console.log("Update Tournament:", tournamentId);
  };

  return (
    <div className="innerContainerScrollbar">
      <div className="innerContainer">
        <TournamentEdit
          onUpdateTournament={function (tournament: Tournament): void {
            throw new Error("Function not implemented.");
          }}
          onDeleteTournament={function (tournamentId: number): void {
            throw new Error("Function not implemented.");
          }}
        />
        <RulesEdit />
      </div>
      <div className="buttonSectionTournamentEdit">
        <div className="buttonContainerTournamentManager">
          <button className="blueButton" type="submit" disabled={loading}>
            {loading ? "Laden..." : "Änderung speichern"}
          </button>
          {showSuccessPopup && (
            <div className="successPopup">
              Turnier wurde erfolgreich aktualisiert!
            </div>
          )}
          <button className="redButton" type="button" onClick={handleDelete}>
            Turnier löschen
          </button>
        </div>
      </div>
    </div>
  );
};

export default FighterManager;

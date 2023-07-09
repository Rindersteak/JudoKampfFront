// Manager vereinen Form und List (Erstellen und Liste)

import React, { useState } from "react";
import "../../../Styles/GlobalStyles.scss";
import "./TournamentManager.scss";
import { useLocation } from "react-router-dom";
import Modal from "../../../Tools/Modal/Modal";
import ConfirmDelete from "../../../Tools/ConfirmDelete/ConfirmDelete";
import TournamentEdit from "../TournamentEdit/TournamentEdit";
import RulesEdit from "../../Rules/RulesEdit/RulesEdit";
import { Tournament } from "../../../types";
import { deleteTournament } from  "../../../API/tournamentAPI"; // Import the deleteTournament function from your API file


const TournamentManager: React.FC = () => {
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

  const handleDeleteCanceled = () => {
    setShowConfirmDeletePopup(false);
  };


  const location = useLocation(); // get current URL
  const tournamentId = location.pathname.split("/").pop();

const handleDeleteInitial =async () => {
  setShowConfirmDeletePopup(true);
  //console.log("Jumped in inital")

}

  const handleDelete = async () => {
    setShowConfirmDeletePopup(true);
    //console.log("Jumped in")
    try {
      //console.log("in try")
      // Make the API call to delete the tournament
      await deleteTournament(Number(tournamentId)); // Replace `tournamentId` with the actual ID of the tournament you want to delete
     // console.log("after delete")

      // Handle the success case
      handleSuccessPopup(true);

    } catch (error) {
      // Handle the error case
      console.error("An error occurred while deleting the tournament:", error);
    }
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
          <button className="redButton" type="button" onClick={handleDeleteInitial}>
            Turnier löschen
          </button>
          {showConfirmDeletePopup && tournamentId !== null && (
          <Modal size="small" onClose={handleDeleteCanceled}>
          <ConfirmDelete
            onClose={handleDeleteCanceled}
            onConfirmDelete={handleDelete}
            text="Möchten Sie den Eintrag wirklich löschen?"
            idToDelete={Number(tournamentId)}
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
    </div>


  );
};

export default TournamentManager;

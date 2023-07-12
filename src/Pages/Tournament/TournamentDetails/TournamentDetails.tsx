import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTournaments, createFightgroups } from "../../../API/tournamentAPI";
import "./TournamentDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./../../../Tools/Modal/Modal";
import {
  faClipboardList,
  faGear,
  faPlus,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { Tournament } from "../../../types";
import Banner from "../../../Tools/Banner/Banner";
import ConfirmDelete from "../../../Tools/ConfirmDelete/ConfirmDelete";

// Definition der Eigenschaften für die TournamentDetails-Komponente
interface TournamentDetailsProps {
  onOpenFighterList: (tournamentId: string) => void;
  onOpenFighterManager: (tournamentId: string) => void;
  onOpenClubManager: () => void;
  onOpenClubList: () => void;
  onOpenTournamentEdit: (tournamentId: string) => void;
  onOpenFightGroupList: (tournamentId: string) => void;
}

// Hauptkomponente TournamentDetails
const TournamentDetails: React.FC<TournamentDetailsProps> = ({
  onOpenFighterList,
  onOpenFighterManager,
  onOpenClubManager,
  onOpenClubList,
  onOpenTournamentEdit,
  onOpenFightGroupList,
}) => {
  // Hook, um URL-Parameter abzurufen
  const { tournamentId } = useParams<{ tournamentId: string | undefined }>();
  // Setzen der anfänglichen Zustände mit Hooks
  const [backendTournaments, setBackendTournaments] = useState<Tournament[]>(
    []
  );
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [showFightGroupList, setShowFightGroupList] = useState(false); // Neuer Zustand
  const [hasFightGroups, setHasFightGroups] = useState(false);

  // Effekt, der beim Start ausgeführt wird und die Turnierdaten abruft
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const tournaments = await getTournaments();
        setBackendTournaments(tournaments);
        const tournament = getTournamentDetailsById(tournamentId, tournaments);
        setTournament(tournament);

        // Überprüfen, ob das Turnier mindestens eine Kampfgruppe hat
        if (
          tournament &&
          tournament.fightgroups &&
          tournament.fightgroups.length > 0
        ) {
          setHasFightGroups(true);
        } else {
          setHasFightGroups(false);
        }
      } catch (error) {
        console.error("Error loading tournaments:", error);
      }
    };

    fetchTournaments();
  }, [tournamentId]);

  // Funktion zum Abrufen der Turnierdetails anhand der ID
  const getTournamentDetailsById = (
    tournamentId: string | undefined,
    tournaments: Tournament[]
  ): Tournament | null => {
    if (!tournamentId) {
      return null;
    }
    const tournament = tournaments.find((t) => t.id === parseInt(tournamentId));
    return tournament || null;
  };

  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);

  const handleModalClose = () => {
    setShowConfirmDeletePopup(false);
  };

  const handleConfirmed = async () => {
    onOpenFightGroupList(tournamentId || "");
    createFightgroups(tournamentId || "");
    handleModalClose();
  };

  // Render der Komponente
  return (
    <div className="app">
      {/* Banner mit dem Turniernamen und der ID anzeigen */}
      <Banner
        title={`Turnier "${tournament ? tournament.name : ""}"`}
        subtitle={`ID${tournament ? tournament.id : ""}`}
      />
      {/* Für den Edit-Button kann hier einfach der Button aus der Banner.tsx aufgerufen werden */}
      {/* Container für die Karten */}
      <div className="cards-container">
        <CardOne
          hasFightGroups={hasFightGroups}
          setShowConfirmDeletePopup={setShowConfirmDeletePopup}
          onOpenFightGroupList={onOpenFightGroupList}
          tournamentId={tournamentId}
        />

        <CardTwo
          tournamentId={tournamentId || ""}
          onOpenFighterList={onOpenFighterList}
        />
        <CardThree
          tournamentId={tournamentId || ""}
          onOpenFighterManager={onOpenFighterManager}
        />
        <CardFour
          tournamentId={tournamentId || ""}
          onOpenClubList={onOpenClubList}
        />
        <CardFive
          tournamentId={tournamentId || ""}
          onOpenClubManager={onOpenClubManager}
        />
        <CardSix
          tournamentId={tournamentId || ""}
          onOpenTournamentEdit={onOpenTournamentEdit}
        />
      </div>

      {showConfirmDeletePopup && (
        <Modal size="small" onClose={handleModalClose}>
          <ConfirmDelete
            onClose={handleModalClose}
            onConfirmDelete={handleConfirmed}
            text="Möchten Sie die Turniergruppen wirklich erzeugen?"
            subTextAvailable={true}
            subText="Hinweis: Die Teilnehmer werden den Kampfgruppen automatisch zugeordnet. Es können anschießend keine weiteren Teilnehmer hinzugefügt werden!"
            topButtonClassName="#b40000"
            bottomButtonClassName="#001aff"
            buttonTextBlue="Nein, zurück"
            buttonTextRed="Ja, erzeugen"
          />
        </Modal>
      )}
    </div>
  );
};

interface CardOneProps {
  hasFightGroups: boolean;
  setShowConfirmDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenFightGroupList: (tournamentId: string) => void;
  tournamentId: string | undefined;
}

const CardOne: React.FC<CardOneProps> = ({
  hasFightGroups,
  setShowConfirmDeletePopup,
  onOpenFightGroupList,
  tournamentId,
}) => {
  const handleCardOneClick = () => {
    if (!hasFightGroups) {
      setShowConfirmDeletePopup(true);
    } else {
      onOpenFightGroupList(tournamentId || "");
    }
  };

  return (
    <div className="card-one" onClick={handleCardOneClick}>
      <div className="card-content">
        <div className="card-icon-white">
          <FontAwesomeIcon icon={faTrophy} />
        </div>
        <div className="card-text-white">Turniergruppen generieren</div>
      </div>
    </div>
  );
};

const CardTwo = ({
  tournamentId,
  onOpenFighterList,
}: {
  tournamentId: string;
  onOpenFighterList: (tournamentId: string) => void;
}) => {
  const handleCardTwoClick = () => {
    onOpenFighterList(tournamentId);
  };

  console.log("Tournament DetailsID:", tournamentId);

  return (
    <div className="card-two" onClick={handleCardTwoClick}>
      <div className="card-content">
        <div className="card-icon-blue">
          <FontAwesomeIcon icon={faClipboardList} />
        </div>
        <div className="card-text-blue">Teilnehmerliste</div>
      </div>
    </div>
  );
};

const CardThree = ({
  tournamentId,
  onOpenFighterManager,
}: {
  tournamentId: string;
  onOpenFighterManager: (tournamentId: string) => void;
}) => {
  const handleCardThreeClick = () => {
    onOpenFighterManager(tournamentId);
  };

  return (
    <div className="card-three" onClick={handleCardThreeClick}>
      <div className="card-content">
        <div className="card-icon-white">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div className="card-text-white">Teilnehmer</div>
      </div>
    </div>
  );
};

const CardFour = ({
  tournamentId,
  onOpenClubList,
}: {
  tournamentId: string;
  onOpenClubList: () => void;
}) => {
  const handleCardFourClick = () => {
    onOpenClubList();
  };

  return (
    <div className="card-four" onClick={handleCardFourClick}>
      <div className="card-content">
        <div className="card-icon-blue">
          <FontAwesomeIcon icon={faClipboardList} />
        </div>
        <div className="card-text-blue">Vereinsliste</div>
      </div>
    </div>
  );
};

const CardFive = ({
  tournamentId,
  onOpenClubManager,
}: {
  tournamentId: string;
  onOpenClubManager: () => void;
}) => {
  const handleCardFiveClick = () => {
    onOpenClubManager();
  };

  return (
    <div className="card-five" onClick={handleCardFiveClick}>
      <div className="card-content">
        <div className="card-icon-white">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div className="card-text-white">Verein</div>
      </div>
    </div>
  );
};

const CardSix = ({
  tournamentId,
  onOpenTournamentEdit,
}: {
  tournamentId: string;
  onOpenTournamentEdit: (tournamentId: string) => void;
}) => {
  const handleCardSixClick = () => {
    onOpenTournamentEdit(tournamentId);
  };

  return (
    <div className="card-six" onClick={handleCardSixClick}>
      <div className="card-content">
        <div className="card-icon-blue">
          <FontAwesomeIcon icon={faGear} />
        </div>
        <div className="card-text-blue">Turnier/Modus</div>
      </div>
    </div>
  );
};

export default TournamentDetails;

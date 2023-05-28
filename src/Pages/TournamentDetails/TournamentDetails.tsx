import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTournaments, getTotalTournaments } from '../../API/tournamentAPI';
import './TournamentDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faGear, faPencil, faPeopleArrows, faPlus, faTree, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Tournament } from '../../types';
import Banner from '../../Tools/Banner';

// Definition der Eigenschaften für die TournamentDetails-Komponente
interface TournamentDetailsProps {
  onOpenFighterList: () => void;
  onOpenFighterManager: () => void;
  onOpenClubManager: () => void;
}


// Hauptkomponente TournamentDetails
const TournamentDetails: React.FC<TournamentDetailsProps> = ({ onOpenFighterList, onOpenFighterManager, onOpenClubManager }) => {
    

    // Hook, um URL-Parameter abzurufen
  const { tournamentId } = useParams<{ tournamentId: string | undefined }>();

    // Setzen der anfänglichen Zustände mit Hooks
  const [backendTournaments, setBackendTournaments] = useState<Tournament[]>([]);
  const [tournament, setTournament] = useState<Tournament | null>(null);

   // Effekt, der beim Start ausgeführt wird und die Turnierdaten abruft
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const tournaments = await getTournaments();
        setBackendTournaments(tournaments);
        const tournament = getTournamentDetailsById(tournamentId, tournaments);
        setTournament(tournament);
      } catch (error) {
        console.error('Error loading tournaments:', error);
      }
    };

    fetchTournaments();
  }, [tournamentId]);

    // Funktion zum Abrufen der Turnierdetails anhand der ID
  const getTournamentDetailsById = (tournamentId: string | undefined, tournaments: Tournament[]): Tournament | null => {
    if (!tournamentId) {
      return null;
    }
    const tournament = tournaments.find((t) => t.id === parseInt(tournamentId));
    return tournament || null;
  };


  // Render der Komponente
  return (
    <div className="app">

      {/* Banner mit dem Turniernamen und der ID anzeigen */}
      <Banner
        title={`Turnier "${tournament ? tournament.name : ''}"`}
        subtitle={`ID${tournament ? tournament.id : ''}`}
      />
      {/* Für den Edit-Button kann hier einfach der Button aus der Banner.tsx aufgerufen werden */}

      {/* Container für die Karten */}


      
      <button className='editTorunamentButton'>
        <div>
          <FontAwesomeIcon icon={faPencil} />
        </div>
        Turnier bearbeiten
      </button>

      <div className="cards-container">
        <CardOne tournamentId={tournamentId || ''} />
        <CardTwo tournamentId={tournamentId || ''} onOpenFighterList={onOpenFighterList} />
        <CardThree tournamentId={tournamentId || ''} onOpenFighterManager={onOpenFighterManager} />
        <CardFour tournamentId={tournamentId || ''} onOpenFighterManager={onOpenFighterManager} />
        <CardFive tournamentId={tournamentId || ''} onOpenClubManager={onOpenClubManager} />
        <CardSix tournamentId={tournamentId || ''} onOpenClubManager={onOpenClubManager} />
      </div>
      {/* Aktueller Kampf: Label anzeigen */}
      <div className="currentFightLabel">Aktueller Kampf:</div>
      <div className="currentFightPreview">PREVIEW IST IN ARBEIT</div>
    </div>
  );

};


const CardOne = ({ tournamentId }: { tournamentId: string }) => {
  const navigate = useNavigate();

  const handleCardOneClick = () => {
    navigate(`/tournament-details/${tournamentId}`);
  };

  return (
    <div className="card-one" onClick={handleCardOneClick}>
      <div className="card-content">
        <div className="card-icon-white">
          <FontAwesomeIcon icon={faTrophy} />
        </div>
        <div className="card-text-white">Turnierbaum</div>
      </div>
    </div>
  );
};

const CardTwo = ({ tournamentId, onOpenFighterList }: { tournamentId: string, onOpenFighterList: () => void }) => {
  const handleCardTwoClick = () => {
    onOpenFighterList();
  };

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

const CardThree = ({ tournamentId, onOpenFighterManager }: { tournamentId: string, onOpenFighterManager: () => void }) => {
  const handleCardThreeClick = () => {
    onOpenFighterManager();
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


const CardFour = ({ tournamentId, onOpenFighterManager }: { tournamentId: string, onOpenFighterManager: () => void }) => {
  const handleCardThreeClick = () => {
    onOpenFighterManager();
  };

  return (
    <div className="card-four" onClick={handleCardThreeClick}>
      <div className="card-content">
        <div className="card-icon-blue">
          <FontAwesomeIcon icon={faClipboardList} />
        </div>
        <div className="card-text-blue">Vereinsliste</div>
      </div>
    </div>
  );
};


const CardFive = ({ tournamentId, onOpenClubManager }: { tournamentId: string, onOpenClubManager: () => void }) => {
  const handleCardThreeClick = () => {
    onOpenClubManager();
  };

  return (
    <div className="card-five" onClick={handleCardThreeClick}>
      <div className="card-content">
        <div className="card-icon-white">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div className="card-text-white">Verein</div>
      </div>
    </div>
  );
};

const CardSix = ({ tournamentId, onOpenClubManager }: { tournamentId: string, onOpenClubManager: () => void }) => {
  const handleCardThreeClick = () => {
    onOpenClubManager();
  };

  return (
    <div className="card-six" onClick={handleCardThreeClick}>
      <div className="card-content">
        <div className="card-icon-blue">
          <FontAwesomeIcon icon={faGear} />
        </div>
        <div className="card-text-blue">Kampfmodus</div>
      </div>
    </div>
  );
};




export default TournamentDetails;

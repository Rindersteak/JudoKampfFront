import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTournaments, getTotalTournaments } from '../../API/tournamentAPI';
import './TournamentDetails.css';
import logo from '../../img/kodokan_logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faPlus, faTree, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { Tournament } from '../../types';

interface TournamentDetailsProps {
  onOpenFighterList: () => void;
  onOpenFighterManager: () => void;
  onOpenClubManager:() => void;
}

const TournamentDetails: React.FC<TournamentDetailsProps> = ({ onOpenFighterList, onOpenFighterManager, onOpenClubManager }) => {
  const { tournamentId } = useParams<{ tournamentId: string | undefined }>();
  const navigate = useNavigate();
  const [backendTournaments, setBackendTournaments] = useState<Tournament[]>([]);
  const [tournament, setTournament] = useState<Tournament | null>(null);

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

  const getTournamentDetailsById = (tournamentId: string | undefined, tournaments: Tournament[]): Tournament | null => {
    if (!tournamentId) {
      return null;
    }
    const tournament = tournaments.find((t) => t.id === parseInt(tournamentId));
    return tournament || null;
  };

  const handleGoBack = () => {
    navigate(-1); // Navigiere eine Seite zurück
  };

  if (!tournament) {
    return <div>Loading...</div>;
  }



  
  return (
    <div className="app">
      <div className="header">
        <svg className="logo" />
        <div className="top-banner">
          <div className="back-button" onClick={handleGoBack}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="back-icon" />
          </div>
          <img src={logo} alt="Logo" className="logo" />
          <h1>Turnier "{tournament.name}"</h1>
          <h1>ID{tournament.id}</h1>
        </div>
      </div>
      <div className="cards-container">
        <CardOne tournamentId={tournamentId || ''} />
        <CardTwo tournamentId={tournamentId || ''} onOpenFighterList={onOpenFighterList} />
        <CardThree tournamentId={tournamentId || ''} onOpenFighterManager={onOpenFighterManager} />
        <CardFour tournamentId={tournamentId || ''} onOpenFighterManager={onOpenFighterManager} />
        <CardFive tournamentId={tournamentId || ''} onOpenClubManager={onOpenClubManager} />
      </div>
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
  


export default TournamentDetails;

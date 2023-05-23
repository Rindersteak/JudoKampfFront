import React, { useEffect, useState } from 'react';
import { Tournament, Address } from '../../types';
import { getTotalParticipants } from '../../API/fighterAPI';
import { getTournaments, getTotalTournaments } from '../../API/tournamentAPI';
import './TournamentList.css';

import { useNavigate } from 'react-router-dom';

interface TournamentListProps {}

const TournamentList: React.FC<TournamentListProps> = () => {
  const [backendTournaments, setBackendTournaments] = useState<Tournament[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBackendTournaments = async () => {
      try {
        let tournaments = await getTournaments();

        // Turniere nach Namen sortieren
        tournaments = tournaments.sort((a: Tournament, b: Tournament) => a.name.localeCompare(b.name));

        setBackendTournaments(tournaments);
      } catch (error) {
        console.error('Error loading backend tournaments:', error);
      }
    };

    loadBackendTournaments();
  }, []);

  const handleLocationClick = (address: Address) => {
    const formattedAddress = `${address.street} ${address.houseNumber}, ${address.postalCode} ${address.city}, ${address.state}`;
    window.open(`https://maps.google.com/?q=${encodeURIComponent(formattedAddress)}`);
  };

  const navigateToTournamentDetails = (tournamentId: number) => {
    navigate(`/tournament-details/${tournamentId}`);
  };

  return (
    <div className="entryList">
      <div className="headerBanner">
        <h1 className="titleStyleList">Turnierliste</h1>
      </div>
      <div className="contentContainer">
        <div className="entryStyle headerStyle">
          <span className="nameStyle">Name</span>
          <span className="locationStyle">Ort</span>
          <span className="cityStyle">Stadt</span>
          <span className="idStyle">Turnier-ID</span>
          <span className="numClubsStyle">Anzahl teilnehmende Vereine</span>
          <span className="numParticipantsStyle">Anzahl Teilnehmer</span>
        </div>
        {backendTournaments.map((tournament) => (
          <div className="entryStyle" key={tournament.id}>
            <span className="nameStyle">{tournament.name}</span>
            <span className="locationStyleContent clickable" onClick={() => handleLocationClick(tournament.address)}>
              {tournament.location}
            </span>
            <span className="cityStyle">{tournament.address.city}</span>
            <span className="idStyleContent clickable" onClick={() => navigateToTournamentDetails(tournament.id)}>
              {tournament.id}
            </span>
            <span className="numClubsStyle">{tournament.fighters.length}</span>
            <span className="numParticipantsStyle">{getTotalParticipants(tournament.fighters)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentList;

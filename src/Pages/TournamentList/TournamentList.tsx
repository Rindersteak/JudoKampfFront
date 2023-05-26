import React, { useEffect, useState } from 'react';
import { Tournament, Address } from '../../types';
import { getTotalParticipants } from '../../API/fighterAPI';
import { getTournaments, deleteTournament } from '../../API/tournamentAPI';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import Modal from '../../Modal/Modal';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import './TournamentList.css';
import { useNavigate } from 'react-router-dom';

interface TournamentListProps {
  onClose: () => void;
}

const TournamentList: React.FC<TournamentListProps> = ({ onClose }) => {
  const [backendTournaments, setBackendTournaments] = useState<Tournament[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [tournamentIdToDelete, setTournamentToDelete] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadBackendTournaments = async () => {
      try {
        let tournaments = await getTournaments();

        tournaments = tournaments.sort((a: Tournament, b: Tournament) =>
          sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );

        setBackendTournaments(tournaments);
      } catch (error) {
        console.error('Error loading backend tournaments:', error);
      }
    };

    loadBackendTournaments();
  }, [sortOrder]);

  const handleLocationClick = (address: Address) => {
    const formattedAddress = `${address.street} ${address.housenumber}, ${address.postalcode} ${address.city}, ${address.state}`;
    window.open(`https://maps.google.com/?q=${encodeURIComponent(formattedAddress)}`);
  };

  const navigateToTournamentDetails = (tournamentId: number) => {
    navigate(`/tournament-details/${tournamentId}`);
    onClose();
  };

  const handleSortClick = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDeleteTournament = (tournamentId: number) => {
    setShowConfirmDeletePopup(true);
    setTournamentToDelete(tournamentId);
  };

  const handleDeleteConfirmed = async () => {
    if (tournamentIdToDelete !== null) {
      await deleteTournament(tournamentIdToDelete);
      setShowConfirmDeletePopup(false);
      setBackendTournaments(backendTournaments.filter(tournament => tournament.id !== tournamentIdToDelete));
    }
  }

  const handleDeleteCanceled = () => {
    setShowConfirmDeletePopup(false);
  }

  return (
    <div className="entryList">
      <div className="headerBanner">
        <h1 className="titleStyleList">Turnierliste</h1>
      </div>
      <table className="tableStyle">
        <thead>
          <tr>
            <th className="headerCell">
              Name
              <button className="arrowButton" onClick={handleSortClick}>
                {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell">
              Ort
              <button className="arrowButton" onClick={handleSortClick}>
                {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell">
              Stadt
              <button className="arrowButton" onClick={handleSortClick}>
                {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell">
              Turnier-ID
              <button className="arrowButton" onClick={handleSortClick}>
                {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell">
              Anzahl teilnehmende Vereine
              <button className="arrowButton" onClick={handleSortClick}>
                {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell">
              Anzahl Teilnehmer
              <button className="arrowButton" onClick={handleSortClick}>
                {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {backendTournaments.map((tournament) => (
            <tr className="entryStyle" key={tournament.id}>
              <td>{tournament.name}</td>
              <td className="locationStyleContent clickable" onClick={() => handleLocationClick(tournament.address)}>
                {tournament.location}
              </td>
              <td>{tournament.address.city}</td>
              <td
                className="idStyleContent clickable"
                onClick={() => navigateToTournamentDetails(tournament.id)}
              >
                {tournament.id}
              </td>
              <td>{tournament.fighters.length}</td>
              <td>{getTotalParticipants(tournament.fighters)}</td>
              <td className="deleteIcon" onClick={() => handleDeleteTournament(tournament.id)}><FiTrash2 /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmDeletePopup && tournamentIdToDelete !== null && (
        <Modal size="small" onClose={handleDeleteCanceled}>
          <ConfirmDelete
            onClose={handleDeleteCanceled}
            onConfirmDelete={handleDeleteConfirmed}
            idToDelete={tournamentIdToDelete}
          />

        </Modal>
      )}
    </div>
  );
};

export default TournamentList;

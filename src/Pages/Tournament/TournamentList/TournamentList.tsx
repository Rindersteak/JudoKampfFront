import React, { useEffect, useState } from 'react';
import { Tournament, Address } from '../../../types';
import { getTotalParticipants } from '../../../API/fighterAPI';
import { getTournaments, deleteTournament } from '../../../API/tournamentAPI';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import Modal from '../../../Tools/Modal/Modal';
import ConfirmDelete from '../../../Tools/ConfirmDelete/ConfirmDelete';
import './TournamentList.css';
import { useNavigate } from 'react-router-dom';

interface TournamentListProps {
  onClose: () => void;
}

const TournamentList: React.FC<TournamentListProps> = ({ onClose }) => {
  const [backendTournaments, setBackendTournaments] = useState<Tournament[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [tournamentIdToDelete, setTournamentToDelete] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadBackendTournaments = async () => {
      try {
        let tournaments = await getTournaments();

        tournaments = tournaments.sort((a: Tournament, b: Tournament) => {
          if (sortColumn === 'name') {
            return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
          } else if (sortColumn === 'location') {
            return sortOrder === 'asc' ? a.location.localeCompare(b.location) : b.location.localeCompare(a.location);
          } else if (sortColumn === 'city') {
            return sortOrder === 'asc' ? a.address.city.localeCompare(b.address.city) : b.address.city.localeCompare(a.address.city);
          } else if (sortColumn === 'id') {
            return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
          } else if (sortColumn === 'participants') {
            const aTotalParticipants = getTotalParticipants(a.fighters);
            const bTotalParticipants = getTotalParticipants(b.fighters);
            return sortOrder === 'asc' ? aTotalParticipants - bTotalParticipants : bTotalParticipants - aTotalParticipants;
          } else if (sortColumn === 'period') {
            return sortOrder === 'asc' ? new Date(a.startdate).getTime() - new Date(b.startdate).getTime() : new Date(b.startdate).getTime() - new Date(a.startdate).getTime();
          }
          return 0;
        });

        setBackendTournaments(tournaments);
      } catch (error) {
        console.error('Error loading backend tournaments:', error);
      }
    };

    loadBackendTournaments();
  }, [sortOrder, sortColumn]);

  const handleLocationClick = (address: Address) => {
    const formattedAddress = `${address.street} ${address.housenumber}, ${address.postalcode} ${address.city}, ${address.state}`;
    window.open(`https://maps.google.com/?q=${encodeURIComponent(formattedAddress)}`);
  };

  const navigateToTournamentDetails = (tournamentId: number) => {
    navigate(`/tournament-details/${tournamentId}`);
    onClose();
  };

  const handleSortClick = (column: string) => {
    setSortColumn(column);
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
  };

  const handleDeleteCanceled = () => {
    setShowConfirmDeletePopup(false);
  };

  const formatTournamentPeriod = (start: string, end: string) => {
    const startDate = new Date(start).toLocaleDateString();
    const endDate = new Date(end).toLocaleDateString();
    return `${startDate} - ${endDate}`;
  };

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
              <button className="arrowButton" onClick={() => handleSortClick('name')}>
                {sortOrder === 'asc' && sortColumn === 'name' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell">
              Ort
              <button className="arrowButton" onClick={() => handleSortClick('location')}>
                {sortOrder === 'asc' && sortColumn === 'location' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell">
              Stadt
              <button className="arrowButton" onClick={() => handleSortClick('city')}>
                {sortOrder === 'asc' && sortColumn === 'city' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell">
              Turnier-ID
              <button className="arrowButton" onClick={() => handleSortClick('id')}>
                {sortOrder === 'asc' && sortColumn === 'id' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell">
              Anzahl Teilnehmer
              <button className="arrowButton" onClick={() => handleSortClick('participants')}>
                {sortOrder === 'asc' && sortColumn === 'participants' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell">
              Zeitraum
              <button className="arrowButton" onClick={() => handleSortClick('period')}>
                {sortOrder === 'asc' && sortColumn === 'period' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
              </button>
            </th>
            <th className="headerCell"></th>
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
              <td>{getTotalParticipants(tournament.fighters)}</td>
              <td>{formatTournamentPeriod(tournament.startdate, tournament.enddate)}</td>
              <td className="deleteIcon" onClick={() => handleDeleteTournament(tournament.id)}>
                <FiTrash2 />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmDeletePopup && tournamentIdToDelete !== null && (
        <Modal size="small" onClose={handleDeleteCanceled}>
          <ConfirmDelete onClose={handleDeleteCanceled} onConfirmDelete={handleDeleteConfirmed} idToDelete={tournamentIdToDelete} />
        </Modal>
      )}
    </div>
  );
};

export default TournamentList;

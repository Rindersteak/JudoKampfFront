import React, { useEffect, useState } from "react";
import { Tournament } from "../../../types";
import { getTournaments, deleteTournament, getTournamentFightersList } from "../../../API/tournamentAPI";
import { FiTrash2 } from "react-icons/fi";
import Modal from "../../../Tools/Modal/Modal";
import ConfirmDelete from "../../../Tools/ConfirmDelete/ConfirmDelete";
import "./TournamentList.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

interface TournamentListProps {
  onClose: () => void;
}

const TournamentList: React.FC<TournamentListProps> = ({ onClose }) => {
  const [backendTournaments, setBackendTournaments] = useState<Tournament[]>(
    []
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<string>("name");
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [tournamentIdToDelete, setTournamentToDelete] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadBackendTournaments = async () => {
      try {
        let tournaments = await getTournaments();

        tournaments = tournaments.sort((a: Tournament, b: Tournament) => {
          if (sortColumn === "name") {
            return sortOrder === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else if (sortColumn === "location") {
            return sortOrder === "asc"
              ? a.location.localeCompare(b.location)
              : b.location.localeCompare(a.location);
          } else if (sortColumn === "city") {
            return sortOrder === "asc"
              ? a.address.city.localeCompare(b.address.city)
              : b.address.city.localeCompare(a.address.city);
          } else if (sortColumn === "id") {
            return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
          } else if (sortColumn === "participants") {
            const aTotalParticipants = getTournamentFightersList.length;
            const bTotalParticipants = getTournamentFightersList.length;
            return sortOrder === "asc"
              ? aTotalParticipants - bTotalParticipants
              : bTotalParticipants - aTotalParticipants;
          } else if (sortColumn === "period") {
            return sortOrder === "asc"
              ? new Date(a.startdate).getTime() -
                  new Date(b.startdate).getTime()
              : new Date(b.startdate).getTime() -
                  new Date(a.startdate).getTime();
          }
          return 0;
        });

        setBackendTournaments(tournaments);
      } catch (error) {
        console.error("Error loading backend tournaments:", error);
      }
    };

    loadBackendTournaments();
  }, [sortOrder, sortColumn]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const navigateToTournamentDetails = (tournamentId: number) => {
    navigate(`/tournament-details/${tournamentId}`);
    onClose();
  };

  const handleSortClick = (column: string) => {
    setSortColumn(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDeleteTournament = (tournamentId: number) => {
    setShowConfirmDeletePopup(true);
    setTournamentToDelete(tournamentId);
  };

  const handleDeleteConfirmed = async () => {
    if (tournamentIdToDelete !== null) {
      await deleteTournament(tournamentIdToDelete);
      setShowConfirmDeletePopup(false);
      setBackendTournaments(
        backendTournaments.filter(
          (tournament) => tournament.id !== tournamentIdToDelete
        )
      );
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

  const filteredTournaments = backendTournaments.filter((tournament) => {
    const name = tournament.name.toLowerCase();
    const city = tournament.address.city.toLowerCase();
    const id = tournament.id.toString().toLowerCase();
    const participants = getTournamentFightersList.length
      .toString()
      .toLowerCase();
    const period = formatTournamentPeriod(
      tournament.startdate,
      tournament.enddate
    ).toLowerCase();

    return (
      name.includes(searchTerm.toLowerCase()) ||
      city.includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm.toLowerCase()) ||
      participants.includes(searchTerm.toLowerCase()) ||
      period.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="entryList">
      <div className="headerBanner">
        <h1 className="titleStyleList">Turnierliste</h1>
      </div>
      <div className="searchContainerForLists">
        <input
          className="searchField"
          type="search"
          placeholder="Turnier suchen"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="listContainer">
        <table className="tableStyle">
          <thead>
            <tr>
              <th className="headerCell">
                Name
                <button
                  className="arrowButton"
                  onClick={() => handleSortClick("name")}
                >
                  {sortOrder === "asc" && sortColumn === "name" ? (
                    <FontAwesomeIcon icon={faArrowDown} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}
                </button>
              </th>
              <th className="headerCell">
                Stadt
                <button
                  className="arrowButton"
                  onClick={() => handleSortClick("city")}
                >
                  {sortOrder === "asc" && sortColumn === "city" ? (
                    <FontAwesomeIcon icon={faArrowDown} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}
                </button>
              </th>
              <th className="headerCell">
                Turnier-ID
                <button
                  className="arrowButton"
                  onClick={() => handleSortClick("id")}
                >
                  {sortOrder === "asc" && sortColumn === "id" ? (
                    <FontAwesomeIcon icon={faArrowDown} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}
                </button>
              </th>
              <th className="headerCell">
                Anzahl Teilnehmer
                <button
                  className="arrowButton"
                  onClick={() => handleSortClick("participants")}
                >
                  {sortOrder === "asc" && sortColumn === "participants" ? (
                    <FontAwesomeIcon icon={faArrowDown} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}
                </button>
              </th>
              <th className="headerCell">
                Zeitraum
                <button
                  className="arrowButton"
                  onClick={() => handleSortClick("period")}
                >
                  {sortOrder === "asc" && sortColumn === "period" ? (
                    <FontAwesomeIcon icon={faArrowDown} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}
                </button>
              </th>
              <th className="headerCell"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTournaments.map((tournament) => (
              <tr
                className="entryStyle clickable"
                key={tournament.id}
                onClick={() => navigateToTournamentDetails(tournament.id)}
              >
                <td>{tournament.name}</td>
                <td>{tournament.address.city}</td>
                <td>{tournament.id}</td>
                <td>{getTournamentFightersList.length}</td>
                <td>
                  {formatTournamentPeriod(
                    tournament.startdate,
                    tournament.enddate
                  )}
                </td>
                <td
                  className="deleteIcon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTournament(tournament.id);
                  }}
                >
                  <FiTrash2 />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

import React, { useEffect, useState } from 'react';
import { Club } from '../../../types';
import { getClubs, deleteClub } from '../../../API/clubAPI';
import { FiTrash2 } from 'react-icons/fi';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import Modal from '../../../Modal/Modal';
import ConfirmDelete from '../../ConfirmDelete/ConfirmDelete';
import ClubEdit from '../ClubEdit/ClubEdit';  // Importiere die ClubEdit-Komponente
import './ClubList.css';

interface ClubListProps {
  detailedView?: boolean;
  onDeleteClub: (clubId: number) => void;
  
}

export const deleteClubHandler = async (clubId: number) => {
  try {
    await deleteClub(clubId);
    // Implementiere hier die Aktualisierung der Vereinsliste nach dem Löschen
  } catch (error) {
    console.error('Fehler beim Löschen des Vereins:', error);
  }
};

const ClubList: React.FC<ClubListProps> = ({ detailedView = true, onDeleteClub }) => {
  const [backendClubs, setBackendClubs] = useState<Club[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [clubIdToDelete, setClubToDelete] = useState<number | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  useEffect(() => {
    const loadBackendClubs = async () => {
      try {
        const clubs = await getClubs();
        const sortedClubs = clubs.sort((a: Club, b: Club) =>
          sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
        setBackendClubs(sortedClubs);
      } catch (error) {
        console.error('Fehler beim Laden der Vereine aus der Datenbank:', error);
      }
    };

    loadBackendClubs();
  }, [sortOrder]);

  const handleSortClick = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDeleteClub = (event: React.MouseEvent, clubId: number) => {
    event.stopPropagation(); // Verhindert, dass das Klickereignis weitergegeben wird
    setShowConfirmDeletePopup(true);
    setClubToDelete(clubId);
  };

  const handleDeleteConfirmed = async () => {
    if (clubIdToDelete !== null) {
      await deleteClubHandler(clubIdToDelete);
      setShowConfirmDeletePopup(false);
      setBackendClubs(backendClubs.filter(club => club.id !== clubIdToDelete));
    }
  }

  const handleDeleteCanceled = () => {
    setShowConfirmDeletePopup(false);
  };

  const handleEditClub = (club: Club) => {
    setSelectedClub(club);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  return (
    <div className="entryList">
      {detailedView && (
        <div className="headerBanner">
          <h1 className="titleStyleList">Vereinsliste</h1>
        </div>
      )}
      <table className="tableStyle">
        <thead>
          <tr>
            <th className="headerCell">
              Name
              {detailedView && (
                <button className="arrowButton" onClick={handleSortClick}>
                  {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                </button>
              )}
            </th>
            <th className="headerCell">
              Landesverband
              {detailedView && (
                <button className="arrowButton" onClick={handleSortClick}>
                  {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                </button>
              )}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {backendClubs.map((club) => {
            return (
              <tr
                className="entryStyle"
                key={club.id}
                onClick={() => handleEditClub(club)} 
              >
                <td>{club.name}</td>
                <td>{club.stateassociation}</td>
                <td className="deleteIcon" onClick={(event) => handleDeleteClub(event, club.id)}><FiTrash2 /></td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showConfirmDeletePopup && clubIdToDelete !== null && (
        <Modal size="small" onClose={handleDeleteCanceled}>
          <ConfirmDelete
            onClose={handleDeleteCanceled}
            onConfirmDelete={handleDeleteConfirmed}
            idToDelete={clubIdToDelete}
          />
        </Modal>
      )}

      {showEditModal && selectedClub && (
        <Modal size="large" onClose={handleEditModalClose}>
          <ClubEdit club={selectedClub} onUpdateClub={() => { }} onDeleteClub={() => { }} />
        </Modal>
      )}
    </div>
  );
};

export default ClubList;

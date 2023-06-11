import React, { useEffect, useState } from 'react';
import { Club } from '../../../types';
import { getClubs, deleteClub } from '../../../API/clubAPI';
import { FiTrash2 } from 'react-icons/fi';
import Modal from '../../../Tools/Modal/Modal';
import ConfirmDelete from '../../../Tools/ConfirmDelete/ConfirmDelete';
import ClubEdit from '../ClubEdit/ClubEdit';
import './ClubList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faSearch } from '@fortawesome/free-solid-svg-icons';

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
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [clubIdToDelete, setClubToDelete] = useState<number | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadBackendClubs = async () => {
      try {
        const clubs = await getClubs();
        const sortedClubs = clubs.sort((a: Club, b: Club) => {
          if (sortColumn === 'name') {
            return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
          } else if (sortColumn === 'stateassociation') {
            const stateAssociationA = a.stateassociation ?? '';
            const stateAssociationB = b.stateassociation ?? '';
            return sortOrder === 'asc' ? stateAssociationA.localeCompare(stateAssociationB) : stateAssociationB.localeCompare(stateAssociationA);
          }
          return 0;
        });

        setBackendClubs(sortedClubs);
      } catch (error) {
        console.error('Fehler beim Laden der Vereine aus der Datenbank:', error);
      }
    };

    loadBackendClubs();
  }, [sortOrder, sortColumn]);

  const handleSortClick = (column: string) => {
    setSortColumn(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDeleteClub = (event: React.MouseEvent, clubId: number) => {
    event.stopPropagation();
    setShowConfirmDeletePopup(true);
    setClubToDelete(clubId);
  };

  const handleDeleteConfirmed = async () => {
    if (clubIdToDelete !== null) {
      await deleteClubHandler(clubIdToDelete);
      setShowConfirmDeletePopup(false);
      setBackendClubs(backendClubs.filter(club => club.id !== clubIdToDelete));
    }
  };

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

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredClubs = backendClubs.filter(club => club.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="entryList">
      {detailedView && (
        <div className="headerBanner">
          <h1 className="titleStyleList">Vereinsliste</h1>
        </div>
      )}
      <div className='searchContainerForLists'>
        <input className='searchField' type='search' placeholder='Verein suchen' value={searchTerm} onChange={handleSearchTermChange} />
      </div>

      <div className='listContainer'>
        <table className="tableStyle">
          <thead>
            <tr>
              <th className="headerCell">
                Name
                <button className="arrowButton" onClick={() => handleSortClick('name')}>
                  {sortOrder === 'asc' && sortColumn === 'name' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
                </button>
              </th>
              <th className="headerCell">
                Landesverband
                <button className="arrowButton" onClick={() => handleSortClick('stateassociation')}>
                  {sortOrder === 'asc' && sortColumn === 'stateassociation' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
                </button>
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredClubs.map((club) => {
              return (
                <tr
                  className="entryStyle"
                  key={club.id}
                  onClick={() => handleEditClub(club)}
                >
                  <td>{club.name}</td>
                  <td>{club.stateassociation}</td>
                  <td className="deleteIcon" onClick={(event) => handleDeleteClub(event, club.id ?? 0)}><FiTrash2 /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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

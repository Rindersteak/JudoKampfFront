import React, { useEffect, useState } from 'react';
import { Fighter } from '../../../types';
import { getFighters, deleteFighter } from '../../../API/fighterAPI';
import { FiTrash2 } from 'react-icons/fi';
import Modal from '../../../Tools/Modal/Modal';
import ConfirmDelete from '../../../Tools/ConfirmDelete/ConfirmDelete';
import FighterEdit from '../FighterEdit/FighterEdit';
import './FighterList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faSearch } from '@fortawesome/free-solid-svg-icons';

interface FighterListProps {
  detailedView?: boolean;
  onDeleteFighter: (fighterId: number) => void;
}

export const deleteFighterHandler = async (fighterId: number) => {
  try {
    await deleteFighter(fighterId);
    // Implementiere hier die Aktualisierung der Kämpferliste nach dem Löschen
  } catch (error) {
    console.error('Fehler beim Löschen des Kämpfers:', error);
  }
};

const FighterList: React.FC<FighterListProps> = ({ detailedView = true, onDeleteFighter }) => {
  const [backendFighters, setBackendFighters] = useState<Fighter[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<string>('lastname');
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [fighterIdToDelete, setFighterToDelete] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null);

  useEffect(() => {
    const loadBackendFighters = async () => {
      try {
        const fighters = await getFighters();
        const fightersCopy = fighters.map((fighter: Fighter) => ({
          ...fighter,
          birthdate: fighter.birthdate 
        }));

        const sortedFighters = fightersCopy.sort((a: Fighter, b: Fighter) => {
          if (sortColumn === 'lastname') {
            return sortOrder === 'asc' ? a.lastname.localeCompare(b.lastname) : b.lastname.localeCompare(a.lastname);
          } else if (sortColumn === 'club') {
            return sortOrder === 'asc' ? a.club?.name?.localeCompare(b.club?.name || '') : b.club?.name?.localeCompare(a.club?.name || '');
          } else if (sortColumn === 'city') {
            return sortOrder === 'asc' ? a.club?.address?.city?.localeCompare(b.club?.address?.city || '') : b.club?.address?.city?.localeCompare(a.club?.address?.city || '');
          } else if (sortColumn === 'id') {
            return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
          } else if (sortColumn === 'weightclass') {
            return sortOrder === 'asc' ? (a.weightclass?.name || '').localeCompare(b.weightclass?.name || '') : (b.weightclass?.name || '').localeCompare(a.weightclass?.name || '');
          } else if (sortColumn === 'birthdate') {
            return sortOrder === 'asc' ? a.birthdate.localeCompare(b.birthdate) : b.birthdate.localeCompare(a.birthdate);
          }
          return 0;
        });
        
        setBackendFighters(sortedFighters);
      } catch (error) {
        console.error('Fehler beim Laden der Kämpfer aus der Datenbank:', error);
      }
    };

    loadBackendFighters();
  }, [sortOrder, sortColumn]);

  const handleSortClick = (column: string) => {
    setSortColumn(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDeleteFighter = (event: React.MouseEvent, fighterId: number) => {
    event.stopPropagation(); // Verhindert, dass das Klickereignis weitergegeben wird
    setShowConfirmDeletePopup(true);
    setFighterToDelete(fighterId);
  };

  const handleDeleteConfirmed = async () => {
    if (fighterIdToDelete !== null) {
      await deleteFighterHandler(fighterIdToDelete);
      setShowConfirmDeletePopup(false);
      setBackendFighters(backendFighters.filter(fighter => fighter.id !== fighterIdToDelete));
    }
  }

  const handleDeleteCanceled = () => {
    setShowConfirmDeletePopup(false);
  };

  const handleEditFighter = (fighter: Fighter) => {
    setSelectedFighter(fighter);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredFighters = backendFighters.filter(fighter =>
    fighter.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fighter.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (fighter.club?.name && fighter.club.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (fighter.club?.address?.city && fighter.club.address.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="entryList">
      {detailedView && (
        <div className="headerBanner">
          <h1 className="titleStyleList">Teilnehmerliste</h1>
        </div>
      )}

      <div className='searchContainerForLists'>
        <input
          className='searchField'
          type='search'
          placeholder='Teilnehmer suchen'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className='listContainer'>
        <table className="tableStyle">
          <thead>
            <tr>
              <th className="headerCell">
                Name
                {detailedView && (
                  <button className="arrowButton" onClick={() => handleSortClick('lastname')}>
                    {sortOrder === 'asc' && sortColumn === 'lastname' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
                  </button>
                )}
              </th>
              <th className="headerCell">
                Verein
                {detailedView && (
                  <button className="arrowButton" onClick={() => handleSortClick('club')}>
                    {sortOrder === 'asc' && sortColumn === 'club' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
                  </button>
                )}
              </th>
              {detailedView && (
                <>
                  <th className="headerCell">
                    Stadt
                    <button className="arrowButton" onClick={() => handleSortClick('city')}>
                      {sortOrder === 'asc' && sortColumn === 'city' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
                    </button>
                  </th>
                  <th className="headerCell">
                    Teilnehmer-ID
                    <button className="arrowButton" onClick={() => handleSortClick('id')}>
                      {sortOrder === 'asc' && sortColumn === 'id' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
                    </button>
                  </th>
                  <th className="headerCell">
                    Gewichtsklasse
                    <button className="arrowButton" onClick={() => handleSortClick('weightclass')}>
                      {sortOrder === 'asc' && sortColumn === 'weightclass' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
                    </button>
                  </th>
                  <th className="headerCell">
                    Geburtsdatum
                    <button className="arrowButton" onClick={() => handleSortClick('birthdate')}>
                      {sortOrder === 'asc' && sortColumn === 'birthdate' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
                    </button>
                  </th>
                </>
              )}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredFighters.map((fighter) => {
              const birthdateAsDate = new Date(fighter.birthdate);

              return (
                <tr
                  className="entryStyle"
                  key={fighter.id}
                  onClick={() => handleEditFighter(fighter)} // Hinzufügen des onClick-Handlers für das Öffnen des Popups/Modals
                >
                  <td>{fighter.lastname} {fighter.firstname}</td>
                  <td>{fighter.club?.name}</td>
                  {detailedView && (
                    <>
                      <td>{fighter.club?.address?.city}</td>
                      <td>{fighter.id}</td>
                      <td>{fighter.weightclass?.name}</td>
                      <td>{birthdateAsDate.toDateString()}</td>
                    </>
                  )}
                  <td className="deleteIcon" onClick={(event) => handleDeleteFighter(event, fighter.id)}><FiTrash2 /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showConfirmDeletePopup && fighterIdToDelete !== null && (
        <Modal size="small" onClose={handleDeleteCanceled}>
          <ConfirmDelete
            onClose={handleDeleteCanceled}
            onConfirmDelete={handleDeleteConfirmed}
            idToDelete={fighterIdToDelete}
          />
        </Modal>
      )}

      {showEditModal && selectedFighter && (
        <Modal size="large" onClose={handleEditModalClose}>
          <FighterEdit fighter={selectedFighter} onUpdateFighter={() => { }} onDeleteFighter={() => { }} />
        </Modal>
      )}
    </div>
  );
};

export default FighterList;

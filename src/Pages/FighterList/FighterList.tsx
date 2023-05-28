import React, { useEffect, useState } from 'react';
import { Fighter } from '../../types';
import { getFighters, deleteFighter } from '../../API/fighterAPI';
import { FiTrash2 } from 'react-icons/fi';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import Modal from '../../Modal/Modal';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import FighterEdit from '../FighterEdit/FighterEdit'; // Importiere die FighterEdit-Komponente
import './FighterList.css';

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
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [fighterIdToDelete, setFighterToDelete] = useState<number | null>(null);


  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null);

  useEffect(() => {
    const loadBackendFighters = async () => {
      try {
        const fighters = await getFighters();
        const fightersCopy = fighters.map((fighter: Fighter) => ({
          ...fighter,
          birthdate: new Date(fighter.birthdate)
        }));

        const sortedFighters = fightersCopy.sort((a: Fighter, b: Fighter) =>
          sortOrder === 'asc' ? a.lastname.localeCompare(b.lastname) : b.lastname.localeCompare(a.lastname)
        );
        setBackendFighters(sortedFighters);
      } catch (error) {
        console.error('Fehler beim Laden der Kämpfer aus der Datenbank:', error);
      }
    };

    loadBackendFighters();
  }, [sortOrder]);

  const handleSortClick = () => {
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

  return (
    <div className="entryList">
      {detailedView && (
        <div className="headerBanner">
          <h1 className="titleStyleList">Teilnehmerliste</h1>
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
              Verein
              {detailedView && (
                <button className="arrowButton" onClick={handleSortClick}>
                  {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                </button>
              )}
            </th>
            {detailedView && (
              <>
                <th className="headerCell">
                  Stadt
                  <button className="arrowButton" onClick={handleSortClick}>
                    {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                  </button>
                </th>
                <th className="headerCell">
                  Teilnehmer-ID
                  <button className="arrowButton" onClick={handleSortClick}>
                    {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                  </button>
                </th>
                <th className="headerCell">
                  Gewichtsklasse
                  <button className="arrowButton" onClick={handleSortClick}>
                    {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                  </button>
                </th>
                <th className="headerCell">
                  Geburtsdatum
                  <button className="arrowButton" onClick={handleSortClick}>
                    {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                  </button>
                </th>
              </>
            )}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {backendFighters.map((fighter) => {
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

import React, { useEffect, useState } from 'react';
import { Fighter } from '../../../types';
import { getFighters, deleteFighter } from '../../../API/fighterAPI';
import { FiTrash2 } from 'react-icons/fi';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import Modal from '../../../Modal/Modal'; // Stellen Sie sicher, dass der Pfad zu Ihrer Modal-Komponente korrekt ist
import ConfirmDelete from '../../ConfirmDelete/ConfirmDelete'; // Stellen Sie sicher, dass der Pfad zu Ihrer ConfirmDelete-Komponente korrekt ist
import './ClubList.css';

// Importieren der benötigten Abhängigkeiten und CSS-Datei

interface FighterListProps {
  detailedView?: boolean;
  onDeleteFighter: (fighterId: number) => void;
}

// Definition der Schnittstelle für die Props der Komponente

export const deleteClubHandler = async (fighterId: number) => {
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


  const handleDeleteFighter = (fighterId: number) => {
    setShowConfirmDeletePopup(true);
    setFighterToDelete(fighterId);
  };

  const handleDeleteConfirmed = async () => {
    if (fighterIdToDelete !== null) {
      await deleteClubHandler(fighterIdToDelete);
      setShowConfirmDeletePopup(false);
      setBackendFighters(backendFighters.filter(fighter => fighter.id !== fighterIdToDelete));
    }
  }

  const handleDeleteCanceled = () => {
    setShowConfirmDeletePopup(false);
  }

  // Funktion zum Löschen eines Kämpfers mit der gegebenen ID

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
              Verein
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
              <tr className="entryStyle" key={fighter.id}>
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
                <td className="deleteIcon" onClick={() => handleDeleteFighter(fighter.id)}><FiTrash2 /></td>

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
    </div>
  );
};

export default FighterList;

import React, { useEffect, useState } from 'react';
import { Fighter } from '../../types';
import { getFighters, deleteFighter } from '../../API/fighterAPI';
import { FiTrash2 } from 'react-icons/fi';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'; // Import der Icons
import './FighterList.css';

interface FighterListProps {
  detailedView?: boolean;
}

const FighterList: React.FC<FighterListProps> = ({ detailedView = true }) => {
  const [backendFighters, setBackendFighters] = useState<Fighter[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Hinzufügen des Sortierstatus

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
        console.error('Error loading backend fighters:', error);
      }
    };

    loadBackendFighters();
  }, [sortOrder]); // Aktualisiere die Daten bei Sortierstatusänderung

  const deleteFighterHandler = async (fighterId: number) => {
    try {
      await deleteFighter(fighterId);
      setBackendFighters(backendFighters.filter(fighter => fighter.id !== fighterId));
    } catch (error) {
      console.error('Error deleting fighter:', error);
    }
  };

  const handleSortClick = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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
                <td className="deleteIcon" onClick={() => deleteFighterHandler(fighter.id)}><FiTrash2 /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FighterList;

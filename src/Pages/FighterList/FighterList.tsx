import React, { useEffect, useState } from 'react';
import { Fighter } from '../../types';
import { getFighters, deleteFighter } from '../../API/fighterAPI';
import { FiTrash2 } from 'react-icons/fi';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import './FighterList.css';

// Importieren der benötigten Abhängigkeiten und CSS-Datei

interface FighterListProps {
  detailedView?: boolean;
  onDeleteFighter: (fighterId: number) => void;
}

// Definition der Schnittstelle für die Props der Komponente

export const deleteFighterHandler = async (fighterId: number) => {
  try {
    await deleteFighter(fighterId);
    // Implementiere hier die Aktualisierung der Kämpferliste nach dem Löschen
  } catch (error) {
    console.error('Fehler beim Löschen des Kämpfers:', error);
  }
};

// Definition der Funktion deleteFighterHandler, die einen Kämpfer löscht und die Kämpferliste aktualisiert

const FighterList: React.FC<FighterListProps> = ({ detailedView = true, onDeleteFighter }) => {
  const [backendFighters, setBackendFighters] = useState<Fighter[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Verwendung des useState-Hooks zum Speichern des Zustands der Kämpferliste und der Sortierreihenfolge

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

  // Verwendung des useEffect-Hooks zum Laden der Kämpferliste und Aktualisieren des Zustands bei Änderungen der Sortierreihenfolge

  const handleSortClick = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Funktion zum Umschalten der Sortierreihenfolge bei Klick auf einen Sortierungsbutton

  const handleDeleteFighter = (fighterId: number) => {
    onDeleteFighter(fighterId);
  };

  // Funktion zum Löschen eines Kämpfers mit der gegebenen ID

  return (
    <div className="entryList">
      {detailedView && (
        <div className="headerBanner">
          <h1 className="titleStyleList">Teilnehmerliste</h1>
        </div>
      )}
      {/* Rendert die Überschrift, wenn detailedView true ist */}
      <table className="tableStyle">
        {/* Erstellt eine Tabelle mit einem bestimmten Stil */}
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
            {/* Rendert den Spaltenkopf für den Namen und optional den Sortierungsbutton */}
            <th className="headerCell">
              Verein
              {detailedView && (
                <button className="arrowButton" onClick={handleSortClick}>
                  {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                </button>
              )}
            </th>
            {/* Rendert den Spaltenkopf für den Verein und optional den Sortierungsbutton */}
            {detailedView && (
              <>
                <th className="headerCell">
                  Stadt
                  <button className="arrowButton" onClick={handleSortClick}>
                    {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                  </button>
                </th>
                {/* Rendert den Spaltenkopf für die Stadt und den Sortierungsbutton */}
                <th className="headerCell">
                  Teilnehmer-ID
                  <button className="arrowButton" onClick={handleSortClick}>
                    {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                  </button>
                </th>
                {/* Rendert den Spaltenkopf für die Teilnehmer-ID und den Sortierungsbutton */}
                <th className="headerCell">
                  Gewichtsklasse
                  <button className="arrowButton" onClick={handleSortClick}>
                    {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                  </button>
                </th>
                {/* Rendert den Spaltenkopf für die Gewichtsklasse und den Sortierungsbutton */}
                <th className="headerCell">
                  Geburtsdatum
                  <button className="arrowButton" onClick={handleSortClick}>
                    {sortOrder === 'asc' ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                  </button>
                </th>
                {/* Rendert den Spaltenkopf für das Geburtsdatum und den Sortierungsbutton */}
              </>
            )}
            <th></th>
            {/* Rendert eine leere Spalte */}
          </tr>
        </thead>
        <tbody>
          {backendFighters.map((fighter) => {
            const birthdateAsDate = new Date(fighter.birthdate);

            return (
              <tr className="entryStyle" key={fighter.id}>
                <td>{fighter.lastname} {fighter.firstname}</td>
                {/* Rendert den Namen des Kämpfers */}
                <td>{fighter.club?.name}</td>
                {/* Rendert den Verein des Kämpfers */}
                {detailedView && (
                  <>
                    <td>{fighter.club?.address?.city}</td>
                    {/* Rendert die Stadt des Kämpfers */}
                    <td>{fighter.id}</td>
                    {/* Rendert die Teilnehmer-ID des Kämpfers */}
                    <td>{fighter.weightclass?.name}</td>
                    {/* Rendert die Gewichtsklasse des Kämpfers */}
                    <td>{birthdateAsDate.toDateString()}</td>
                    {/* Rendert das Geburtsdatum des Kämpfers */}
                  </>
                )}
                <td className="deleteIcon" onClick={() => handleDeleteFighter(fighter.id)}><FiTrash2 /></td>
                {/* Rendert das Löschen-Symbol mit der Funktion zum Löschen des Kämpfers */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FighterList;

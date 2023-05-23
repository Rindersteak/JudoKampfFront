import React, { useEffect, useState } from 'react';
import { Fighter } from '../../types';
import { getFighters } from '../../API/fighterAPI';
import './FighterList.css';

// Typendefinition für die Propertys
interface FighterListProps {
  detailedView?: boolean;  // Optionaler Boolean zur Steuerung der Detailansicht
}

const FighterList: React.FC<FighterListProps> = ({ detailedView = true }) => {
  // Lokaler State für die Kämpferdaten aus dem Backend
  const [backendFighters, setBackendFighters] = useState<Fighter[]>([]);

  // useEffect Hook zur Initialisierung und zum Abruf der Daten beim Laden der Komponente
  useEffect(() => {
    // Asynchrone Funktion zum Laden der Kämpferdaten
    const loadBackendFighters = async () => {
      try {
        const fighters = await getFighters();  // Abrufen der Kämpferdaten

        // Create a copy of fighters array and convert birthdate strings into Date objects.
        const fightersCopy = fighters.map((fighter: Fighter) => ({
          ...fighter,
          birthdate: new Date(fighter.birthdate)
        }));


        // Sortieren der Kämpferdaten
        const sortedFighters = fightersCopy.sort((a: Fighter, b: Fighter) => a.lastname.localeCompare(b.lastname));
        setBackendFighters(sortedFighters);  // Aktualisieren des lokalen States mit den sortierten Daten
      } catch (error) {
        // Fehlermeldung, falls der Abruf der Daten fehlschlägt
        console.error('Error loading backend fighters:', error);
      }
    };




    loadBackendFighters();  // Aufruf der Funktion beim Laden der Komponente
  }, []);


  // Rendern der Komponente
  return (
    <div className="entryList">
      {/* Wenn detailedView true ist, wird der folgende Abschnitt gerendert */}
      {detailedView && (
        <div className="headerBanner">
          <h1 className="titleStyleList">Teilnehmerliste</h1> {/* Nur angezeigt, wenn detailedView = true */}
        </div>
      )}
      {/* Der Container für die Inhalte, abhängig von detailedView */}
      <div className={detailedView ? "contentContainer" : ""}>
        {/* Die Kopfzeile der Tabelle, unabhängig von detailedView */}
        <div className="entryStyle headerStyle">
          <span className="nameStyle">Name</span>
          <span className="clubStyle">Verein</span>
          {/* Wenn detailedView true ist, werden die folgenden Spalten gerendert */}
          {detailedView && (
            <>
              <span className="cityStyle">Stadt</span>
              <span className="idStyle">Teilnehmer-ID</span>
              <span className="weightClassStyle">Gewichtsklasse</span>
              <span className="birthdateStyle">Geburtsdatum</span>
            </>
          )}
        </div>
        {/* Rendern der einzelnen Einträge aus backendFighters */}
        {backendFighters.map((fighter) => {
          // Convert birthdate from string to Date object
          const birthdateAsDate = new Date(fighter.birthdate);

          return (
            <div className="entryStyle" key={fighter.id}>
              <span className="nameStyle">{fighter.lastname} {fighter.firstname}</span>
              <span className="clubStyle">{fighter.club?.name}</span>
              {/* Wenn detailedView true ist, werden die folgenden Spalten gerendert */}
              {detailedView && (
                <>
                  <span className="cityStyle">{fighter.club?.address?.city}</span>
                  <span className="idStyle">{fighter.id}</span>
                  <span className="weightClassStyle">{fighter.weightclass?.name}</span>
                  <span className="birthdateStyle">{birthdateAsDate.toDateString()}</span>
                </>
              )}
            </div>
          );
        })}


      </div>
    </div>
  );


};

export default FighterList;  // Exportieren der Komponente für die Verwendung in anderen Teilen der Anwendung

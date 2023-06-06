import React from 'react';
import './TournamentTable.scss';

// Definieren Sie den Typ 'Fighter' mit den erforderlichen Feldern und einer Index-Signatur für beliebige Felder
type Fighter = {
  id: number;
  firstname: string;
  lastname: string;
  club: string;
  groupNumber: number;
  [key: string]: number | string;
  placement: number;
};

// Definieren Sie den Typ 'Group' mit einem Namen und einer Array von Kämpfern
type Group = {
  name: string;
  fighters: Fighter[];
};

// Definieren Sie die Eigenschaften des TournamentTable-Komponententyps
type TournamentTableProps = {
  groups: Group[];
};

// Deklarieren Sie die TournamentTable-Komponente als Functional Component und geben Sie die Eigenschaften als Argument an
const TournamentTable: React.FC<TournamentTableProps> = ({ groups }) => {
  // Berechnen Sie die Gesamtzahl der Kämpfer in allen Gruppen
  const totalFighters = groups.reduce((total, group) => total + group.fighters.length, 0);

  // Bestimmen Sie die Anzahl der Kämpfe basierend auf der Anzahl der Teilnehmer
  const numFights = totalFighters < 8 ? 3 : 4;

  // Rendern Sie die Tabelle mit den Gruppen und Kämpfern
  return (
    <div className="tournament-table">
      {groups.map((group, index) => (
        // Zeigen Sie nur die erste Tabelle an, wenn es weniger als 8 Kämpfer gibt oder die ersten beiden Gruppen sind
        (totalFighters < 8 || index < 2) && (
          <div key={group.name} className="group">
            <h2>Gruppe {group.name}</h2>
            <table>
              <thead>
                <tr>
                  <th>Los Nummer</th>
                  <th>Vorname</th>
                  <th>Nachname</th>
                  <th>Verein</th>
                  <th>Gruppen Nummer</th>
                  {Array.from({ length: numFights }, (_, i) => i + 1).map((num) => (
                    // Generieren Sie die Spaltenüberschriften für die Kämpfe
                    <th key={`fight${num}`}>Kampf {num}</th>
                  ))}
                  {Array.from({ length: numFights - 2 }, (_, i) => i + 2).map((num) => (
                    // Generieren Sie die Spaltenüberschriften für die Summe der Kämpfe
                    <th key={`sum${num}`}>Summe Kampf {Array.from({ length: num }, (_, i) => i + 1).join('+')}</th>
                  ))}
                  <th>Summe Kampf 1+2+3</th>
                  <th>Platzierung</th>
                </tr>
              </thead>
              <tbody>
                {group.fighters.map((fighter) => (
                  <tr key={fighter.id}>
                    <td>{fighter.id}</td>
                    <td>{fighter.firstname}</td>
                    <td>{fighter.lastname}</td>
                    <td>{fighter.club}</td>
                    <td>{fighter.groupNumber}</td>
                    {Array.from({ length: numFights }, (_, i) => i + 1).map((num) => (
                      // Rendern Sie die Kampfdaten für jeden Kämpfer
                      <td key={`fight${num}`}>{fighter[`fight${num}`]}</td>
                    ))}
                    {Array.from({ length: numFights - 2 }, (_, i) => i + 2).map((num) => {
                      // Berechnen Sie die Summe der Kämpfe für jede Zeile
                      const sum = Array.from({ length: num }, (_, i) => i + 1)
                        .map((n) => `fight${n}`)
                        .reduce((sum, fight) => sum + (parseInt(fighter[fight] as string) || 0), 0);
                      return <td key={`sum${num}`}>{sum}</td>;
                    })}
                    <td>{Array.from({ length: numFights }, (_, i) => i + 1)
                      .map((n) => `fight${n}`)
                      .reduce((sum, fight) => sum + (parseInt(fighter[fight] as string) || 0), 0)}</td>
                    <td>{fighter.placement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ))}
    </div>
  );
};

export default TournamentTable;

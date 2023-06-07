import React from 'react';
import Banner from "../../../Tools/Banner/Banner";

export interface FighterRow {
    fighter: string; // Name des Kämpfers
    victories: number; // Anzahl der Siege
    points: number; // Punktzahl
    club: string; // Verein
}

export interface TournamentShellProps {
    bannerTitle: string;
    fighters: FighterRow[]; // Die Daten für die Tabelle
    children?: React.ReactNode; // Fügt die children Prop hinzu
}

const TournamentShell: React.FC<TournamentShellProps> = ({ bannerTitle, fighters, children }) => {
  return (
    <div className="tournament-shell">
      <Banner title={bannerTitle} />
      
      <table className="tournament-table">
        <thead>
          <tr>
            <th>Kämpfer</th>
            <th>Anzahl Siege</th>
            <th>Punktanzahl</th>
            <th>Verein</th>
          </tr>
        </thead>
        <tbody>
          {fighters.map((fighterRow, index) => (
            <tr key={index}>
              <td>{fighterRow.fighter}</td>
              <td>{fighterRow.victories}</td>
              <td>{fighterRow.points}</td>
              <td>{fighterRow.club}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {children}
    </div>
  );
};

export default TournamentShell;

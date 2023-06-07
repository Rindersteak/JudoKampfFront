import React from 'react';
import { Tournament, Fight, Fighter } from '../../../../types';  


interface TournamentTreeProps {
    tournament: Tournament;
  }
  
  const TournamentTree: React.FC<TournamentTreeProps> = ({ tournament }) => {
    // Beispiele
    const rounds = [
      [
        { id: 1, fighterBlue: tournament.fighters[0], fighterWhite: tournament.fighters[1], blue_wasari: 0, blue_ippon: 0, white_wasari: 0, white_ippon: 0, fight_duration: 0, blue_fouls: 0, white_fouls: 0 },
        { id: 2, fighterBlue: tournament.fighters[2], fighterWhite: tournament.fighters[3], blue_wasari: 0, blue_ippon: 0, white_wasari: 0, white_ippon: 0, fight_duration: 0, blue_fouls: 0, white_fouls: 0 }
      ],
      [
        { id: 3, fighterBlue: tournament.fighters[4], fighterWhite: tournament.fighters[5], blue_wasari: 0, blue_ippon: 0, white_wasari: 0, white_ippon: 0, fight_duration: 0, blue_fouls: 0, white_fouls: 0 }
      ],
      [
        { id: 4, fighterBlue: tournament.fighters[6], fighterWhite: tournament.fighters[7], blue_wasari: 0, blue_ippon: 0, white_wasari: 0, white_ippon: 0, fight_duration: 0, blue_fouls: 0, white_fouls: 0 }
      ]
    ];
  
    return (
      <div className="tournament-tree">
        {rounds.map((round, i) => (
          <div key={i} className={`round round-${i}`}>
            {round.map((fight: Fight) => (
              <div key={fight.id} className="fight">
                <div className="fighter">{fight.fighterBlue.firstname} {fight.fighterBlue.lastname}</div>
                <div className="vs">vs</div>
                <div className="fighter">{fight.fighterWhite.firstname} {fight.fighterWhite.lastname}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  export default TournamentTree;
import React, { useEffect, useState } from 'react';
import { getFightList, getFightersList, getWinner } from '../../../../API/fightAPI';
import TournamentBonsai from '../TournamentObjects/TournamentBonsai';
import Banner from '../../../../Tools/Banner/Banner';
import { Fight, Fighter, Fightgroup } from '../../../../types';
import { useNavigate } from 'react-router-dom';
import { getFightgroup } from '../../../../API/fightGroupAPI';
import {
  SingleEliminationBracket,
  Match as TournamentMatch,
  MATCH_STATES,
  SVGViewer,
} from '@g-loot/react-tournament-brackets';
import '../TreeStyles.scss';

interface FighterRow {
  fighter: string; 
  victories: number;
  points: number; 
  club: string; 
}

interface TreeForTwoProps {
  fightgroupId: number;
}

interface MatchProps {
  id: string;
  nextMatchId: string;
  startTime: string;
  state: string;
  participants: Array<string>;
}

const TreeForTwo: React.FC<TreeForTwoProps> = ({ fightgroupId }) => {
  const [fights, setFights] = useState<MatchProps[]>([]);
  const [winners, setWinners] = useState<Fighter[]>([]);
  const [fightersList, setFightersList] = useState<FighterRow[]>([]);
  const [bannerTitle, setBannerTitle] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFightData() {
      try {
        const fightgroup: Fightgroup = await getFightgroup(fightgroupId);
        const relevantFights = fightgroup.fights.slice(0, 3);
        const winnerPromises = relevantFights.map((fight) => getWinner(fight.id));
        const winnerData = await Promise.all(winnerPromises);
        setWinners(winnerData);
        const fighterRows = fightgroup.fighters.map((fighter) => ({
          fighter: `${fighter.firstname} ${fighter.lastname}`,
          victories: 0,
          points: 0,
          club: fighter.club.name,
        }));
        setFightersList(fighterRows);
      } catch (error) {
        console.error('Fehler beim Abrufen der Kampfdaten:', error);
      }
    }

    fetchFightData();
  }, [fightgroupId]);

  useEffect(() => {
    async function fetchFights() {
      try {
        const fightList = await getFightList(fightgroupId);
        const matchComponents = fightList.fights.map((fight) => {
          const match: MatchProps = {
            id: fight.id.toString(),
            nextMatchId: '',
            startTime: '',
            state: MATCH_STATES.UNDECIDED,
            participants: [], 
          };
          return match;
        });
        setFights(matchComponents);
      } catch (error) {
        console.error('Error loading fight list:', error);
      }
    }
    

    fetchFights();
  }, [fightgroupId]);

  return (
    <div className="tournament-shell">
      <Banner subtitle={bannerTitle} />
      <div className="tournament-table">
        <table className="tableStyle">
          <thead>
            <tr>
              <th className="headerCell">Kämpfer</th>
              <th className="headerCell">Anzahl Siege</th>
              <th className="headerCell">Anzahl Punkte</th>
              <th className="headerCell">Club</th>
            </tr>
          </thead>
          <tbody>
            {fightersList.map((fighterRow, index) => (
              <tr key={index}>
                <td className="dataCell">{fighterRow.fighter}</td>
                <td className="dataCell">{fighterRow.victories}</td>
                <td className="dataCell">{fighterRow.points}</td>
                <td className="dataCell">{fighterRow.club}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bracket-container">
        <SVGViewer>
          <SingleEliminationBracket
            matches={fights}
            matchComponent={TournamentMatch}
            matchWidth={180}
            matchHeight={80}
            roundTitleComponent={(roundTitleProps) => <div {...roundTitleProps} />}
          />
        </SVGViewer>
      </div>
    </div>
  );
};

export default TreeForTwo;

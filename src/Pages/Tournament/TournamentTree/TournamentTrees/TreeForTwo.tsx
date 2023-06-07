import React, { useEffect, useState } from 'react';
import { getFightList, getFightersList, getWinner } from '../../../../API/fightAPI';
import TournamentBonsai from '../TournamentObjects/TournamentBonsai';
import PageShell, { FighterRow} from '../PageShell';
import { Fight, Fighter } from '../../../../types';

interface TreeForTwoProps {
  fightgroupId: number;
  bannerTitle: string;
}

const TreeForTwo: React.FC<TreeForTwoProps> = ({ fightgroupId, bannerTitle }) => {
  const [fights, setFights] = useState<Fight[]>([]);
  const [winners, setWinners] = useState<Fighter[]>([]);
  const [fightersList, setFightersList] = useState<FighterRow[]>([]);

  useEffect(() => {
    async function fetchFightData() {
      try {
        const fightgroup = await getFightList(fightgroupId);
        const relevantFights = fightgroup.fights.slice(0, 3);
        setFights(relevantFights);

        const winnerPromises = relevantFights.map((fight) => getWinner(fight.id));
        const winnerData = await Promise.all(winnerPromises);
        setWinners(winnerData);

        const fighters = await getFightersList(fightgroupId);
        const fighterRows = fighters.map((fighter) => ({
          fighter: `${fighter.firstname} ${fighter.lastname}`,
          victories: 0, // Es fehlen Informationen, um die Anzahl der Siege zu bestimmen
          points: 0, // Es fehlen Informationen, um die Punktzahl zu bestimmen
          club: fighter.club.name,
        }));
        setFightersList(fighterRows);
      } catch (error) {
        console.error('Error fetching fight data:', error);
      }
    }

    fetchFightData();
  }, [fightgroupId]);

  return (
    <PageShell bannerTitle={bannerTitle} fighters={fightersList}>
      {fights.map((fight, index) => (
        <TournamentBonsai
          key={index}
          pair={{
            firstNameBlue: fight.fighterBlue.firstname,
            lastNameBlue: fight.fighterBlue.lastname,
            clubBlue: fight.fighterBlue.club.name,
            firstNameWhite: fight.fighterWhite.firstname,
            lastNameWhite: fight.fighterWhite.lastname,
            clubWhite: fight.fighterWhite.club.name,
          }}
          winner={{
            firstName: winners[index].firstname,
            lastName: winners[index].lastname,
            club: winners[index].club.name,
          }}
        />
      ))}
    </PageShell>
  );
};

export default TreeForTwo;
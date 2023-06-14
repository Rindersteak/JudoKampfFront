import React, { useEffect, useState } from "react";
import {
  getFightList,
  getFightersList,
  getWinner,
} from "../../../../API/fightAPI";
import TournamentBonsai from "../TournamentObjects/TournamentBonsai";
import Banner from "../../../../Tools/Banner/Banner";
import { Fight, Fighter, Fightgroup } from "../../../../types";
import { useNavigate } from "react-router-dom";
import { getFightgroup } from "../../../../API/fightGroupAPI";
import "../TreeStyles.scss";

export interface FighterRow {
  fighter: string; // Name des Kämpfers
  victories: number; // Anzahl der Siege
  points: number; // Punktzahl
  club?: string; // Verein
}

interface TreeForTwoProps {
  fightgroupId: number;
}

const TreeForTwo: React.FC<TreeForTwoProps> = ({ fightgroupId }) => {
  const [fights, setFights] = useState<Fight[]>([]);
  const [winners, setWinners] = useState<Fighter[]>([]);
  const [fightersList, setFightersList] = useState<FighterRow[]>([]);
  const [bannerTitle, setBannerTitle] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFightData() {
      try {
        const fightgroup: Fightgroup = await getFightgroup(fightgroupId);
        const relevantFights = fightgroup.fights.slice(0, 3);
        setFights(relevantFights);

        const bannerTitle = `Tournieransicht für ${fightgroup.fighters.length} Kämpfer\nGewichtsklasse ${fightgroup.weightclass.name}, Altersklasse ${fightgroup.ageclass.name}`;
        setBannerTitle(bannerTitle);

        const winnerPromises = relevantFights.map((fight) =>
          getWinner(fight.id)
        );
        const winnerData = await Promise.all(winnerPromises);
        setWinners(winnerData);

        const fighters = await getFightersList(fightgroupId);
        const fighterRows = fighters.map((fighter) => ({
          fighter: `${fighter.firstname} ${fighter.lastname}`,
          victories: 0,
          points: 0,
          club: fighter.club.name,
        }));
        setFightersList(fighterRows);
      } catch (error) {
        console.error("Error fetching fight data:", error);
      }
    }

    fetchFightData();
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
              <th className="headerCell">Punktanzahl</th>
              <th className="headerCell">Verein</th>
            </tr>
          </thead>
          <tbody>
            {fightersList.map((fighterRow, index) => (
              <tr className="entryStyle" key={index}>
                <td>{fighterRow.fighter}</td>
                <td>{fighterRow.victories}</td>
                <td>{fighterRow.points}</td>
                <td>{fighterRow.club}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TreeForTwo;

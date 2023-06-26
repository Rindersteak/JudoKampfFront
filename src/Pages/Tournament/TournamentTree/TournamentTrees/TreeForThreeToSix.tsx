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
import { getFightersListByFightgroupId } from "../../../../API/fightGroupAPI";

export interface FighterRow {
  fighter: string; 
  victories: number;
  points: number;
  club?: string;
}

interface TreeForThreeToSixProps {
  fightgroupId: number;
}

const TreeForThreeToSix: React.FC<TreeForThreeToSixProps> = ({ fightgroupId }) => {
  const [fights, setFights] = useState<Fight[]>([]);
  const [winners, setWinners] = useState<Fighter[]>([]);
  const [fightersList, setFightersList] = useState<FighterRow[]>([]);
  const [bannerTitle, setBannerTitle] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFightData() {
      try {
        const fightgroup: Fightgroup = await getFightgroup(fightgroupId);

        const fighters = await getFightersListByFightgroupId(fightgroupId);
        const fighterRows = fighters.map((fighter) => ({
          fighter: `${fighter.firstname} ${fighter.lastname}`,
          victories: 0,
          points: 0,
          club: fighter.club.name,
        }));
        setFightersList(fighterRows);

        // setting the banner title
        const bannerTitle = `Tournieransicht für ${fighters.length} Kämpfer\nGewichtsklasse ${fightgroup.weightclass.name}, Altersklasse ${fightgroup.ageclass.name}`;
        setBannerTitle(bannerTitle);
      } catch (error) {
        console.error("Error fetching fight data:", error);
      }
    }

    fetchFightData();
  }, [fightgroupId]);

  const handleStartFight1 = () => {
    navigate("/fight-details"); 
  };

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
              <tr key={index}>
                <td>{fighterRow.fighter}</td>
                <td>{fighterRow.victories}</td>
                <td>{fighterRow.points}</td>
                <td>{fighterRow.club}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="redButton" onClick={handleStartFight1}>
        Kampf 1 starten
      </button>
    </div>
  );
};

export default TreeForThreeToSix;

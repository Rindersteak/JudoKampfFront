import React, { useEffect, useState } from "react";
import {
  getFightList,
  getFightersList,
  getWinner,
} from "../../../../API/fightAPI";
import TournamentBonsai from "../TournamentObjects/TournamentBonsai";
import Banner from "../../../../Tools/Banner/Banner";
import { Fight, Fighter, Fightgroup, Fightpool } from "../../../../types";
import { useNavigate } from "react-router-dom";
import { getFightgroup } from "../../../../API/fightGroupAPI";
import "../TreeStyles.scss";
import { getFightersListByFightgroupId, getFightpoolsByFightgroupId } from "../../../../API/fightGroupAPI";
import { getAllFightPools } from "../../../../API/fightPoolAPI";
import Modal from '../../../../Tools/Modal/Modal';
import FightDetails from "../../../Fight/FightDetails/FightDetails";

export interface FighterRow {
  id: number;
  fighter: string;
  victories: number;
  points: number;
  club?: string;
}

interface TreeForSevenToEightProps {
  fightgroupId: number;
}

const TreeForSevenToEight: React.FC<TreeForSevenToEightProps> = ({ fightgroupId }) => {
  const [fights, setFights] = useState<Fight[]>([]);
  const [winners, setWinners] = useState<Fighter[]>([]);
  const [fightersList, setFightersList] = useState<FighterRow[]>([]);
  const [bannerTitle, setBannerTitle] = useState<string>("");
  const [bannerSubtitle, setBannerSubtitle] = useState<string>("");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFightId, setSelectedFightId] = useState<number | null>(null);


  const [fightPools, setFightPools] = useState<Fightpool[]>([]);




  const handleStartFight = (fightId: number) => {
    setSelectedFightId(fightId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedFightId(null);
    setIsModalOpen(false);
  };


  function getFightsFromFightPools() {
    return fightPools.flatMap(pool => pool && pool.fights ? pool.fights : []);
  }

  function getFightersFromPool(pool: Fightpool, fightersList: FighterRow[]) {
    if (pool && pool.fights) {
      const fighterIdsFromPool = pool.fights.flatMap(fight => [fight.fighterBlue?.id, fight.fighterWhite?.id]);
      return fightersList.filter((fighterRow: FighterRow) => fighterIdsFromPool.includes(fighterRow.id));
    }
    return [];
  }


  useEffect(() => {
    async function fetchFightData() {
      try {
        const fightgroup: Fightgroup = await getFightgroup(fightgroupId);

        const fighters = await getFightersListByFightgroupId(fightgroupId);
        const fighterRows = fighters.map((fighter) => ({
          id: fighter.id,
          fighter: `${fighter.firstname} ${fighter.lastname}`,
          victories: 0,
          points: 0,
          club: fighter.club.name,
        }));
        setFightersList(fighterRows);

        const bannerTitle = `Turnieransicht für ${fighters.length} Kämpfer`;
        const bannerSubtitle = `Gewichtsklasse ${fightgroup.weightclass.name}, Altersklasse ${fightgroup.ageclass.name}`;
        setBannerTitle(bannerTitle);
        setBannerSubtitle(bannerSubtitle);
      } catch (error) {
        console.error("Error fetching fight data:", error);
      }
    }

    fetchFightData();
  }, [fightgroupId]);



  useEffect(() => {
    async function fetchFightPools() {
      try {
        const pools = await getFightpoolsByFightgroupId(fightgroupId);
        setFightPools(pools);
      } catch (error) {
        console.error("Error fetching fight pools:", error);
      }
    }
    fetchFightPools();
  }, [fightgroupId]);

// Extracting fights from each pool
  const fightsFromPool1 = fightPools.length ? fightPools[0].fights : [];
  const fightsFromPool2 = fightPools.length > 1 ? fightPools[1].fights : [];



  return (
      <div className="tournament-shell">
        <Banner title={bannerTitle} subtitle={bannerSubtitle} />

        <div className="tournament-table">
          {/* Table 1 */}
          <table className="tableStyle">
            <caption>Pool 1</caption>
            <thead>
            <tr>
              <th className="headerCell">Kämpfer</th>
              <th className="headerCell">Anzahl Siege</th>
              <th className="headerCell">Punktanzahl</th>
              <th className="headerCell">Verein</th>
            </tr>
            </thead>
            <tbody>

            {getFightersFromPool(fightPools[0], fightersList).map((fighterRow, index) => (
                <tr key={index}>
                  <td>{fighterRow.fighter}</td>
                  <td>{fighterRow.victories}</td>
                  <td>{fighterRow.points}</td>
                  <td>{fighterRow.club}</td>
                </tr>
            ))}
            </tbody>
          </table>

          {/* Table 2 */}
          {fightPools.length > 1 && (
              <table className="tableStyle">
                <caption>Pool 2</caption>
                <thead>
                <tr>
                  <th className="headerCell">Kämpfer</th>
                  <th className="headerCell">Anzahl Siege</th>
                  <th className="headerCell">Punktanzahl</th>
                  <th className="headerCell">Verein</th>
                </tr>
                </thead>
                <tbody>
                {getFightersFromPool(fightPools[1], fightersList).map((fighterRow, index) => (
                    <tr key={index}>
                      <td>{fighterRow.fighter}</td>
                      <td>{fighterRow.victories}</td>
                      <td>{fighterRow.points}</td>
                      <td>{fighterRow.club}</td>
                    </tr>
                ))}
                </tbody>
              </table>
          )}
        </div>


        <div className="titleStyle">
          <h1> Kämpfe</h1>
        </div>

        {fightPools.map((pool: Fightpool, poolIndex: number) => (
            <table className="tableStyle" key={poolIndex}>
              <caption>{`Pool ${poolIndex + 1}`}</caption>
              <thead>
              <tr>
                <th className="headerCell">Blauer Kämpfer</th>
                <th className="headerCell">Weißer Kämpfer</th>
                <th className="headerCell">Gewinner</th>
                <th className="headerCell">Aktionen</th>
              </tr>
              </thead>
              <tbody>
              {pool.fights.map((fight: Fight, fightIndex: number) => (
                  <tr key={fightIndex}>
                    <td>{`${fight.fighterBlue?.firstname || 'N/A'} ${fight.fighterBlue?.lastname || 'N/A'}`}</td>
                    <td>{`${fight.fighterWhite?.firstname || 'N/A'} ${fight.fighterWhite?.lastname || 'N/A'}`}</td>
                    <td>{`${fight.winner?.firstname || 'Kampf nicht gestartet'} ${fight.winner?.lastname || ''}`}</td>
                    <td>
                      <div className="buttonContainer">
                        <button className="blueButton" onClick={() => handleStartFight(fight.id)}>
                          Kampf starten
                        </button>
                      </div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        ))}



        {isModalOpen && selectedFightId && (
            <Modal size="xxl" onClose={handleCloseModal}>
              <FightDetails fightId={selectedFightId} />
            </Modal>
        )}
      </div>
  );
};

export default TreeForSevenToEight;

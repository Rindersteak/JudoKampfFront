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
import { getFightersListByFightgroupId } from "../../../../API/fightGroupAPI";
import { getAllFightPools } from "../../../../API/fightPoolAPI";
import Modal from '../../../../Tools/Modal/Modal';
import FightDetails from "../../../Fight/FightDetails/FightDetails";
import ConfirmDelete from "../../../../Tools/ConfirmDelete/ConfirmDelete";


export interface FighterRow {
  fighter: string;
  victories: number;
  points: number;
  club?: string;
}

interface TreeForTwoProps {
  fightgroupId: number;
}

const TreeForTwo: React.FC<TreeForTwoProps> = ({ fightgroupId }) => {
  const [fights, setFights] = useState<Fight[]>([]);
  const [winners, setWinners] = useState<Fighter[]>([]);
  const [fightersList, setFightersList] = useState<FighterRow[]>([]);
  const [bannerTitle, setBannerTitle] = useState<string>("");
  const [bannerSubtitle, setBannerSubtitle] = useState<string>("");
  const navigate = useNavigate();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFightId, setSelectedFightId] = useState<number | null>(null);

  const handleStartFight = (fightId: number) => {
    setSelectedFightId(fightId); // Setze den ausgewählten Kampf
    setIsModalOpen(true); // Öffne das Modal
  };

  const handleCloseModal = () => {
    setSelectedFightId(null); // Entferne den ausgewählten Kampf
    setIsModalOpen(false); // Schließe das Modal
  };
  function getFightsFromFightPools() {
    return fightPools.flatMap(pool => pool.fights);
  }

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

  const [fightPools, setFightPools] = useState<Fightpool[]>([]);

  useEffect(() => {
    async function fetchFightPools() {
      try {
        const pools = await getAllFightPools();
        setFightPools(pools);
      } catch (error) {
        console.error("Error fetching fight pools:", error);
      }
    }
    fetchFightPools();
  }, []);


  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [fightID, setFightID] = useState(-1);
  const handleModalClose = () => {
    setShowConfirmDeletePopup(false);
  };

  const handleConfirmed = async () => {
    handleStartFight(fightID)
    handleModalClose();
  };

  const handleOpenModal = (fightID:number) => {
    setFightID(fightID);
    setShowConfirmDeletePopup(true);
  }

  return (
      <div className="tournament-shell">
        <Banner title={bannerTitle} subtitle={bannerSubtitle} />

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
        <div className="titleStyle">
          <h1> Kämpfe</h1>
        </div>
        <div className="tournament-table">
          <table className="tableStyle">
            <thead>
            <tr>
              <th className="headerCell">Blauer Kämpfer</th>
              <th className="headerCell">Weißer Kämpfer</th>
              <th className="headerCell">Gewinner</th>
              <th className="headerCell">Aktionen</th>
            </tr>
            </thead>
            <tbody>
            {getFightsFromFightPools().map((fight: Fight, index: number) => (
                <tr key={index}>
                  <td>{`${fight.fighterBlue?.firstname || 'N/A'} ${fight.fighterBlue?.lastname || 'N/A'}`}</td>
                  <td>{`${fight.fighterWhite?.firstname || 'N/A'} ${fight.fighterWhite?.lastname || 'N/A'}`}</td>
                  <td>{`${fight.winner?.firstname || 'Kampf nicht gestartet'} ${fight.winner?.lastname || ''}`}</td>
                  <td>
                    <div className="buttonContainer">
                    <button className="blueButton" onClick={() => handleOpenModal(fight.id)}>
                          Kampf starten
                    </button>
                    </div>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        {showConfirmDeletePopup && (
          <Modal size="small" onClose={handleModalClose}>
            <ConfirmDelete
              onClose={handleModalClose}
              onConfirmDelete={handleConfirmed}
              text="Möchten Sie den Kampf wirklich starten?"
              subTextAvailable = {true}
              subText="Hinweis: Nach Kampfstart können die Turnierklassen nicht mehr geändert werden! Sofern einer Turniergruppe nur ein Teilnehmer zugeordnet ist, sollten die Gewichts-klassen in den Einstellungen des Turniers entsprechend angepasst werden."
              topButtonClassName="#b40000"
              bottomButtonClassName="#001aff"
              buttonTextBlue="Nein, Zurück"
              buttonTextRed="Ja, starten"
            />
          </Modal>
        )}


        {isModalOpen && selectedFightId && (
            <Modal size="xxl" onClose={handleCloseModal}>
              <FightDetails fightId={selectedFightId} />
            </Modal>
        )}

      </div>
  );

};

export default TreeForTwo;

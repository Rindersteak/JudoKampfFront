import React, { useEffect, useState } from "react";
import { Fight, Fightgroup } from "../../types";
import {
  getFightgroupsByTournamentId,
  getFightersListByFightgroupId,
  createFightPools,
} from  "../../API/fightGroupAPI";
import { getFight } from "../../API/fightAPI";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { getFightTreeComponent } from "../../Tools/FightTree/FightTreeComponents";
import "./FightGroupList.scss";
import ConfirmDelete from "../../Tools/ConfirmDelete/ConfirmDelete";
import Modal from "../../Tools/Modal/Modal";

interface FightGroupListProps {
  tournamentId?: string;
  onClose: () => void;
}




const FightGroupList: React.FC<FightGroupListProps> = ({
  tournamentId, onClose
}) => {
  const [fightGroups, setFightGroups] = useState<Fightgroup[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<string>("gender");
  const navigate = useNavigate();
  const [selectedFightId, setSelectedFightId] = useState<number | null>(null);
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [groupId, setgroupId] = useState(-2);
  const [loadedFightGroups, setloadedFightGroups] = useState(-1); 

  const handleModalClose = () => {
    setShowConfirmDeletePopup(false);
  };

  const handleOpenModal = (groupId:number) => {
    setShowConfirmDeletePopup(true);
  }

  const handleConfirmed = async () => {
    createFightPools(tournamentId||"")
    setloadedFightGroups(loadedFightGroups);
    handleModalClose();
  };


  // für den Turnier-Starten-Button
  const handleStartTournament = () => {
    handleOpenModal(groupId);
  };
  


  useEffect(() => {
    const loadFightGroups = async () => {
      try {
        if (tournamentId) {
          const groups = await getFightgroupsByTournamentId(
            parseInt(tournamentId)
          );

          setFightGroups(groups);
        }
      } catch (error) {
        console.error("Error loading fight groups:", error);
      }
    };

    loadFightGroups();
  }, [tournamentId]);

  const handleSortClick = (column: string) => {
    setSortColumn(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleRowClick = async (group: Fightgroup | null) => {
    try {
      if (group) {
        const fight = await getFight();
        setFightGroups([group]);
        const treeComponent = await getFightTreeComponent(group);
        const { component, id, count } = treeComponent;

  
        let pageName;
        if (count < 2) {
          pageName = "none";
        } else if (count == 2) {
          pageName = "two";
        } else if (count >= 3 && count <= 6) {
          pageName = "three-to-six";
        } else if (count >= 7 && count <= 8) {
          pageName = "seven-to-eight";
        } else {
          pageName = "more-than-eight";
        }
  
        const path = `/tree-for-${pageName}/${group.id.toString()}`;
  
        navigate(path, {
          state: { bannerTitle: group.name, element: component },
        });
  
        onClose(); 
      }
    } catch (error) {
      console.error("Error loading fight:", error);
    }
  };
  
  
  
  

  useEffect(() => {
    const loadSortedFightGroups = async () => {
      const sortedFightGroups = await Promise.all(
        fightGroups.map(async (group: Fightgroup) => {
          const setloadedFightGroups = group;
          try {
            const fighters = await getFightersListByFightgroupId(group.id);

            return {
              group,
              participants: fighters.length, 
            };
          } catch (error) {
            console.error("Error fetching fighters list:", error);
            return null;
          }
        })
      );


      const filteredFightGroups = sortedFightGroups.filter(
        (item) => item !== null
      ) as { group: Fightgroup; participants: number }[];


      // Sortierung für Filter
      
      filteredFightGroups.sort((a, b) => {
        if (sortColumn === "gender") {
          return sortOrder === "asc"
            ? a.group.sex.localeCompare(b.group.sex)
            : b.group.sex.localeCompare(a.group.sex);
        } else if (sortColumn === "ageclass") {
          const aValue = a.group.ageclass ? a.group.ageclass.name : "";
          const bValue = b.group.ageclass ? b.group.ageclass.name : "";
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (sortColumn === "weightclass") {
          const aValue = a.group.weightclass ? a.group.weightclass.name : "";
          const bValue = b.group.weightclass ? b.group.weightclass.name : "";
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (sortColumn === "participants") {
          return sortOrder === "asc"
            ? a.participants - b.participants
            : b.participants - a.participants;
        }
        return 0;
      });
      

      setSortedFightGroups(filteredFightGroups);
    };

    loadSortedFightGroups();
  }, [fightGroups, sortColumn, sortOrder]);

  const [sortedFightGroups, setSortedFightGroups] = useState<
    { group: Fightgroup; participants: number }[]
  >([]);

  return (
    <div className="fightGroupList">
      {/* CSS-Klasse für FightGroupList hinzugefügt */}
      <div className="topContainerFightGroupList">
        <div></div>
        <div className="headerBanner">
        <h1 className="titleStyleList">Kampfgruppen</h1>
        </div>

        <button className="blueButton buttonThin"  onClick={handleStartTournament}>
          Turnier starten
        </button>
      </div>
      <div className="listContainer">
        <table className="tableStyle tableMinWidth">
          <thead>
            <tr>
              <th className="headerCell">
                Geschlecht
                <button
                  className="arrowButton"
                  onClick={() => handleSortClick("gender")}
                >
                  {sortOrder === "asc" && sortColumn === "gender" ? (
                    <FontAwesomeIcon icon={faArrowDown} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}
                </button>
              </th>
              <th className="headerCell">
                Jugend/Erwachsene
                <button
                  className="arrowButton"
                  onClick={() => handleSortClick("ageclass")}
                >
                  {sortOrder === "asc" && sortColumn === "ageclass" ? (
                    <FontAwesomeIcon icon={faArrowDown} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}
                </button>
              </th>
              <th className="headerCell">
                Gewichtsklasse
                <button
                  className="arrowButton"
                  onClick={() => handleSortClick("weightclass")}
                >
                  {sortOrder === "asc" && sortColumn === "weightclass" ? (
                    <FontAwesomeIcon icon={faArrowDown} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}
                </button>
              </th>
              <th className="headerCell">
                Altersklasse
                <button
                  className="arrowButton"
                  onClick={() => handleSortClick("ageclass")}
                >
                  {sortOrder === "asc" && sortColumn === "ageclass" ? (
                    <FontAwesomeIcon icon={faArrowDown} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}
                </button>
              </th>
              <th className="headerCell">
                Teilnehmeranzahl
                <button
                  className="arrowButton"
                  onClick={() => handleSortClick("participants")}
                >
                  {sortOrder === "asc" && sortColumn === "participants" ? (
                    <FontAwesomeIcon icon={faArrowDown} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowUp} />
                  )}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
          {sortedFightGroups.map((item) => (
  <tr key={item.group.id} onClick={() => handleRowClick(item.group)}>
    <td>{item.group.sex}</td>
    <td>{item.group.name}</td>
    <td>{item.group.weightclass ? item.group.weightclass.name : "N/A"}</td>
<td>{item.group.ageclass ? item.group.ageclass.name : "N/A"}</td>
    <td>{item.participants}</td>
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
              text="Möchten Sie das Turnier wirklich starten?"
              subTextAvailable = {true}
              subText="Hinweis: Nach Kampfstart können die Turnierklassen nicht mehr geändert werden! Sofern einer Turniergruppe nur ein Teilnehmer zugeordnet ist, sollten die Gewichts-klassen in den Einstellungen des Turniers entsprechend angepasst werden."
              topButtonClassName="#b40000"
              bottomButtonClassName="#001aff"
              buttonTextBlue="Nein, Zurück"
              buttonTextRed="Ja, starten"
            />
          </Modal>
        )}
    </div>
  );
};

export default FightGroupList;

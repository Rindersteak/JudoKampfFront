import React, { useEffect, useState } from "react";
import { Fight, Fightgroup } from "../../types";
import { getFightgroupsByTournamentId } from "../../API/fightGroupAPI";
import { getFight } from "../../API/fightAPI";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { getFightTreeComponent } from "../../Tools/FightTree/FightTreeComponents";
import "./FightGroupList.scss";

interface FightGroupListProps {
  tournamentId?: string;
  onClose: () => void;
}

const FightGroupList: React.FC<FightGroupListProps> = ({ tournamentId }) => {
  const [fightGroups, setFightGroups] = useState<Fightgroup[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<string>("gender");
  const navigate = useNavigate();

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



  const handleRowClick = async (group: Fightgroup) => {
    try {
      const fight = await getFight();
      setFightGroups([group]); // Update the state with the new group
  
      const { component, id, count } = getFightTreeComponent(group); // Get the appropriate component based on the number of fighters
  
      let pageName;
      if (count < 2) {
        pageName = "none";
      } else if (count >= 3 && count <= 6) {
        pageName = "three-to-six";
      } else if (count >= 7 && count <= 8) {
        pageName = "seven-to-eight";
      } else {
        pageName = "more-than-eight";
      }
  
      // Now use the pageName in the path
      const path = `/tree-for-${pageName}/${id}`;
  
      navigate(path, {
        state: { bannerTitle: group.name, element: component },
      });
    } catch (error) {
      console.error("Error loading fight:", error);
    }
  };
  
  
  


  const sortedFightGroups = fightGroups.sort((a: Fightgroup, b: Fightgroup) => {
    if (sortColumn === "gender") {
      return sortOrder === "asc"
        ? a.sex.localeCompare(b.sex)
        : b.sex.localeCompare(a.sex);
    } else if (sortColumn === "ageclass") {
      return sortOrder === "asc"
        ? a.ageclass.name.localeCompare(b.ageclass.name)
        : b.ageclass.name.localeCompare(a.ageclass.name);
    } else if (sortColumn === "weightclass") {
      return sortOrder === "asc"
        ? a.weightclass.name.localeCompare(b.weightclass.name)
        : b.weightclass.name.localeCompare(a.weightclass.name);
    } else if (sortColumn === "participants") {
      return sortOrder === "asc"
        ? a.fighters.length - b.fighters.length
        : b.fighters.length - a.fighters.length;
    }
    return 0;
  });

  return (
    <div className="fightGroupList">
      {" "}
      {/* CSS-Klasse für FightGroupList hinzugefügt */}
      <div className="headerBanner">
        <h1 className="titleStyleList">Kampfgruppen</h1>
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
            {sortedFightGroups.map((group) => (
              <tr key={group.id} onClick={() => handleRowClick(group)}>
                <td>{group.sex}</td>
                <td>{group.ageclass.name}</td>
                <td>{group.weightclass.name}</td>
                <td>{group.ageclass.name}</td>
                <td>{group.fighters.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FightGroupList;

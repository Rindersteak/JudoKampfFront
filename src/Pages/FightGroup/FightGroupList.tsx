import React, { useEffect, useState } from "react";
import { Fight, Fightgroup } from "../../types";
import {
  getFightgroupsByTournamentId,
  getFightersListByFightgroupId,
} from "../../API/fightGroupAPI";
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

const FightGroupList: React.FC<FightGroupListProps> = ({
  tournamentId,
}) => {
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
      }
    } catch (error) {
      console.error("Error loading fight:", error);
    }
  };

  useEffect(() => {
    const loadSortedFightGroups = async () => {
      const sortedFightGroups = await Promise.all(
        fightGroups.map(async (group: Fightgroup) => {
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

      filteredFightGroups.sort((a, b) => {
        if (sortColumn === "gender") {
          // Sorting logic based on gender
        } else if (sortColumn === "ageclass") {
          // Sorting logic based on age class
        } else if (sortColumn === "weightclass") {
          // Sorting logic based on weight class
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
            {sortedFightGroups.map((item) => (
              <tr
                key={item.group.id}
                onClick={() => handleRowClick(item.group)}
              >
                <td>{item.group.sex}</td>
                <td>{item.group.ageclass.name}</td>
                <td>{item.group.weightclass.name}</td>
                <td>{item.group.ageclass.name}</td>
                <td>{item.participants}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FightGroupList;

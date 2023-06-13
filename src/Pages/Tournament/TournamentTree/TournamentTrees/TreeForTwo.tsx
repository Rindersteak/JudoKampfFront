import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./FightGroupList.scss";

interface FightGroupListProps {
  tournamentId?: string;
  onClose: () => void;
}

const FightGroupList: React.FC<FightGroupListProps> = ({ tournamentId }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<string>("gender");
  const navigate = useNavigate();

  return (
    <div className="fightGroupList">
      {" "}
      {/* CSS-Klasse für FightGroupList hinzugefügt */}
      <div className="headerBanner">
        <h1 className="titleStyleList">Kampfgruppen</h1>
      </div>
      <div className="listContainer"></div>
    </div>
  );
};

export default FightGroupList;

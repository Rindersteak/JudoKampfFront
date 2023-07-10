// Nicht verwendet (Geplant für Baum)

import React from "react";
import "../TreeStyles.scss";

export interface ITournamentPair {
  firstNameBlue: string;
  lastNameBlue: string;
  clubBlue: string;
  firstNameWhite: string;
  lastNameWhite: string;
  clubWhite: string;
}

const TournamentPair: React.FC<ITournamentPair> = ({
  firstNameBlue,
  lastNameBlue,
  clubBlue,
  firstNameWhite,
  lastNameWhite,
  clubWhite,
}) => {
  return (
    <div className="treePair">
      <div className="fighter">
        <p>
          {firstNameBlue} {lastNameBlue}
        </p>
        <p>{clubBlue}</p>
      </div>
      <div className="pairLine"></div>
      <div className="fighter">
        <p>
          {firstNameWhite} {lastNameWhite}
        </p>
        <p>{clubWhite}</p>
      </div>
    </div>
  );
};

export default TournamentPair;

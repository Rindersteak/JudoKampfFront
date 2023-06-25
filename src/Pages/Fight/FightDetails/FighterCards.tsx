import React, { useState, useEffect } from "react";
import RedCard from "./RedCard";
import YellowCard from "./YellowCard";

const FighterCards = () => {
  const [redCardFighterWhite1, setRedCardFighterWhite1] = useState(false);
  const [yellowCardFighterWhite2, setYellowCardFighterWhite2] = useState(false);
  const [yellowCardFighterWhite3, setYellowCardFighterWhite3] = useState(false);
  const [redCardFighterBlue4, setRedCardFighterBlue4] = useState(false);
  const [yellowCardFighterBlue5, setYellowCardFighterBlue5] = useState(false);
  const [yellowCardFighterBlue6, setYellowCardFighterBlue6] = useState(false);

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === "a") {
      if (!yellowCardFighterWhite3) {
        setYellowCardFighterWhite3(true);
      } else if (!yellowCardFighterWhite2) {
        setYellowCardFighterWhite2(true);
      } else if (!redCardFighterWhite1) {
        setRedCardFighterWhite1(true);
      } else {
        setRedCardFighterWhite1(false);
        setYellowCardFighterWhite2(false);
        setYellowCardFighterWhite3(false);
      }
    } else if (event.key === "d") {
      if (!yellowCardFighterBlue6) {
        setYellowCardFighterBlue6(true);
      } else if (!yellowCardFighterBlue5) {
        setYellowCardFighterBlue5(true);
      } else if (!redCardFighterBlue4) {
        setRedCardFighterBlue4(true);
      } else {
        setRedCardFighterBlue4(false);
        setYellowCardFighterBlue5(false);
        setYellowCardFighterBlue6(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    redCardFighterWhite1,
    yellowCardFighterWhite2,
    yellowCardFighterWhite3,
    redCardFighterBlue4,
    yellowCardFighterBlue5,
    yellowCardFighterBlue6,
  ]);

  return (
    <div>
      <RedCard />
      {redCardFighterWhite1 && (
        <span style={{ textAlign: "center", color: "black" }}>1</span>
      )}

      <YellowCard />
      {yellowCardFighterWhite2 && (
        <span style={{ textAlign: "center", color: "black" }}>1</span>
      )}

      <YellowCard />
      {yellowCardFighterWhite3 && (
        <span style={{ textAlign: "center", color: "black" }}>1</span>
      )}

      <RedCard />
      {redCardFighterBlue4 && (
        <span style={{ textAlign: "center", color: "black" }}>1</span>
      )}

      <YellowCard />
      {yellowCardFighterBlue5 && (
        <span style={{ textAlign: "center", color: "black" }}>1</span>
      )}

      <YellowCard />
      {yellowCardFighterBlue6 && (
        <span style={{ textAlign: "center", color: "black" }}>1</span>
      )}
    </div>
  );
};

export default FighterCards;

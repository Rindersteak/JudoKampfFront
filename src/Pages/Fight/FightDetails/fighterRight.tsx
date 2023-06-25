import React, { useState, useEffect } from "react";
import "./fighterRight.scss";
import "react-datepicker/dist/react-datepicker.css";
import { Card, Paper, styled } from "@mui/material";

const FighterLeft = () => {
  const Item = styled(Paper)(({ theme }) => ({
    //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const StyledCard = styled(Card)({
    width: "1em", // Ändere diese Werte, um die Größe anzupassen
    height: "1.25em",
    margin: "0 10px",
    display: "none", // Karten sind standardmäßig nicht sichtbar
  });

  const RedCard = styled(StyledCard)({
    backgroundColor: "#FF0000",
  });

  const YellowCard = styled(StyledCard)({
    backgroundColor: "#FFD600",
  });

  const [ipponLeftFighter, setIpponLeftFighter] = useState(0);
  const [wazaariLeftFighter, setWazaariLeftFighter] = useState(0);
  const [cardIndex, setCardIndex] = useState(-1); // Aktuell angezeigte Karte (-1 für keine Karte)

  useEffect(() => {
    const handleKeyPress = (event: { key: string }) => {
      if (event.key === "O" || event.key === "o") {
        if (ipponLeftFighter === 0) {
          setIpponLeftFighter(1);
        } else if (ipponLeftFighter === 1) {
          setIpponLeftFighter(0);
        }
      } else if (event.key === "E" || event.key === "e") {
        if (wazaariLeftFighter < 2) {
          setWazaariLeftFighter((prevWazaari) => prevWazaari + 1);
        } else {
          setWazaariLeftFighter(0);
        }
      }
  
      if (event.key === "D" || event.key === "d") {
        if (cardIndex === -1) {
          setCardIndex(0); // Zeige die erste Karte an
        } else if (cardIndex === 0) {
          setCardIndex(1); // Zeige die zweite Karte an
        } else if (cardIndex === 1) {
          setCardIndex(2); // Zeige die dritte Karte an
        } else if (cardIndex === 2) {
          setCardIndex(-1); // Verstecke alle Karten
        }
      }
    };
  
    document.addEventListener("keydown", handleKeyPress);
  
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [ipponLeftFighter, wazaariLeftFighter, cardIndex]);

  return (
    <div className="rightFigherContainer">
      <div className="nameTextRight">Vorname, Nachname</div>

      <div className="clubTextRight">Verein</div>

      <div className="landesverbandTextRight">Landesverband</div>

      <div className="fighterStatsContainer">
        <div className="ipponFighterRight">{ipponLeftFighter}</div>

        <div className="wazaariRightFighter">{wazaariLeftFighter}</div>

        <div className="cardContainer">
          <RedCard style={{ display: cardIndex === 2 ? "block" : "none" }} /> {/* Anzeige der roten Karte */}
          <YellowCard style={{ display: cardIndex >= 0 ? "block" : "none" }} /> {/* Anzeige der gelben Karten */}
          <YellowCard style={{ display: cardIndex >= 1 ? "block" : "none" }} /> {/* Anzeige der gelben Karten */}
        </div>
      </div>
    </div>
  );
};

export default FighterLeft;

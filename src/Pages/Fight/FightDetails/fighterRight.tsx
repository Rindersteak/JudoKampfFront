import React, { useState, useEffect } from "react";
import "./fighterRight.scss";
import "react-datepicker/dist/react-datepicker.css";
import { Card, Paper, styled } from "@mui/material";
import FightData from "./FightData";
import { updatePoints } from "../../../API/fightAPI";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface fighterRightProps {
  fightId: number;
}

const FighterRight: React.FC<fighterRightProps> = ({ fightId }) => {
  const fightData = FightData({ fightId }); // Hier rufe die FightData-Komponente auf
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

  const [ipponRightFighter, setIpponRightFighter] = useState(fightData?.blue_ippon || 0);
  const [wazaariRightFighter, setWazaariRightFighter] = useState(fightData?.blue_wazaari || 0);
  const [cardIndex, setCardIndex] = useState(fightData?.blue_fouls || -1); // Aktuell angezeigte Karte (-1 für keine Karte)

  useEffect(() => {
    if (fightData?.blue_ippon) {
      setIpponRightFighter(fightData.blue_ippon); // Timer-Wert mit fightData.fight_duration überschreiben, falls vorhanden
    }
    
    if (fightData?.blue_wazaari) {
      setWazaariRightFighter(fightData.blue_wazaari); // Timer-Wert mit fightData.fight_duration überschreiben, falls vorhanden
    }

    if (fightData?.blue_fouls) {
      setCardIndex(fightData.blue_fouls); // Timer-Wert mit fightData.fight_duration überschreiben, falls vorhanden
    }
  }, [fightData]);



  useEffect(() => {
    const handleKeyPress = async (event: { key: string }) => {
      if (event.key === "O" || event.key === "o") {
        if (ipponRightFighter === 0) {
          setIpponRightFighter(1);
          updatePoints(fightId,"add","blue","ippon"); // ID MUSS ANGEPASST WERDEN, IST NOCH HARDCODED
        } else if (ipponRightFighter === 1) {
          setIpponRightFighter(0);
          updatePoints(fightId,"remove","blue","ippon"); // ID MUSS ANGEPASST WERDEN, IST NOCH HARDCODED
        }
      } else if (event.key === "E" || event.key === "e") {
        if (wazaariRightFighter < 2) {
          setWazaariRightFighter((prevWazaari) => prevWazaari + 1);
          updatePoints(fightId,"set","blue","wazaari", wazaariRightFighter+1); // ID MUSS ANGEPASST WERDEN, IST NOCH HARDCODED
        } else {
          setWazaariRightFighter(0);
          updatePoints(fightId,"set","blue","wazaari",0); // ID MUSS ANGEPASST WERDEN, IST NOCH HARDCODED
          setIpponRightFighter(1);
          await sleep(1000);
          updatePoints(fightId,"add","blue","ippon"); // ID MUSS ANGEPASST WERDEN, IST NOCH HARDCODED
        }
      }

      if (event.key === "D" || event.key === "d") {
        if (cardIndex === -1) {
          setCardIndex(0); // Zeige die erste Karte an
          updatePoints(fightId,"set","blue","foul",0); // ID MUSS ANGEPASST WERDEN, IST NOCH HARDCODED
        } else if (cardIndex === 0) {
          setCardIndex(1); // Zeige die zweite Karte an
          updatePoints(fightId,"set","blue","foul",1); // ID MUSS ANGEPASST WERDEN, IST NOCH HARDCODED
        } else if (cardIndex === 1) {
          setCardIndex(2); // Zeige die dritte Karte an
          updatePoints(fightId,"set","blue","foul",2); // ID MUSS ANGEPASST WERDEN, IST NOCH HARDCODED
        } else if (cardIndex === 2) {
          setCardIndex(-1); // Verstecke alle Karten
          updatePoints(fightId,"set","blue","foul",-1); // ID MUSS ANGEPASST WERDEN, IST NOCH HARDCODED
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [ipponRightFighter, wazaariRightFighter, cardIndex]);

  return (
    <div className="rightFigherContainer">
      <div className="nameTextRight">
        {fightData?.fighterBlue?.lastname}, {fightData?.fighterBlue.firstname}
      </div>

      <div className="clubTextRight">{fightData?.fighterBlue.club.name}</div>

      <div className="landesverbandTextRight">
        {fightData?.fighterBlue.club.stateassociation}
      </div>

      <div className="fighterStatsContainer">
        <div className="ipponFighterRight">{ipponRightFighter}</div>

        <div className="wazaariRightFighter">{wazaariRightFighter}</div>

        <div className="cardContainer">
          <RedCard style={{ display: cardIndex === 2 ? "block" : "none" }} />{" "}
          {/* Anzeige der roten Karte */}
          <YellowCard
            style={{ display: cardIndex >= 0 ? "block" : "none" }}
          />{" "}
          {/* Anzeige der gelben Karten */}
          <YellowCard
            style={{ display: cardIndex >= 1 ? "block" : "none" }}
          />{" "}
          {/* Anzeige der gelben Karten */}
        </div>
      </div>
    </div>
  );
};

export default FighterRight;

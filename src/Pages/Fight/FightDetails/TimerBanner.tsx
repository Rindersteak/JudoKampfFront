import React, { useState, useEffect, useRef } from "react";
import "./TimerBanner.scss";
import "react-datepicker/dist/react-datepicker.css";
import FightData from "./FightData";
import { updateTimerDuration } from "../../../API/fightAPI";

interface TimerBannerProps {
  fightId: number;
}

const TimerBanner: React.FC<TimerBannerProps> = ({ fightId }) => {
  const fightData = FightData({ fightId }); // Hier rufe die FightData-Komponente auf
  const [timer, setTimer] = useState(120); // Initialer Wert auf 10 setzen
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fightData?.fight_duration) {
      setTimer(fightData.fight_duration); // Timer-Wert mit fightData.fight_duration überschreiben, falls vorhanden
    }
  }, [fightData]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
        //updateTimerDuration(timer, 1); // Hier rufe die updateTimerDuration-Funktion auf
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, timer]);

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === " ") {
      setIsRunning((prevIsRunning) => !prevIsRunning);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: { key: string }) => {
      if (event.key === " ") {
        setIsRunning((prevIsRunning) => !prevIsRunning);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [setIsRunning]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div
      className="mainTimerBannerContainer"
      ref={containerRef}
      tabIndex={0}
      onKeyUp={handleKeyUp}
    >
      <div className="weightClassText">
        {fightData?.fighterWhite.weightclass?.name}
      </div>

      <div className="timerText">{formatTime(timer)}</div>

      <div className="fightID">{fightData?.id}</div>
    </div>
  );
};

export default TimerBanner;

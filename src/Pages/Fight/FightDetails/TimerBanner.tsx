import React, { useState, useEffect, useRef } from "react";
import "./TimerBanner.scss";
import "react-datepicker/dist/react-datepicker.css";

const TimerBanner = () => {
  const [timer, setTimer] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
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
      <div className="weightClassText">Gewichtsklasse</div>

      <div className="timerText">{formatTime(timer)}</div>

      <div className="fightID">1</div>
    </div>
  );
};

export default TimerBanner;

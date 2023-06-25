import React, { useState, useEffect } from "react";
import "./FightDetails.scss";
import "react-datepicker/dist/react-datepicker.css";
import TimerBanner from "./TimerBanner";
import FighterLeft from "./fighterLeft";
import FighterRight from "./fighterRight";

const FightDetails = () => {
  const [seconds, setSeconds] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [isBlue, setIsBlue] = useState(false);
  const [isWhite, setIsWhite] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "j" || event.key === "J") {
        if (isCounting && isBlue) {
          setIsCounting(false);
        }else if (isCounting && isWhite || !isCounting && isWhite) {
          setSeconds(0);
          setIsWhite(false)
          setIsCounting(true)
          setIsBlue(true)
        } else {
          setIsCounting(true);
          setIsBlue(true);
          setIsWhite(false);
        }
      } else if (event.key === "g" || event.key === "G") {
        if (isCounting && isWhite) {
          setIsCounting(false);
        }else if (isCounting && isBlue || !isCounting && isBlue) {
          setSeconds(0);
          setIsBlue(false)
          setIsWhite(true)
          setIsCounting(true)
        } else {
          setIsCounting(true);
          setIsBlue(false);
          setIsWhite(true);
        }
      }
    };

    const interval = setInterval(() => {
      if (isCounting) {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }
    }, 1000);

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      clearInterval(interval);
    };
  }, [isCounting, isBlue, isWhite]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mainFightDetails">
      <div className="timerBannerTop">
        <TimerBanner />
      </div>

      <div className="fighterStatsMiddle">
        <FighterLeft />
        <FighterRight />
      </div>

      <div className={`floatingBottomTimer ${isBlue ? "blueBackground" : ""} ${isWhite ? "whiteBackground" : ""}`}>
        {formatTime(seconds)}
      </div>
    </div>
  );
};

export default FightDetails;

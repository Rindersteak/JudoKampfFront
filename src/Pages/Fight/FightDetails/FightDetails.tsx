import React, { useState, useEffect } from "react";
import "./FightDetails.scss";
import "react-datepicker/dist/react-datepicker.css";
import TimerBanner from "./TimerBanner";
import FighterLeft from "./fighterLeft";
import FighterRight from "./fighterRight";
import TimerBottom from "./TimerBottom";

const FightDetails = () => {
 

  return (
    <div className="mainFightDetails">
      <div className="timerBannerTop">
        <TimerBanner />
      </div>

      <div className="fighterStatsMiddle">
        <FighterLeft />
        <FighterRight />
      </div>
      
      <TimerBottom/>
    </div>
  );
};

export default FightDetails;

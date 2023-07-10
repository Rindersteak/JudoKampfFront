import React, { useState, useEffect } from "react";
import "./FightDetails.scss";
import "react-datepicker/dist/react-datepicker.css";
import TimerBanner from "./TimerBanner";
import FighterLeft from "./fighterLeft";
import FighterRight from "./fighterRight";
import TimerBottom from "./TimerBottom";
import FightData from "./FightData";

interface FightDetailsProps {
    fightId: number;
}

const FightDetails: React.FC<FightDetailsProps> = ({ fightId }) => {


    return (
        <div className="mainFightDetails">
            <div className="timerBannerTop">
                <TimerBanner fightId={fightId} />
            </div>

            <div className="fighterStatsMiddle">
                <FighterLeft fightId={fightId} />
                <FighterRight fightId={fightId} />
            </div>

            <TimerBottom />
        </div>
    );
};

export default FightDetails;


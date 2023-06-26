import { useState, useEffect } from "react";
import { getFightById } from "../../../API/fightAPI";
import { Fight } from "../../../types";

const FightData = () => {
  const [fightData, setFightData] = useState<Fight | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fight: Fight = await getFightById(1);
        setFightData(fight);
      } catch (error) {
        console.error("Error fetching fight:", error);
      }
    };
    fetchData();
  }, []);

  return fightData;
};

export default FightData;

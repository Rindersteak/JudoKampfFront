import { useState, useEffect } from "react";
import { getFightById } from "../../../API/fightAPI";
import { Fight } from "../../../types";

interface FightDataProps {
  fightId: number;
}

const FightData = ({ fightId }: FightDataProps): Fight | null => {
  const [fightData, setFightData] = useState<Fight | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fight: Fight = await getFightById(fightId);
        setFightData(fight);
      } catch (error) {
        console.error("Error fetching fight:", error);
      }
    };
    fetchData();
  }, [fightId]);

  return fightData;
};

export default FightData;

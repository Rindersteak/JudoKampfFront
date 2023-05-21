import React, { useEffect, useState } from 'react';
import FighterEntry from '../../Objects/Fighter/Fighter';
import { Fighter } from '../../types';
import './FighterList.css';

type Props = {
  fighters: Fighter[];
};

const FighterList: React.FC<Props> = ({ fighters }) => {
  const [backendFighters, setBackendFighters] = useState<Fighter[]>([]);

  useEffect(() => {
    const loadBackendFighters = async () => {
      try {
        const response = await fetch('http://localhost:8081/fighters/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBackendFighters(data);
      } catch (error) {
        console.error('Error loading backend fighters:', error);
      }
    };

    loadBackendFighters();
  }, []);

  return (
    <div className="entryList">
      <div className="entryStyle headerStyle">
        <span className="nameStyle">Name</span>
        <span className="clubStyle">Verein</span>
      </div>
      {fighters.map((fighter) => (
        <FighterEntry key={fighter.id} fighter={fighter} />
      ))}
      {backendFighters.map((fighter) => (
        <FighterEntry key={fighter.id} fighter={fighter} />
      ))}
    </div>
  );
};

export default FighterList;

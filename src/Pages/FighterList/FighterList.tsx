import React, { useEffect, useState } from 'react';
import FighterEntry from '../../Objects/Fighter/Fighter';
import { Fighter } from '../../types';
import './FighterList.css';

type Props = {
  fighters: Fighter[];
};

const FighterList: React.FC<Props> = ({ fighters }) => {
  const [exampleFighters, setExampleFighters] = useState<Fighter[]>([]);

  useEffect(() => {
    const loadExampleFighters = async () => {
      try {
        const response = await fetch('/examples.json');
        const data = await response.json();
        setExampleFighters(data);
      } catch (error) {
        console.error('Error loading example fighters:', error);
      }
    };

    loadExampleFighters();
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
        {exampleFighters.map((fighter) => (
          <FighterEntry key={fighter.id} fighter={fighter} />
        ))}
      </div>

  );
};

export default FighterList;

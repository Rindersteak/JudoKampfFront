import React, { useEffect, useState } from 'react';
import FighterEntry from '../../Objects/Fighter/Fighter'; 
import { Fighter } from '../../types'; 
import './FighterList.css'; 
import { getFighters } from '../../API/fighterAPI';


const FighterList: React.FC = () => {
  const [backendFighters, setBackendFighters] = useState<Fighter[]>([]);

  useEffect(() => {
    const loadBackendFighters = async () => {
      try {
        const fighters = await getFighters();
        setBackendFighters(fighters);
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
      {backendFighters.map((fighter) => (
        <FighterEntry key={fighter.id} fighter={fighter} />
      ))}
    </div>
  );
};

export default FighterList;
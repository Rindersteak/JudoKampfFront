// FighterManager.tsx

import React from 'react';
import FighterForm from '../FighterForm/FighterForm';
import FighterList from '../FighterList/FighterList';
import { Fighter } from '../../types';

import './FighterManager.css';

const FighterManager: React.FC = () => {
    const [fighters, setFighters] = React.useState<Fighter[]>([]);

    const addFighter = (fighter: Fighter) => {
        setFighters([fighter, ...fighters]);
    };

    return (
        <div className="innerContainer">
            <div className="formContainer">
                <FighterForm onAddFighter={addFighter} />
            </div>
            <div className="listContainer">
                <FighterList fighters={fighters} />
            </div>
        </div>
    );
};


export default FighterManager;

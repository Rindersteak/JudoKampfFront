import React from 'react';
import { Fighter } from '../../types';
import './FighterEntry.css';

type Props = {
    fighter: Fighter;
};

const FighterEntry: React.FC<Props> = ({ fighter }) => {
    return (
        <div className="participantEntry">
            <span className="name">{fighter.firstName} {fighter.lastName}</span>
            <span className="club">{fighter.club}</span>
        </div>
    );
};

export default FighterEntry;

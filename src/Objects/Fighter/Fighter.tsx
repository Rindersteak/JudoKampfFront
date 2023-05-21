import React from 'react';
import { Fighter } from '../../types';
import './Fighter.css';

type Props = {
    fighter: Fighter;
};

const FighterEntry: React.FC<Props> = ({ fighter }) => {
    return (
        <div className="entryStyle"> {/* Div-Container mit der Klasse "entryStyle" */}
            <span className="nameStyle">{fighter.firstName} {fighter.lastName}</span> {/* Anzeige des Vor- und Nachnamens des Kämpfers */}
            <span className="clubStyle">{fighter.club}</span> {/* Anzeige des Clubs des Kämpfers */}
        </div>
    );
};

export default FighterEntry;

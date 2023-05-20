// ParticipantList.tsx
import React from 'react';
import FighterEntry from '../FighterEntry/FighterEntry';
import { Fighter } from '../../types';
import './FighterList.css';

type Props = {
    fighters: Fighter[];
};

const FighterList: React.FC<Props> = ({ fighters }) => {
    return (
        <div className="listContainer">
            <h2 className="titleStyle">Teilnehmerliste</h2>
            <div className="entryList">
                <div className="entryStyle headerStyle">
                    <span className="nameStyle">Name</span>
                    <span className="clubStyle">Verein</span>
                </div>
                {fighters.map((fighters, index) => (
                    <FighterEntry key={index} fighter={fighters} />
                ))}
                {/* Testeinträge */}
                {Array.from({ length: 10 }).map((_, index) => (
                    <FighterEntry key={`test-${index}`} fighter={{ firstName: 'Vorname', lastName: 'Nachname', club: 'Beispielverein', regionalAssociation: '', birthDate: '2023-05-17', weight: 0 }} />
                ))}
            </div>
        </div>
    );
};

export default FighterList;

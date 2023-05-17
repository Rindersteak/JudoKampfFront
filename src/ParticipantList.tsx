import React from 'react';
import { Participant } from './types';
import './ParticipantList.css';

type Props = {
    participants: Participant[];
};

const ParticipantList: React.FC<Props> = ({ participants }) => {
    return (
        <div className="listContainer">
            <h2 className="titleStyle">Teilnehmerliste</h2>
            <div className="entryStyle">
                <h3 className="headerStyle">Name</h3>
                <h3 className="headerStyle">Verein</h3>
            </div>
            {participants.map((participant, index) => (
                <div key={index} className="entryStyle">
                    <span className="nameStyle">{participant.firstName} {participant.lastName}</span>
                    <p>Verein: {participant.club}</p>
                </div>
            ))}

            {/* Testeinträge */}
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={`test-${index}`} className="entryStyle">
                    <span className="nameStyle">Vorname Nachname</span>
                    <p>Beispielverein</p>
                </div>
            ))}
        </div>
    );
};

export default ParticipantList;

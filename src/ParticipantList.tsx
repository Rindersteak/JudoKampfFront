// ParticipantList.tsx
import React from 'react';
import ParticipantEntry from './ParticipantEntry';
import { Participant } from './types';
import './ParticipantList.css';

type Props = {
    participants: Participant[];
};

const ParticipantList: React.FC<Props> = ({ participants }) => {
    return (
        <div className="listContainer">
            <h2 className="titleStyle">Teilnehmerliste</h2>
            <div className="entryList">
                <div className="entryStyle headerStyle">
                    <span className="nameStyle">Name</span>
                    <span className="clubStyle">Verein</span>
                </div>
                {participants.map((participant, index) => (
                    <ParticipantEntry key={index} participant={participant} />
                ))}
                {/* Testeinträge */}
                {Array.from({ length: 10 }).map((_, index) => (
                    <ParticipantEntry key={`test-${index}`} participant={{ firstName: 'Vorname', lastName: 'Nachname', club: 'Beispielverein', regionalAssociation: '', birthDate: '2023-05-17', weight: 0 }} />
                ))}
            </div>
        </div>
    );
};

export default ParticipantList;

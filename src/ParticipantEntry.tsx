import React from 'react';
import { Participant } from './types';
import './ParticipantEntry.css';

type Props = {
    participant: Participant;
};

const ParticipantEntry: React.FC<Props> = ({ participant }) => {
    return (
        <div className="participantEntry">
            <span className="name">{participant.firstName} {participant.lastName}</span>
            <span className="club">{participant.club}</span>
        </div>
    );
};

export default ParticipantEntry;

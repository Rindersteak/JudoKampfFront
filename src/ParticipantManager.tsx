import React from 'react';
import ParticipantForm from './ParticipantForm';
import ParticipantList from './ParticipantList';
import { Participant } from './types';
import './ParticipantManager.css';

const ParticipantManager: React.FC = () => {
    const [participants, setParticipants] = React.useState<Participant[]>([]);

    const addParticipant = (participant: Participant) => {
        setParticipants([participant, ...participants]);
    };

    return (
        <div className="innerContainer">
            <div className="formContainer">
                <ParticipantForm onAddParticipant={addParticipant} />
            </div>
            <div className="listContainer">
                <ParticipantList participants={participants} />
            </div>
        </div>
    );
};

export default ParticipantManager;

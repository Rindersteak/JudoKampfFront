import React, { CSSProperties } from 'react';
import ParticipantForm from './ParticipantForm';
import ParticipantList from './ParticipantList';
import { Participant } from './types';

const ParticipantManager: React.FC = () => {
    const [participants, setParticipants] = React.useState<Participant[]>([]);

    const addParticipant = (participant: Participant) => {
        setParticipants([participant, ...participants]);
    };

    const innerContainer: CSSProperties = {
        display: 'flex',
        alignItems: 'flex-start'
    };

    const formContainer: CSSProperties = {
        marginRight: '20px' // Abstand zwischen Teilnehmer hinzufügen und Liste
    };

    const listContainer: CSSProperties = {
        flex: '1', // Die Liste nimmt den verfügbaren Platz ein
        overflowY: 'auto' // Scrollbar anzeigen, falls Inhalt zu groß ist
    };

    return (
        <div style={innerContainer}>
            <div style={formContainer}>
                <ParticipantForm onAddParticipant={addParticipant} />
            </div>
            <div style={listContainer}>
                <ParticipantList participants={participants} />
            </div>
        </div>
    );
};

export default ParticipantManager;

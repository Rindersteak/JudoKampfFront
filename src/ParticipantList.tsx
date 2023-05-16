import React, { CSSProperties } from 'react';

import { Participant } from './types';

type Props = {
    participants: Participant[];
};

const ParticipantList: React.FC<Props> = ({ participants }) => {

    const listContainer: CSSProperties = {
        backgroundColor: 'f2f2f2',
        padding: '20px',
        borderRadius: '10px',
        maxHeight: '500px',
        overflowY: 'scroll',
        scrollbarWidth: 'thin',
        scrollbarColor: 'lightgray',
        maxWidth: '400px'
    };

    const titleStyle: CSSProperties = {
        color: 'blue',
        textAlign: 'center',
        marginBottom: '20px'
    };

    const entryStyle: CSSProperties = {
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: '10px',
        borderRadius: '5px',
        height: '10px'
    };


    const nameStyle: CSSProperties = {
        marginRight: '10px'
    };

    const headerStyle: CSSProperties = {
        fontWeight: 'bold',
        marginRight: '10px'
    };


    return (
        <div style={listContainer}>
            <h2 style={titleStyle}>Teilnehmerliste</h2>
            <div style={entryStyle}>
                <h3 style={headerStyle}>Name</h3>
                <h3 style={headerStyle}>Verein</h3>
            </div>
            {participants.map((participant, index) => (
                <div key={index} style={entryStyle}>
                    <span style={nameStyle}>{participant.firstName} {participant.lastName}</span>
                    <p>Verein: {participant.club}</p>
                </div>
            ))}

            {/* Testeinträge */}
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={`test-${index}`} style={entryStyle}>
                    <span style={nameStyle}>Vorname Nachname</span>
                    <p>Beispielverein</p>
                </div>
            ))}
        </div>
    );
};

export default ParticipantList;

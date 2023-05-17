import React, { CSSProperties } from 'react';
import ParticipantManager from './ParticipantManager';

const App: React.FC = () => {
    const appContainer: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        height: '100vh',
        padding: '50px'
    };

    const contentContainer: CSSProperties = {
        maxWidth: '100%'
    };

    return (
        <div style={appContainer}>
            <div style={contentContainer}>
                <ParticipantManager />
            </div>
        </div>
    );
};

export default App;

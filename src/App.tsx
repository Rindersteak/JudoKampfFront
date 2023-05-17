import React, { CSSProperties } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import ParticipantManager from './ParticipantManager';

const App: React.FC = () => {
    const appContainer: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        height: '100vh',
        width: '100%',
    };

    const contentContainer: CSSProperties = {
        maxWidth: '100%',
    };

    return (
        <Router>
            <div style={appContainer}>
                <div style={contentContainer}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/participant-manager" element={<ParticipantManager />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;

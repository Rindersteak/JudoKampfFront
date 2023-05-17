import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import logo from './img/kadokan_logo.png';

const HomePage: React.FC = () => {
    const topBannerStyle: CSSProperties = {
        backgroundColor: 'gray',
        height: '15vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: "white",
    };

    const logoStyle: CSSProperties = {
        height: '80px', // logo size
        position: 'absolute',
        left: '10px',
    };

    const lowerContainerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    };

    const leftContainerStyle: CSSProperties = {
        backgroundColor: 'white',
        height: '80vh',
        width: '50vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        color: "blue",
    };

    const rightContainerStyle: CSSProperties = {
        backgroundColor: 'blue',
        color: 'white',
        height: '80vh',
        width: '50vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
    };

    return (
        <div>
            <div style={topBannerStyle}>
                <img src={logo} alt="Logo" style={logoStyle} />
                <h1 style={{ textAlign: 'center' }}>Willkommen bei<br />kadokan</h1>
            </div>
            <div style={lowerContainerStyle}>
                <Link to="/participant-manager" style={leftContainerStyle}>
                    <h1 style={{ textAlign: 'center' }}>Neues Turnier<br />anlegen</h1>
                </Link>
                <Link to="/participant-manager" style={rightContainerStyle}>
                    <h1 style={{ textAlign: 'center' }}>Bestehendes<br />Turnier öffnen</h1>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;

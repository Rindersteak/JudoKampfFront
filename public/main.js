import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import logo from './img/kadokan_logo.png';

const HomePage: React.FC = () => {
    const mainContainerStyle: CSSProperties = {
        width: '100%',
        height: '100vh', // Add this to fill the entire height of the screen
        display: 'flex',
        flexDirection: 'column',
    };

    const logoStyle: CSSProperties = {
        height: '50px', // Adjust this to change the logo size
        position: 'absolute', // Position the logo absolutely within the topBanner div
        left: '10px', // Add some margin from the left side of the screen
    };

    const topBannerStyle: CSSProperties = {
        backgroundColor: 'gray',
        height: '20vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative', // Make the topBanner div a relative container for the absolutely positioned logo
    };

    const lowerContainerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '80vh', // Add this to fill the remaining height of the screen
    };

    const leftContainerStyle: CSSProperties = {
        backgroundColor: 'white',
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
    };

    const rightContainerStyle: CSSProperties = {
        backgroundColor: 'blue',
        color: 'white',
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
    };

    return (
        <div style={mainContainerStyle}>
            <div style={topBannerStyle}>
                <img src={logo} alt="Logo" style={logoStyle} />
                <h1>Willkommen bei</h1>
                <h2>kadokan</h2>
            </div>
            <div style={lowerContainerStyle}>
                <Link to="/participant-manager" style={leftContainerStyle}>
                    <h1>Neues Turnier</h1>
                    <h2>anlegen</h2>
                </Link>
                <Link to="/participant-manager" style={rightContainerStyle}>
                    <h1>Bestehendes</h1>
                    <h2>Turnier öffnen</h2>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;

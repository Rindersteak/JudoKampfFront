import React from 'react';
import './TournamentDetails.css';
import logo from '../../img/kadokan_logo.svg';

// Separate Card Component
interface CardProps {
    color: string;
  }
  
  const Card: React.FC<CardProps> = ({ color }) => {
    return <div className={`card ${color}`} />;
  };


const App = () => {
    
  return (
    <div className="app">
      <div className="header">
        <svg className="logo" />
        <div className="top-banner">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Turnier "XXXX"</h1>
          <span>IDXXXX</span>
        </div>
      </div>
      <div className='middleContainer'>
        <div className="cards-container">
            <div className='card-one'>
                Test
            </div>

            <div className='card-two'>
                Test
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;

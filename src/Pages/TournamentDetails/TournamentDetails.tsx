import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TournamentDetails.css';
import logo from '../../img/kadokan_logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faPlus, faTree, faTrophy } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  return (
    <div className="app">
      <div className="header">
        <svg className="logo" />
        <div className="top-banner">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Turnier "XXXX"</h1>
          <h1>IDXXXX</h1>
        </div>
      </div>
      <div className="cards-container">
        <CardOne />
        <CardTwo />
        <CardThree />
      </div>
      <div className="currentFightLabel">Aktueller Kampf:</div>
      <div className="currentFightPreview">PREVIEW IST IN ARBEIT</div>
    </div>
  );
};

const CardOne = () => {
  const navigate = useNavigate();

  const handleCardOneClick = () => {
    navigate('/'); // Hier die gewünschte Ziel-URL für card-one angeben
  };

  return (
    <div className="card-one" onClick={handleCardOneClick}>
      <div className="card-icon-white">
        <FontAwesomeIcon icon={faTrophy} />
      </div>
      <div className="card-text-white">Turnierbaum</div>
    </div>
  );
};

const CardTwo = () => {
  const navigate = useNavigate();

  const handleCardTwoClick = () => {
    navigate('/'); // Hier die gewünschte Ziel-URL für card-two angeben
  };

  return (
    <div className="card-two" onClick={handleCardTwoClick}>
      <div className="card-icon-blue">
        <FontAwesomeIcon icon={faClipboardList} />
      </div>
      <div className="card-text-blue">Teilnehmerliste</div>
    </div>
  );
};

const CardThree = () => {
  const navigate = useNavigate();

  const handleCardThreeClick = () => {
    navigate('/'); // Hier die gewünschte Ziel-URL für card-three angeben
  };

  return (
    <div className="card-three" onClick={handleCardThreeClick}>
      <div className="card-icon-white">
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <div className="card-text-white">Teilnehmer</div>
    </div>
  );
};

export default App;

import React from 'react';
import logo from '../img/kodokan_logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import './Spielwiese.scss';

const Spielwiese = () => {
    return (
      <div className='topBanner'>

        <div className='logoContainer'>
          <img src={logo} alt="Logo" className="kodokanLogo" />
        </div>

        <div className='backButtonContainer'>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} className="newBackIcon" />
        </div>


        <div className='titleContainer'>
        <h1>Test1</h1>
        <h1>Test2</h1>
        </div>
      </div>
      
    )
  };

  export default Spielwiese;
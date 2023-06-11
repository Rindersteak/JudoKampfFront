import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import logo from '../../img/kodokan_logo.svg';
import './Banner.scss';

interface BannerProps {
  title?: string;
  subtitle?: string;
  optionalButtonLabel?: string;
  onOptionalButtonClick?: () => void;
  onLogoClick?: () => void; // Logo-Home
}


const Banner: React.FC<BannerProps> = ({ title, subtitle, optionalButtonLabel, onOptionalButtonClick, onLogoClick }) => {
  //let titleClass = subtitle ? "title-with-subtitle" : "title-only";
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigiere eine Seite zurück
  };

  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick(); // Rufe den onLogoClick-Handler auf
    } else {
      navigate('/'); // Navigiere zur Homepage
    }
  };

  return (

    <div className='topBanner'>

    <div className='logoContainer' onClick={handleLogoClick}>
      <img src={logo} alt="Logo" className="kodokanLogo" />
    </div>

    <div className='backButtonContainer' >
      <FontAwesomeIcon icon={faArrowAltCircleLeft} className="newBackIcon" onClick={handleGoBack}/>
    </div>


    <div className='titleContainer'>
    <h1>{title}</h1>
    <h1>{subtitle}</h1>
    </div>
  </div>
  );
};

export default Banner;

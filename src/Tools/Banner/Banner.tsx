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
  let titleClass = subtitle ? "title-with-subtitle" : "title-only";
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
    <div className="top-banner">
      <div className="logo-container" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="back-button-container">
        <div className="back-button" onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} className="back-icon" />
        </div>
      </div>
      <div className={`title-container ${titleClass}`}>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
      </div>
      {optionalButtonLabel && (
        <div className="optional-button-container">
          <button className="optional-button" onClick={onOptionalButtonClick}>{optionalButtonLabel}</button>
        </div>
      )}
    </div>
  );
};

export default Banner;

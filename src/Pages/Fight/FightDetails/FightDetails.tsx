
import './FightDetails.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faGear, faPencil, faPeopleArrows, faPlus, faTree, faTrophy} from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as RectangleWideIcon } from './rectangle-wide.svg';


const FighterDetails: React.FC = () => {

    return (
        <div>
          <div className='topContainer'>
            <div className='weightLabel'>
              GWXXXX
            </div>
    
            <div className='topTimer'>
              <div className='timer'>
                00:00
              </div>
            </div>
    
            <div className="preliminaryRound">
            Vorrunde
            </div>
          </div>


          <div className='main'>
            <div className='mainLeft'>
                <div className='mainLeftName'>
                    Vorname, Nachname
                </div>
                <div className='mainLeftClub'>
                    Verein
                </div>
                <div className='mainLeftLandesverband'>
                    Landesverband
                </div>

                <div className='points'>
                <div className='pointLeft'>
                    0
                </div>
                
                <div className='pointRight'>
                    0
                </div>

                <div className='redCard'>
                <FontAwesomeIcon icon={faSquare}/>
                </div>

                <div className='yellowCardTwo'>
                <FontAwesomeIcon icon={faSquare}/>
                </div>
                <div className='yellowCardOne'>
                  <FontAwesomeIcon icon={faSquare}/>
                </div>

                </div>
            </div>
            <div className='mainRight'>
                test2
            </div>

        
        </div>

        </div>
      );
};


export default FighterDetails;
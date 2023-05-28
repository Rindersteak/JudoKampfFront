
import './FighterDetails.css';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

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

                <div className='redCard'></div>

                <div className='yellowCardTwo'></div>

                <div className='yellowCardOne'></div>

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
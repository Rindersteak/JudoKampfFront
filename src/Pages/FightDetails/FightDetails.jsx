import React, { useState } from 'react';
import './FightDetails.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';




function FightDetails() {
  return (
    <div>
      <div className='topContainer'>
        <div className='weightLabel'>
          Test1
        </div>

        <div className='topTimer'>
          <div className='timer'>
            Test2
          </div>
        </div>

        <div className="preliminaryRound">
        Test3
        </div>
      </div>
    
      <div>

      </div>
    </div>
  );
}

export default FightDetails;
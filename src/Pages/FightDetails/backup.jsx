/*import React, { useState } from 'react';
import './FightDetails.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function FightDetails() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item className="header" sx={{ backgroundColor: 'brown', fontSize: '1.75em', color: 'yellow', display: 'flex', alignItems: 'center' }}>
                <div className='gewicht'>Gewicht</div>
                <div style={{marginLeft: 'auto'}} className='vorrunde'>Vorrunde</div>
                <div className='timer'>Timer</div>
              </Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item sx={{ backgroundColor: 'white', fontSize: '1,75em', color: 'black' }}>
                <div>
                  <div>Nachname, Vorname</div>
                  <div>Verein </div>
                  <div>Landesverband </div>
                </div>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item sx={{ backgroundColor: 'blue', fontSize: '1.75em', color: 'white'}}>
                <div>
                  <div>Nachname, Vorname</div>
                  <div>Verein </div>
                  <div>Landesverband </div>
                </div>
                <div></div>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FightDetails;*/
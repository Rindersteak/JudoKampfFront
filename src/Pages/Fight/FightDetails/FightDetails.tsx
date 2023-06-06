import React, { useState } from 'react';
import './FightDetails.scss';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StyledCard = styled(Card)({
  width: "1.5em", // Ändere diese Werte, um die Größe anzupassen
  height: "2.25em",
  margin: "0 10px"
});

// Definiere die spezifischen Kartenarten (rot, gelb)
const RedCard = styled(StyledCard)({
  backgroundColor: "#FF0000"
});

const YellowCard = styled(StyledCard)({
  backgroundColor: "#FFD600"
});


function FightDetails() {
  return (
    <Box sx={{ width: '100%' , height: '100%'}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{height: '50vh'}}>
              <Item className="header" sx={{ backgroundColor: '#272727', fontSize: '1.75em', color: '#FFC700', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between'}}>
                <div className='gewicht'>Gewicht</div>
                <div className='timer' style={{ margin: '0 auto', color: '#FF0000' }}>00:00</div>
                <div className='vorrunde'>Vorrunde</div>
              </Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} style={{height: '50vh'}}>
              <Item sx={{ backgroundColor: 'white', fontSize: '1.75em', color: 'black', height: '100%'}}>
                <div>
                    <div>Nachname, Vorname</div>
                    <div>Verein </div>
                    <div>Landesverband </div>
                </div>
                <div style={{display: 'flex', width: '100%', alignItems: 'center'}}>
                    <div style={{width: '10%', fontSize: '2em'}}>0</div>
                    <div style={{width: '40%', fontSize: '1em'}}>0</div>
                    <RedCard>
                      
                    </RedCard>
                    <YellowCard>
                      
                    </YellowCard>
                    <YellowCard>
                      
                    </YellowCard>
                </div>
              </Item>
            </Grid>
            <Grid item xs={6} style={{height: '50vh'}}>
              <Item sx={{ backgroundColor: 'blue', fontSize: '1.75em', color: 'white', height: '100%'}}>
                <div>
                  <div>Nachname, Vorname</div>
                  <div>Verein </div>
                  <div>Landesverband </div>
                </div>
                <div style={{display: 'flex', width: '100%', alignItems: 'center'}}>
                  <div style={{width: '10%', fontSize: '2em'}}>0</div>
                  <div style={{width: '40%', fontSize: '1em'}}>0</div>
                  <RedCard>
                    
                  </RedCard>
                  <YellowCard>
                    
                  </YellowCard>
                  <YellowCard>
                    
                  </YellowCard>
                </div>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FightDetails;
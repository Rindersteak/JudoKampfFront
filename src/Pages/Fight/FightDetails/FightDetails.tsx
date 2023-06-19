import React, { useEffect, useState } from "react";
import "./FightDetails.scss";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getFightById } from "../../../API/fightAPI";
import { Fight } from "../../../types";


function FightDetails() {

const [fightData, setFightData] = useState<null | Fight>(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const fight: Fight = await getFightById(1);
      setFightData((prevState) => fight);
      console.log("FightId: " + fight.id);
    } catch (error) {
      console.error("Error loading fight:", error);
    }
  };

  fetchData();
}, []);




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
  margin: "0 10px",
});

const [redCardCount, setRedCardCount] = useState(false);
const [yellowCardCount1, setYellowCardCount1] = useState(false);
const [yellowCardCount2, setYellowCardCount2] = useState(false);
const [yellowCardCount3, setYellowCardCount3] = useState(false);
const [yellowCardCount4, setYellowCardCount4] = useState(false);
const [redCardCount2, setRedCardCount2] = useState(false);

const updateCardCounts = (cardName: any) => {
  switch (cardName) {
    case 'redCardCount':
      setRedCardCount(prevCount => !prevCount);
      break;
    case 'yellowCardCount1':
      setYellowCardCount1(prevCount => !prevCount);
      break;
    case 'yellowCardCount2':
      setYellowCardCount2(prevCount => !prevCount);
      break;
    case 'yellowCardCount3':
      setYellowCardCount3(prevCount => !prevCount);
      break;
    case 'yellowCardCount4':
      setYellowCardCount4(prevCount => !prevCount);
      break;
    case 'redCardCount2':
      setRedCardCount2(prevCount => !prevCount);
      break;
    default:
      break;
  }
};

// ...





const RedCard = styled(StyledCard)({
  backgroundColor: "#FF0000",
});

const YellowCard = styled(StyledCard)({
  backgroundColor: "#FFD600",
});
// Definiere die spezifischen Kartenarten (rot, gelb)



/*
const StyledCard = styled(Card)({
  width: '1.5em',
  height: '2.25em',
  margin: '0 10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
});

const RedCard = styled(StyledCard)({
  backgroundColor: '#FF0000',
});

const YellowCard = styled(StyledCard)({
  backgroundColor: '#FFD600',
});

const CardToggle = () => {
  const [isRedVisible, setRedVisible] = useState(false);
  const [isYellowVisible, setYellowVisible] = useState(false);

  const toggleRedCard = () => {
    setRedVisible(!isRedVisible);
  };

  const toggleYellowCard = () => {
    setYellowVisible(!isYellowVisible);
  };

  return (
    <div>
      <RedCard onClick={toggleRedCard}>{isRedVisible && <span style={{ textAlign: 'center' }}>1</span>}</RedCard>
      <YellowCard onClick={toggleYellowCard}>{isYellowVisible && <span style={{ textAlign: 'center' }}>1</span>}</YellowCard>
    </div>
  );
};*/






/*const Timer = () => {
  useEffect(() => {
    const handleKeyDown = (event: { code: string; }) => {
      if (event.code === "Space") {
        // Call your timer start function here
        startTimer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const startTimer = () => {
    // Your timer start logic
    console.log("Timer started!");
  };

  return <div>{fightData?.fight_duration}</div>;
}; */




const [remainingTime, setRemainingTime] = useState(fightData?.fight_duration || 120);

interface FightData {
  fight_duration?: number;
}

interface TimerProps {
  fightData?: FightData;
  //onClick: () => void;
}

const Timer1 = ({ fightData }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState(fightData?.fight_duration || 120);
  const [timerInterval, setTimerInterval] = useState<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: { code: string }) => {
      if (event.code === "Space") {
        if (timerInterval) {
          clearInterval(timerInterval);
          setTimerInterval(null);
        } else {
          startTimer();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  useEffect(() => {
    if (remainingTime <= 0 && timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [remainingTime, timerInterval]);

  const startTimer = () => {
    console.log("Timer started!");

    const interval = setInterval(() => {
      setRemainingTime((prevTime: number) => prevTime - 1);
    }, 1000);

    setTimerInterval(interval);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return <div>{formatTime(remainingTime)}</div>;
};















interface TimerProps {
  onClick: () => void;
}

const Timer2: React.FC<TimerProps> = ({ onClick }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [spacePressCount, setSpacePressCount] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "KeyD" || event.code === "KeyJ") {
        setSpacePressCount((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  useEffect(() => {
    if (spacePressCount === 1) {
      if (!timerInterval) {
        // Start the timer
        startTimer();
      } else {
        // Stop the timer
        stopTimer();
      }
    } else if (spacePressCount === 2) {
      // Resume the timer
      resumeTimer();
      setSpacePressCount(0);
    }
  }, [spacePressCount]);

  const startTimer = () => {
    console.log("Timer started!");

    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    setTimerInterval(interval);
    onClick();
  };

  const stopTimer = () => {
    console.log("Timer stopped!");

    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const resumeTimer = () => {
    console.log("Timer resumed!");

    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    setTimerInterval(interval);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return <div>{formatTime(elapsedTime)}</div>;
};





  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Grid container spacing={0.1}>


        <Grid item xs={12}>
          <Grid>
            <Grid item xs={12} style={{ height: "35vh" }}>
              <Item
                className="header"
                sx={{
                  backgroundColor: "#272727",
                  fontSize: "1.75em",
                  color: "#FFC700",
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div className="gewicht">{fightData?.fighterWhite.weightclass?.name}</div>

                <div
                  className="timer"
                  style={{ margin: "0 auto", color: "#FF0000" }}
                >
                  <Timer1 fightData={undefined} onClick={function (): void {
                    throw new Error("Function not implemented.");
                  } } />
                </div>
                <div className="vorrunde">{fightData?.id}</div>
              </Item>
            </Grid>
          </Grid>
        </Grid>


        <Grid item xs={12}>
          <Grid container spacing={0.1}>
            <Grid item xs={6} style={{ height: "50vh" }}>
              <Item
                sx={{
                  backgroundColor: "white",
                  fontSize: "1.75em",
                  color: "black",
                  height: "100%",
                }}
              >
                <div>
                  <div>{fightData?.fighterBlue.lastname}, {fightData?.fighterBlue.firstname}</div>
                  <div>{fightData?.fighterBlue.club.name}</div>
                  <div>{fightData?.fighterBlue.club.stateassociation}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <div className="IpponFighterBlue" style={{ width: "10%", fontSize: "2em" }}>0</div>
                  <div className="WazaariFighterBlue" style={{ width: "40%", fontSize: "1em" }}>0</div>

                  <RedCard onClick={() => updateCardCounts('redCardCount')}>
  {redCardCount && <span style={{ textAlign: 'center', color: 'black' }}>1</span>}
</RedCard>

<YellowCard onClick={() => updateCardCounts('yellowCardCount1')}>
  {yellowCardCount1 && <span style={{ textAlign: 'center', color: 'black' }}>1</span>}
</YellowCard>

<YellowCard onClick={() => updateCardCounts('yellowCardCount2')}>
  {yellowCardCount2 && <span style={{ textAlign: 'center', color: 'black' }}>1</span>}
</YellowCard>

                  
                </div>
              </Item>
            </Grid>
            <Grid item xs={6} style={{ height: "50vh" }}>
              <Item
                sx={{
                  backgroundColor: "blue",
                  fontSize: "1.75em",
                  color: "white",
                  height: "100%",
                }}
              >
                <div>
                  <div>{fightData?.fighterWhite.lastname}, {fightData?.fighterWhite.firstname}</div>
                  <div>{fightData?.fighterWhite.club.name}</div>
                  <div>{fightData?.fighterWhite.club.stateassociation}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "10%", fontSize: "2em" }}>0</div>
                  <div style={{ width: "40%", fontSize: "1em" }}>0</div>
                 
                      <RedCard onClick={() => updateCardCounts('redCardCount2')}>
                  {redCardCount2 && <span style={{ textAlign: 'center', color: 'black' }}>1</span>}
                </RedCard>

                <YellowCard onClick={() => updateCardCounts('yellowCardCount3')}>
                  {yellowCardCount3 && <span style={{ textAlign: 'center', color: 'black' }}>1</span>}
                </YellowCard>

                <YellowCard onClick={() => updateCardCounts('yellowCardCount4')}>
                  {yellowCardCount4 && <span style={{ textAlign: 'center', color: 'black' }}>1</span>}
                </YellowCard>



                  
                </div>
              </Item>
            </Grid>
          </Grid>


          <Grid item xs={12}>
            <Grid item xs={12} style={{ height: "15vh"}}>
              <Item className="header" sx={{ backgroundColor: "white", fontSize: "1.75em", color: "#FFC700", display: "flex", alignItems: "center", height: "100%"}} >
                <div className="timer" style={{ margin: "auto", color: "black" }}>
                <Timer2 onClick={() => console.log("Timer clicked!")} />
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

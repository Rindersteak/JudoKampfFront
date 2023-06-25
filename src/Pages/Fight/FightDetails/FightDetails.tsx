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

  //Logik der Wertungen
  const [ipponFighterWhite, setIpponFighterWhite] = useState(0);
  const [wazaariFighterWhite, setWazaariFighterWhite] = useState(0);
  const [ipponFighterBlue, setIpponFighterBlue] = useState(0);
  const [wazaariFighterBlue, setWazaariFighterBlue] = useState(0);

  useEffect(() => {
    function handleKeyPress(event: { key: string }) {
      if (event.key === "u") {
        setIpponFighterWhite((prevValue) => (prevValue === 0 ? 1 : 0));
      } else if (event.key === "q") {
        setWazaariFighterWhite((prevValue) => {
          if (prevValue === 0) {
            return 1;
          } else if (prevValue === 1) {
            return 2;
          } else {
            return 0;
          }
        });
      } else if (event.key === "o") {
        setIpponFighterBlue((prevValue) => (prevValue === 0 ? 1 : 0));
      } else if (event.key === "e") {
        setWazaariFighterBlue((prevValue) => {
          if (prevValue === 0) {
            return 1;
          } else if (prevValue === 1) {
            return 2;
          } else {
            return 0;
          }
        });
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  //Logik der Cards
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

  const RedCard = styled(StyledCard)({
    backgroundColor: "#FF0000",
  });

  const YellowCard = styled(StyledCard)({
    backgroundColor: "#FFD600",
  });

  const [redCardFighterWhite1, setRedCardCount] = useState(false);
  const [yellowCardFighterWhite2, setYellowCardCount1] = useState(false);
  const [yellowCardFighterWhite3, setYellowCardCount2] = useState(false);

  const [redCardFighterBlue4, setRedCardCount2] = useState(false);
  const [yellowCardFighterBlue5, setYellowCardCount3] = useState(false);
  const [yellowCardFighterBlue6, setYellowCardCount4] = useState(false);

  //Timer1
  const [remainingTime, setRemainingTime] = useState(
    fightData?.fight_duration || 120
  );

  interface FightData {
    fight_duration?: number;
  }

  interface TimerProps {
    fightData?: FightData;
    //onClick: () => void;
  }

  const Timer1 = ({ fightData }: TimerProps) => {
    const [remainingTime, setRemainingTime] = useState(
      fightData?.fight_duration || 120
    );
    const [timerInterval, setTimerInterval] = useState<ReturnType<
      typeof setInterval
    > | null>(null);

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
      const formattedMinutes =
        minutes < 10 ? `0${minutes}` : minutes.toString();
      const formattedSeconds =
        seconds < 10 ? `0${seconds}` : seconds.toString();
      return `${formattedMinutes}:${formattedSeconds}`;
    };

    return <div>{formatTime(remainingTime)}</div>;
  };

  //Timer 2
  interface TimerProps {
    onClick: () => void;
  }

  const Timer2: React.FC<TimerProps> = ({ onClick }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
      null
    );
    const [spacePressCount, setSpacePressCount] = useState(0);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "KeyG" || event.code === "KeyJ") {
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
      const formattedMinutes =
        minutes < 10 ? `0${minutes}` : minutes.toString();
      const formattedSeconds =
        seconds < 10 ? `0${seconds}` : seconds.toString();
      return `${formattedMinutes}:${formattedSeconds}`;
    };

    return <div>{formatTime(elapsedTime)}</div>;
  };

  //Ausgabe auf der Page
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Grid container spacing={0.1}>
        <Grid item xs={12}>
          <Grid>
            <Grid item xs={12} style={{ height: "20vh" }}>
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
                <div className="gewicht">
                  {fightData?.fighterWhite.weightclass?.name}
                </div>

                <div
                  className="timer"
                  style={{ margin: "0 auto", color: "#FF0000", fontWeight:"bold", fontSize:"5rem", paddingRight: "5rem"}}
                >
                  <Timer1
                    fightData={undefined}
                    onClick={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </div>
                <div className="vorrunde">{fightData?.id}</div>
              </Item>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={0.1}>
            <Grid item xs={6} style={{ height: "80vh" }}>
              <Item
                sx={{
                  backgroundColor: "white",
                  fontSize: "1.75em",
                  color: "black",
                  height: "100%",
                }}
              >
                <div>
                  <div>
                    {fightData?.fighterBlue.lastname},{" "}
                    {fightData?.fighterBlue.firstname}
                  </div>
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
                  <div
                    className="IpponFighterBlue"
                    style={{ width: "10%", fontSize: "2em" }}
                  >
                    {ipponFighterWhite}
                  </div>
                  <div
                    className="WazaariFighterBlue"
                    style={{ width: "40%", fontSize: "1em" }}
                  >
                    {wazaariFighterWhite}
                  </div>

                  <RedCard>
                    {redCardFighterWhite1 && (
                      <span style={{ textAlign: "center", color: "black" }}>
                        1
                      </span>
                    )}
                  </RedCard>

                  <YellowCard>
                    {yellowCardFighterWhite2 && (
                      <span style={{ textAlign: "center", color: "black" }}>
                        1
                      </span>
                    )}
                  </YellowCard>

                  <YellowCard>
                    {yellowCardFighterWhite3 && (
                      <span style={{ textAlign: "center", color: "black" }}>
                        1
                      </span>
                    )}
                  </YellowCard>
                </div>
              </Item>
            </Grid>
            <Grid item xs={6} style={{ height: "80vh" }}>
              <Item
                sx={{
                  backgroundColor: "blue",
                  fontSize: "1.75em",
                  color: "white",
                  height: "100%",
                }}
              >
                <div>
                  <div>
                    {fightData?.fighterWhite.lastname},{" "}
                    {fightData?.fighterWhite.firstname}
                  </div>
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
                  <div
                    className="IpponFighterBlue"
                    style={{ width: "10%", fontSize: "2em" }}
                  >
                    {ipponFighterBlue}
                  </div>
                  <div
                    className="WazaariFighterBlue"
                    style={{ width: "40%", fontSize: "1em" }}
                  >
                    {wazaariFighterBlue}
                  </div>

                  <RedCard>
                    {redCardFighterBlue4 && (
                      <span style={{ textAlign: "center", color: "black" }}>
                        1
                      </span>
                    )}
                  </RedCard>

                  <YellowCard>
                    {yellowCardFighterBlue5 && (
                      <span style={{ textAlign: "center", color: "black" }}>
                        1
                      </span>
                    )}
                  </YellowCard>

                  <YellowCard>
                    {yellowCardFighterBlue6 && (
                      <span style={{ textAlign: "center", color: "black" }}>
                        1
                      </span>
                    )}
                  </YellowCard>
                </div>
              </Item>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} style={{ }}>
              <Item
                className="header"
                sx={{
                  backgroundColor: "white",
                  position: "absolute",
                  top: "88%",
                  left: "45%",
                  width: "10%",
                  border: "7px solid black",
                  fontSize: "1.75em",
                  color: "#FFC700",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  className="timer"
                  style={{ margin: "auto", color: "red", fontWeight:"bold"}}
                >
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

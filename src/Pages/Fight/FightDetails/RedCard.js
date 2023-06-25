import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

const StyledCard = styled(Card)({
  width: "1.5em", // Ändere diese Werte, um die Größe anzupassen
  height: "2.25em",
  margin: "0 10px",
});

const RedCard = () => {
  return <StyledCard style={{ backgroundColor: "#FF0000" }} />;
};

export default RedCard;

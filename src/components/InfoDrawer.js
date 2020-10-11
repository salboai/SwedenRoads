import React from "react";
import {
  Container,
  Divider,
  Drawer,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import MapillaryBox from "./MapillaryBox";

function isnotempty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return true;
  }
  return false;
}

export default function InfoDrawer(props) {
  /*
  const [isopen, setIsopen] = React.useState(false);

  const handleDrawerOpen = () => {
    setIsopen(true);
  };

  const handleDrawerClose = () => {
    setIsopen(false);
  };
  <Button onClick={handleDrawerOpen}>Öppna</Button>
  <Button onClick={handleDrawerClose}>Stäng</Button>
*/
  const road = props.roadproperties;
  const open = isnotempty(road);

  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <Box my={2} style={{ width: "50vv" }}>
        <Container>
          <MapillaryBox />
          <Typography paragraph variant="h6" align="center">
            Väginformation
          </Typography>
          <Typography variant="body1">id: {road.id}</Typography>
          <Divider />
          <Typography variant="body1">QClass: {road.QClass}</Typography>
          <Divider />
          <Typography variant="body1">PredictedS: {road.PredictedS}</Typography>
          <Divider />
          <Typography variant="body1">RemainingS: {road.RemainingS}</Typography>
        </Container>
      </Box>
    </Drawer>
  );
}

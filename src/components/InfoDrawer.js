import React from "react";
import {
  Container,
  Divider,
  Drawer,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import MapillaryImage from "./MapillaryBox";

function isnotempty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return true;
  }
  return false;
}

export default function InfoDrawer(props) {
  const road = props.roadproperties;
  const open = isnotempty(road);
  const imagekey =
    props.images.length > 0 ? props.images[0].properties.key : null;

  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <Box my={2} style={{ width: "50vv" }}>
        <Container>
          <MapillaryImage imagekey={imagekey} />
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

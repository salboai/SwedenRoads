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

const palette = ["#FF0000", "#FF8000", "#FFFF00", "#9FCC00", "#00CC00"];

export default function InfoDrawer(props) {
  const road = props.roadproperties;
  const open = isnotempty(road);
  const imageexist = props.images.length > 0;
  const imagekey = imageexist && props.images[0].properties.key;

  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <Box my={2} style={{ width: "50vv" }}>
        <Container>
          <Box width={"640px"} height={"480px"}>
            {imageexist ? (
              <MapillaryBox imagekey={imagekey} />
            ) : (
              <Typography align="center">
                No image at this location (150m radius).
              </Typography>
            )}
          </Box>
          <Box my={4}>
            <Typography paragraph variant="h6" align="center">
              Väginformation
            </Typography>
            <Typography variant="body1">id: {road.id}</Typography>
            <Divider />
            <Typography variant="body1">QClass: {road.QClass}</Typography>
            <Divider />
            <Typography variant="body1">
              PredictedS: {road.PredictedS}
            </Typography>
            <Divider />
            <Typography variant="body1">
              RemainingS: {road.RemainingS}
            </Typography>
          </Box>
        </Container>
      </Box>
    </Drawer>
  );
}

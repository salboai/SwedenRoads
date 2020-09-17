import React from "react";
import { Typography, Container, Divider } from "@material-ui/core";

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

export default function InfoBox(props) {
  const road = props.roadproperties;
  return !isEmpty(road) ? (
    <>
      <Typography>id: {road.id}</Typography>
      <Typography>QClass: {road.QClass}</Typography>
      <Typography>PredictedS: {road.PredictedS}</Typography>
      <Typography>RemainingS: {road.RemainingS}</Typography>
    </>
  ) : (
    <Typography>Klicka på en väg för info</Typography>
  );
}

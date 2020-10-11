import React, { useRef, useEffect } from "react";
import * as Mapillary from "mapillary-js";
import { Box, Typography } from "@material-ui/core";
import "../css/mapillary-js.css";

export default function MapillaryBox(props) {
  const mref = useRef();
  const ClientID = process.env.GATSBY_MAPILLARY_CLIENTID;

  useEffect(() => {
    const viewer = new Mapillary.Viewer(mref.current, ClientID, props.imagekey);
  }, [props.imagekey]);

  return <Box ref={mref} width="100%" height="100%" />;
}

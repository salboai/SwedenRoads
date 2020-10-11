import React, { useRef, useEffect } from "react";
import * as Mapillary from "mapillary-js";
import { Box, Typography } from "@material-ui/core";
import "../css/mapillary-js.css";

export default function MapillaryBox(props) {
  const mref = useRef();

  useEffect(() => {
    const ClientID = process.env.GATSBY_MAPILLARY_CLIENTID;
    const viewer = new Mapillary.Viewer(mref.current, ClientID, props.imagekey);
    console.log("useffect props.imagekey: ", props.imagekey);
  }, [props.imagekey]);

  return <Box ref={mref} width={"640px"} height={"480px"} />;
}

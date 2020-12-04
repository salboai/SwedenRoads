import React, { useState } from "react";
import { Typography, Box } from "@material-ui/core";

import Karta from "./Karta";
import InfoDrawer from "./InfoDrawer";

export default function Layout(props) {
  const [roadproperties, setRoadproperties] = useState({});
  const [images, setImages] = useState([]);

  const updateroadinfo = (properties, images) => {
    //console.log("images: ", images);
    setRoadproperties(properties);
    if (images && images.length > 0) {
      setImages(images);
    } else {
      setImages([]);
    }
  };

  return (
    <>
      <InfoDrawer roadproperties={roadproperties} images={images} />
      <Box my={0}>
        <Karta updateroadinfo={updateroadinfo} />
        <Typography variant="subtitle1" align="center" color="textPrimary">
          Klicka på en väg för information.
        </Typography>
      </Box>
    </>
  );
}

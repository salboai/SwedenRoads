import React, { useState, useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Imgbox.css";
/*
thumb-320.jpg
thumb-640.jpg
thumb-1024.jpg
thumb-2048.jpg
*/

const imgurl = (key) => `https://images.mapillary.com/${key}/thumb-320.jpg`;

export default function Imgbox(props) {
  const [isloading, setIsloading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const hasimg = props.features.length > 0;
    if (hasimg) {
      const url = imgurl(props.features[0].properties.key);
      const capturedate = props.features[0].properties.captured_at.slice(0, 10);
      setImage({ url, capturedate });
    } else {
      setImage(null);
    }
  }, [props.features]);

  useEffect(() => {
    //when road changes, set isloading to true
    setIsloading(true);
  }, [props.road]);

  return (
    <Box width={410} minHeight={230} position="relative">
      {isloading && image && (
        <Box className="feedback">
          <CircularProgress />
        </Box>
      )}
      {image ? (
        <img
          src={image.url}
          className="mapillaryimg"
          onLoad={() => setIsloading(false)}
          alt="nearby location"
        />
      ) : (
        <Box className="feedback">
          <Typography variant="caption">No image available</Typography>
        </Box>
      )}
      {image && <Typography variant="caption">{image.capturedate}</Typography>}
    </Box>
  );
}

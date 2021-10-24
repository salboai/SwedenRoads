import React, { useState, useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fetchMapillaryImg } from "../../js/mapillary";
import "./Imgbox.css";

export default function Imgbox(props) {
  const [isloading, setIsloading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const hasimg = props.features.length > 0;
    if (hasimg) {
      fetchMapillaryImg(props.features[0].properties.id)
        .then((imgobj) => {
          const d = new Date(imgobj.captured_at);
          const capturedate = d.toISOString().slice(0, 10);
          const url = imgobj.thumb_256_url;
          setImage({ url, capturedate });
        })
        .catch((e) => setImage(null));
    } else {
      setImage(null);
    }
  }, [props.features]);

  useEffect(() => {
    //when road changes, set isloading to true
    setIsloading(true);
  }, [props.road]);

  return (
    <Box position="relative" width={410} minHeight={230} maxWidth="100%">
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
      {image && (
        <Box width={410} display="flex" justifyContent="center">
          <Typography variant="caption" align="center">
            Bild tagen: {image.capturedate}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

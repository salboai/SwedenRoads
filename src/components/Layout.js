import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Container,
  Box,
  Divider,
  Toolbar,
  AppBar,
  useScrollTrigger,
  Grid,
} from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Karta from "./Karta";
import InfoBox from "./InfoBox";
import InfoDrawer from "./InfoDrawer";

function Header(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

Header.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function Layout(props) {
  const [roadproperties, setRoadproperties] = useState({});
  const [images, setImages] = useState([]);

  const updateroadinfo = (properties, images) => {
    setRoadproperties(properties);
    if (images && images.length > 0) {
      setImages(images);
    } else {
      setImages([]);
    }
  };

  return (
    <>
      {/*
      <Header>
        <AppBar position="fixed" component="span" style={{ padding: 0 }}>
          <Toolbar style={{ margin: "auto", width: "100%" }}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item xs={3}>
                <Button>
                  <Typography variant="body1" color="textPrimary">
                    Sveriges Vägar
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Header>
      <Toolbar />
    */}
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

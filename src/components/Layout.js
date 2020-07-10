import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Container,
  Box,
  Divider,
  Toolbar,
  AppBar,
  useScrollTrigger,
} from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import Karta from "./Karta";

import Button from "@material-ui/core/Button";

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
  return (
    <>
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
      <Container>
        <Box my={2}>
          <Karta />
          <Typography variant="body2" align="center" color="textPrimary">
            Underhållsbehov - Färgkodad Karta
          </Typography>
        </Box>
        <Divider />
      </Container>
    </>
  );
}

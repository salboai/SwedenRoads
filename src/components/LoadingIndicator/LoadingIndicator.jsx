import React from "react";
import { Box, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./loadingindicator.css";

export default function LoadingIndicator(props) {
  return props.isLoading ? (
    <Box className="feedback">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography>Hämtar data</Typography>
        <CircularProgress />
      </Box>
    </Box>
  ) : !props.isIdle ? (
    <Box className="feedback">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography>Bearbetar data</Typography>
        <CircularProgress />
      </Box>
    </Box>
  ) : null;
}

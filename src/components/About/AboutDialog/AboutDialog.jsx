import React, { useState } from "react";
import { Box } from "@material-ui/core";
//import Link from "../Link";
import { Button, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ReactMarkdown from "react-markdown";

import "./aboutdialog.css";

export default function InfoDialog(props) {
  const [open, setOpen] = useState(true);

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box onClick={handleClickOpen} className="aboutbutton">
        <Typography variant="body1" component="span">
          {props.label}
        </Typography>
      </Box>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="about-dialog"
        aria-describedby="about-dialog-description"
      >
        <DialogTitle id="about-dialog">{props.label}</DialogTitle>
        <DialogContent>
          <DialogContentText id="about-dialog-description">
            <ReactMarkdown>{props.description}</ReactMarkdown>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Stäng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

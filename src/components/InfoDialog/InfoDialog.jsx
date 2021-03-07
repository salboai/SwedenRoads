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

import "./infodialog.css";

export default function InfoDialog(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box onClick={handleClickOpen} className="textbutton">
        <Typography variant="body1" component="span">
          {props.label}
        </Typography>
      </Box>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="table-info-dialog"
      >
        <DialogTitle id="dialog-title">{props.label}</DialogTitle>
        <DialogContent>
          <DialogContentText>
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

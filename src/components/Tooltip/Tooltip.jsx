import React from "react";
import { Typography } from "@material-ui/core";
import "./tooltip.css";

export default function Tooltip(props) {
  return (
    <div className="tooltip" key={props.key}>
      {props.children}
      <span className="tooltiptext">
        <Typography variant="body1" component="span">
          {props.title}
        </Typography>
      </span>
    </div>
  );
}

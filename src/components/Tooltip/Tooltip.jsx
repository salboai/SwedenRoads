import React from "react";
import "./tooltip.css";

export default function Tooltip(props) {
  return (
    <div className="tooltip" key={props.key}>
      {props.children}
      <span className="tooltiptext">tooltiptext here</span>
    </div>
  );
}

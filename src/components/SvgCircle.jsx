/*
import React from "react";
import { Box } from "@material-ui/core";

export default function Circle(props) {
  return (
    <Box display="inline" height={24} width={24}>
      <svg>
        <circle cx={8} cy={12} r={6} fill={props.color} />
      </svg>
    </Box>
  );
}
*/
import React from "react";

export default function Circle(props) {
  return (
    <div style={{ height: "24px", width: "22px" }}>
      <svg>
        <circle cx={8} cy={12} r={6} fill={props.color} />
      </svg>
    </div>
  );
}

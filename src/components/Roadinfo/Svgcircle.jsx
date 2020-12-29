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

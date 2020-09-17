import React from "react";
import Mapbox from "./Mapbox";

export default function Karta(props) {
  return (
    <>
      <Mapbox updateroadinfo={props.updateroadinfo} />
    </>
  );
}

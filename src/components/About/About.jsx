import React from "react";
import AboutDialog from "./AboutDialog";
import { aboutdescription } from "./aboutdescription";
import "./about.css";

export default function About() {
  return (
    <div className="about">
      <AboutDialog label="Information" description={aboutdescription} />
    </div>
  );
}

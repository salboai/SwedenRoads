import React from "react";
import AboutDialog from "./AboutDialog";
import { welcomecontent, informationcontent } from "./dialogdescriptions";
import "./topnav.css";

export default function TopNav() {
  return (
    <div className="topnav">
      <AboutDialog label="Välkommen" description={welcomecontent} />
      <AboutDialog label="Information" description={informationcontent} />
    </div>
  );
}

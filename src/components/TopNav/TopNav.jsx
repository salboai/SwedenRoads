import React from "react";
import AboutDialog from "./AboutDialog";
import FAQDialog from "./FAQDialog";
import {
  welcomecontent,
  informationcontent,
  FAQcontent,
} from "./dialogdescriptions";
import "./topnav.css";

function Logo() {
  return (
    <div className="logo">
      <a href="https://www.transportforetagen.se/" alt="transportföretagen">
        <img src="/transportföretagen_logo.png" alt="transportföretagen_logo" />
      </a>
    </div>
  );
}

export default function TopNav() {
  return (
    <div className="topnav">
      <AboutDialog label="Välkommen" description={welcomecontent} defaultopen>
        <Logo />
      </AboutDialog>
      <AboutDialog label="Information" description={informationcontent} />
      <FAQDialog label="FAQ" content={FAQcontent} />
    </div>
  );
}

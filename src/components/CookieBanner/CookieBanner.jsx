import React, { useState } from "react";
import { GTAG_OPTIN_KEY } from "gatsby-plugin-google-gtag-optin"; // Or use your own if you changed it in the config
import "./cookiebanner.css";

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(
    localStorage.getItem(GTAG_OPTIN_KEY)
  );

  const handleConsent = () => {
    localStorage.setItem(GTAG_OPTIN_KEY, true);
    setAccepted(true);
    if (typeof window.loadGtag == "function") {
      window.loadGtag();
    }
  };

  return accepted ? null : (
    <div className="cookiebanner">
      <div>Sidan använder cookies för besökarstatistik.</div>
      <button onClick={handleConsent} className="cookieacceptbutton">
        <div className="cookieacceptbuttontext">Acceptera</div>
      </button>
    </div>
  );
}

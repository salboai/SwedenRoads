import React from "react";
import { GTAG_OPTIN_KEY } from "gatsby-plugin-google-gtag-optin"; // Or use your own if you changed it in the config
import "./cookiebanner.css";

export default function CookieBanner() {
  const handleConsent = () => {
    localStorage.setItem(GTAG_OPTIN_KEY, true);
    if (typeof window.loadGtag == "function") {
      window.loadGtag();
    }
  };

  return GTAG_OPTIN_KEY ? null : (
    <div className="cookiebanner">
      <div>Sidan använder cookies för att se antal besökare.</div>
      <button onClick={handleConsent} className="cookieacceptbutton">
        <div className="cookieacceptbuttontext">Acceptera</div>
      </button>
    </div>
  );
}

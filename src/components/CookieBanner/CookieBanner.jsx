import React, { useState, useEffect } from "react";
import { GTAG_OPTIN_KEY } from "gatsby-plugin-google-gtag-optin"; // Or use your own if you changed it in the config
import "./cookiebanner.css";

export default function CookieBanner() {
  const isBrowser = typeof window !== "undefined" && window;
  const [accepted, setAccepted] = useState(
    isBrowser && localStorage.getItem(GTAG_OPTIN_KEY)
  );

  const handleConsent = () => {
    localStorage.setItem(GTAG_OPTIN_KEY, true);
    setAccepted(true);
    if (typeof window.loadGtag == "function") {
      window.loadGtag();
    }
  };

  useEffect(() => {
    if (accepted) {
      window.loadGtag();
    }
  }, []);

  const ignoreComponent = accepted || !isBrowser;
  return ignoreComponent ? null : (
    <div className="cookiebanner">
      <div>This page uses cookies for visitor statistics.</div>
      <button onClick={handleConsent} className="cookieacceptbutton">
        <div className="cookieacceptbuttontext">Accept</div>
      </button>
    </div>
  );
}

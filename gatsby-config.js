require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    defaultTitle: `Våra Vägar`,
    titleTemplate: "%s · Våra Vägar",
    defaultDescription: `Väginformation, Karta och Underhållsbehov av Sveriges vägar.`,
    lang: `sv`,
    siteUrl: "https://www.varavagar.se",
    defaultImage: "transportföretagen_thumb",
    author: "Anders Gustafsson",
  },
  plugins: [
    "gatsby-plugin-top-layout",
    "gatsby-plugin-material-ui",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-google-gtag-optin`,
      options: {
        trackingIds: [`${process.env.GTAG_MEASUREMENTID}`],
        gtagConfig: {
          anonymize_ip: true,
          cookie_flags: "SameSite=None;Secure",
          cookie_domain: "www.varavagar.se",
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          //exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
  ],
  flags: {
    DEV_SSR: false,
  },
};

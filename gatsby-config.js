module.exports = {
  siteMetadata: {
    defaultTitle: `Sweden Roads`,
    titleTemplate: "%s · Sweden Roads",
    defaultDescription: `Färgkodad Karta över framtida underhållsbehov av Sveriges vägar.`,
    lang: `sv`,
    siteUrl: 'https://swedenroads.netlify.app',
    defaultImage: 'andyfx',
    author: 'Anders Gustafsson',
  },
  plugins: [
    'gatsby-plugin-top-layout',
    'gatsby-plugin-material-ui',
    'gatsby-plugin-react-helmet',
  ],
};

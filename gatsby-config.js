module.exports = {
  siteMetadata: {
    defaultTitle: `Sweden Roads`,
    titleTemplate: "%s · Sweden Roads",
    defaultDescription: `Väginformation, Karta och Underhållsbehov av Sveriges vägar.`,
    lang: `sv`,
    siteUrl: 'https://swedenroads.salbo.ai',
    defaultImage: 'andyfx',
    author: 'Anders Gustafsson',
  },
  plugins: [
    'gatsby-plugin-top-layout',
    'gatsby-plugin-material-ui',
    'gatsby-plugin-react-helmet',
  ],
};

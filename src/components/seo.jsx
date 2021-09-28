import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

const query = graphql`
  query SEO {
    allSite {
      nodes {
        siteMetadata {
          defaultTitle
          titleTemplate
          defaultDescription
          siteUrl
          defaultImage
        }
      }
    }
  }
`;

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation();
  const { allSite } = useStaticQuery(query);

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    //defaultImage,
  } = allSite.nodes[0].siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    //image: `${siteUrl}/${defaultImage}.png`,
    image: `${siteUrl}/varavagar600315.jpg`,
    url: `${siteUrl}${pathname}`,
  };

  const ogtitle = title ? `${seo.title} · ${defaultTitle}` : defaultTitle;

  //<Helmet title={seo.title} titleTemplate={titleTemplate}>
  return (
    <Helmet title={ogtitle}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {/*<meta property="og:type" content="article" />*/}
      <meta property="og:title" content={ogtitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="315" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogtitle} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
};

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
};

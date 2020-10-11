import React from "react";
import * as Mapillary from "mapillary-js";
import { Box, Typography } from "@material-ui/core";
import "../css/mapillary-js.css";

const ClientID = process.env.GATSBY_MAPILLARY_CLIENTID;
const ClientSecret = process.env.GATSBY_MAPILLARY_CLIENSECRET;
const AuthenticationURL = process.env.GATSBY_MAPILLARY_AUTHENTICATIONURL;

const some_imagekey = "Gxm65a6IfT0urVcqLSbJRg";
export default class Mapbox extends React.Component {
  constructor(props) {
    super(props);
    this.mapillaryref = React.createRef();

    this.state = {
      pincoord: [16.5509, 59.6368], //västerås
    };
  }

  componentDidMount() {
    const mly = new Mapillary.Viewer("mly", ClientID, some_imagekey);
  }
  //componentWillUnmount() {}

  render() {
    return (
      <>
        <div
          id="mly"
          style={{
            width: "640px",
            height: "480px",
          }}
        ></div>
        <Typography>test</Typography>
      </>
    );
  }
}

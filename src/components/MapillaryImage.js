import React from "react";
import * as Mapillary from "mapillary-js";
import { Box, Typography } from "@material-ui/core";
import "../css/mapillary-js.css";

/*
//how to get "close-to" images:
//https://blog.mapillary.com/product/2017/04/12/how-to-retrieve-mapillary-images-to-use-in-external-tools.html

https://a.mapillary.com/v3/images?client_id=Wm9hc3hHMkdWd0NKNHBiQ3VpUVY4Yzo0YjJkZDk0MjNjMGUyNjBl&closeto=-122.3079,47.6537&radius=200
*/

const ClientID = process.env.GATSBY_MAPILLARY_CLIENTID;
const ClientSecret = process.env.GATSBY_MAPILLARY_CLIENSECRET;
const AuthenticationURL = process.env.GATSBY_MAPILLARY_AUTHENTICATIONURL;

const some_imagekey = "Gxm65a6IfT0urVcqLSbJRg";
export default class MapillaryImage extends React.Component {
  constructor(props) {
    super(props);
    this.viewer = {};
    this.mref = React.createRef();
  }

  componentDidMount() {
    this.viewer = new Mapillary.Viewer(this.mref.current, ClientID, null);
  }
  /*
  componentDidUpdate() {
    this.viewer.moveToKey(this.props.imagekey);
    //const mly = new Mapillary.Viewer("mly", ClientID, this.props.imagekey);
  }
  */
  //componentWillUnmount() {}

  render() {
    return (
      <>
        <Typography>{this.props.imagekey}</Typography>
        <Box ref={this.mref} width={"640px"} height={"480px"} />
      </>
    );
  }
}

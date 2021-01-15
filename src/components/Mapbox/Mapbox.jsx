/* eslint-disable max-len, no-underscore-dangle */
import React from "react";
import mapboxgl from "mapbox-gl";
import { Box, Typography } from "@material-ui/core";
import { FormControlLabel, Switch } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Mapbox.css";

const linecolor1 = [
  "match",
  ["get", "IndxKls"],
  1,
  "#C40A3B",
  2,
  "#F2203E",
  3,
  "#FABF20",
  4,
  "#71C94B",
  5,
  "#20AC65",
  "#ccc", //other
];

const linecolor2 = [
  "match",
  ["get", "IndK2030"],
  1,
  "#C40A3B",
  2,
  "#F2203E",
  3,
  "#FABF20",
  4,
  "#71C94B",
  5,
  "#20AC65",
  "#ccc", //other
];

const defaultpaint = {
  "line-width": ["case", ["boolean", ["feature-state", "hover"], false], 15, 5],
  "line-color": linecolor1,
};

export default class Mapbox extends React.Component {
  constructor(props) {
    super(props);
    this.mapref = React.createRef();
    this.hoveredID = null;
    this.state = {
      center: [16.5509, 59.6368], //västerås
      zoom: 8.37,
      minZoom: 4.0,
      maxZoom: 17.0,
      showingfuture: false,
    };
  }

  componentDidMount() {
    mapboxgl.accessToken = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;
    this.map = new mapboxgl.Map({
      container: this.mapref.current,
      style: `mapbox://styles/mapbox/light-v9`,
      center: this.state.center,
      zoom: this.state.zoom,
      minZoom: this.state.minZoom,
      maxZoom: this.state.maxZoom,
      attributionControl: false,
    });

    this.map.on("load", () => {
      //let source = makesource(collection);
      //this.createsource(id, source);
    });

    this.map.on("mousemove", (e) => {
      var mousefeatures = this.map.queryRenderedFeatures(e.point);
      let hoveredID = null;
      for (let i = 0; i < mousefeatures.length; i++) {
        if (mousefeatures[i].source === "allroads") {
          hoveredID = mousefeatures[i].id;
        }
      }

      if (!hoveredID && this.hoveredID) {
        //not hovering but this.hoveredID is still active. remove it.
        this.map.removeFeatureState({
          source: "allroads",
          id: this.hoveredID,
        });
        this.hoveredID = null;
      } else if (hoveredID && this.hoveredID !== hoveredID) {
        //is hovering but not on this.hoveredID. change to new hoveredID
        this.map.removeFeatureState({
          source: "allroads",
          id: this.hoveredID,
        });
        this.map.setFeatureState(
          {
            source: "allroads",
            id: hoveredID,
          },
          { hover: true }
        );
        this.hoveredID = hoveredID;
      }
    });

    this.map.on("click", (e) => {
      var mousefeatures = this.map.queryRenderedFeatures(e.point);

      //mousefeatures can be several things, some builtin to mapbox
      //check if actually clicked one of our dataset roads.
      let clickedonroad = false;
      let ind = 0;
      for (let i = 0; i < mousefeatures.length; i++) {
        if (mousefeatures[i].source === "allroads") {
          clickedonroad = true;
          ind = i;
        }
      }

      //and call a function that was passed down, also move the marker
      if (clickedonroad) {
        this.placemarker(e.lngLat);
        //mousefeatures[ind].id
        //mousefeatures[ind].properties.IndxKls
        //mousefeatures[ind].properties.IndxKls2
        this.props.onRoadclick(e.lngLat, mousefeatures[ind].id);
        //console.log("mousefeatures[ind]: ", mousefeatures[ind]);
        //this.props.roadclicked(mousefeatures[ind])
        //call some function and/or set some reduxstate here
      } else {
        this.placemarker([0, 0]);
        this.props.onRoadclick(e.lngLat, -1);
        //call some function and/or set some reduxstate here
      }
    });
  }

  togglepaint() {
    if (this.state.showingfuture) {
      this.map.setPaintProperty("layer1", "line-color", linecolor1);
      this.setState({ showingfuture: false });
    } else {
      this.map.setPaintProperty("layer1", "line-color", linecolor2);
      this.setState({ showingfuture: true });
    }
  }

  addsource(id, source) {
    if (this.map.getSource("allroads")) {
      //for debug and reload purpose
      console.log("source already exists, not adding");
    } else {
      console.log("now adding source to this.map");
      this.map.addSource(id, source);

      this.map.addLayer({
        id: "layer1",
        type: "line",
        source: id,
        layout: {
          "line-join": "round",
          "line-cap": "round",
          //visibility: "visible", //default
        },
        paint: defaultpaint,
      });

      let el = document.createElement("div");
      el.className = "marker";
      this.markerelement = new mapboxgl.Marker(el)
        .setLngLat([0, 0])
        .addTo(this.map);
    }
  }

  placemarker(longlat) {
    //this.markerelement.setLngLat(longlat).addTo(this.map);
    this.markerelement.setLngLat(longlat);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    if (!(typeof window !== "undefined" && window)) {
      return null; //cant render if no window (aka when gatsby build)
    } else {
      return (
        <Box className="maincontainer">
          <Box
            ref={this.mapref}
            position="absolute"
            style={{ width: "100%", height: "100%" }}
          />
          {this.props.isloading ? (
            <Box className="feedback">
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography>Hämtar data</Typography>
                <CircularProgress />
              </Box>
            </Box>
          ) : (
            <Box className="togglebutton" bgcolor="#fff" px={1} py={0.5}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.showingfuture}
                    onChange={() => this.togglepaint()}
                    name="checkedA"
                  />
                }
                label="Visa Framtid"
              />
            </Box>
          )}
        </Box>
      );
    }
  }
}

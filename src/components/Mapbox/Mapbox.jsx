/* eslint-disable max-len, no-underscore-dangle */
import React from "react";
import mapboxgl from "mapbox-gl";
import { Box } from "@material-ui/core";
import "./Mapbox.css";
import Searchbar from "../Searchbar";
import LoadingIndicator from "../LoadingIndicator";
import ScenarioButtons from "../ScenarioButtons";
import linecolors from "./linecolors";

mapboxgl.accessToken = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;

const defaultpaint = {
  "line-width": ["case", ["boolean", ["feature-state", "hover"], false], 15, 5],
  "line-color": linecolors.IndxKls,
};

export default class Mapbox extends React.Component {
  constructor(props) {
    super(props);
    this.mapboxcontainerref = React.createRef();
    this.hoveredID = null;
    this.state = {
      showingfuture: false,
      isLoading: true,
      isIdle: false,
    };
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapboxcontainerref.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [16.5509, 59.6368], //some initial location (västerås)
      zoom: 12, //some initial zoom
      minZoom: 4.0, //this covers entire sweden
      maxZoom: 17.0,
      attributionControl: false,
    });

    /*this.map.on("load", () => {
    });*/

    this.map.on("idle", () => {
      //this seems be be the best way to actually listen for when layer has been added and painted.
      this.setState({ isIdle: true });
    });

    this.map.on("mousemove", (e) => {
      const mousefeatures = this.map.queryRenderedFeatures(e.point);
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
      const mousefeatures = this.map.queryRenderedFeatures(e.point);

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

      //move marker and call a function in parent
      if (clickedonroad) {
        this.placemarker(e.lngLat);
        this.props.onRoadclick(e.lngLat, mousefeatures[ind].id);
      } else {
        this.placemarker([0, 0]);
        this.props.onRoadclick(e.lngLat, -1);
      }
    });

    this.map.on("sourcedata", () => {
      if (this.state.isLoading) {
        this.setState({ isLoading: false });
      }
    });

    const fitBounds = (bbox) => {
      //https://docs.mapbox.com/mapbox-gl-js/example/fitbounds/
      this.map.fitBounds(bbox);
    };

    const flyTo = (center) => {
      //https://docs.mapbox.com/mapbox-gl-js/example/flyto/
      this.map.flyTo({
        center: center,
        zoom: 14, //a pretty close up zoom for searched points that dont have bounding boxes
        //essential: true,
      });
    };

    const setPaint = (indexkls) => {
      console.log("setPaint, indexkls: ", indexkls);
      this.map.setPaintProperty("layer1", "line-color", linecolors[indexkls]);
    };

    this.setState({ fitBounds: fitBounds, flyTo: flyTo, setPaint: setPaint });
  }

  addsource(id, source) {
    if (this.map.getSource("allroads")) {
      //for debug and reload purpose
      console.log("source already exists, skipping adding it again");
    } else {
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
            ref={this.mapboxcontainerref}
            position="absolute"
            style={{ width: "100%", height: "100%" }}
          />
          <ScenarioButtons
            setPaint={this.state.setPaint}
            names={Object.keys(linecolors)}
          />
          <Searchbar
            fitBounds={this.state.fitBounds}
            flyTo={this.state.flyTo}
          />
          <LoadingIndicator
            isLoading={this.state.isLoading}
            isIdle={this.state.isIdle}
          />
        </Box>
      );
    }
  }
}

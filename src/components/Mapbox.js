/* eslint-disable max-len, no-underscore-dangle */
import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

async function fetchcollection() {
  return await Promise.all([
    fetch("/data/features.f32array")
      .then((res) => res.arrayBuffer())
      .then((buf) => new Float32Array(buf)),
    fetch("/data/lengths.uint16array")
      .then((res) => res.arrayBuffer())
      .then((buf) => new Uint16Array(buf)),
    fetch("/data/properties.f32array")
      .then((res) => res.arrayBuffer())
      .then((buf) => new Float32Array(buf)),
  ]);
}

function slice2longlats(v) {
  let longlats = [];
  for (let i = 0; i < v.length; i += 2) {
    longlats.push([v[i], v[i + 1]]);
  }
  return longlats;
}

function parsecollection(collection) {
  let coords = collection[0];
  let lengths = collection[1];
  let featureproperties = collection[2];
  let Nproperties = 3; //MAKE SURE THIS IS SAME AS IN featurecollection2properties.js
  console.log("Totalt antal vägar: ", lengths.length);

  let source = {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] },
  };

  let i = 0;
  let len = 0;
  let featurecoordinates = [];

  for (let featureid = 0; featureid < lengths.length; featureid++) {
    //for (let featureid = 0; featureid < 1000; featureid++) {
    len = (lengths[featureid] - 1) * 2; //2 numbers per feature coord
    featurecoordinates = slice2longlats(coords.slice(i, i + len));
    source.data.features.push({
      type: "Feature",
      properties: {
        id: `${featureid}`,
        QClass: featureproperties[featureid * Nproperties],
        PredictedS: featureproperties[featureid * Nproperties + 1],
        RemainingS: featureproperties[featureid * Nproperties + 2],
      },
      geometry: {
        type: "LineString",
        coordinates: featurecoordinates,
      },
    });
    i += len;
  }
  return source;
}

const layerpaint = {
  "line-width": {
    base: 1,
    stops: [
      [8, 1],
      [9, 2],
      [10, 4],
      [11, 8],
      [12, 16],
      [13, 16],
      [14, 16],
    ],
  },
  "line-color": [
    "match",
    ["get", "QClass"],
    1,
    "#FF0000",
    2,
    "#FF8000",
    3,
    "#FFFF00",
    4,
    "#7FFF00",
    5,
    "#00FF00",
    "#ccc", //other
  ],
};

//QClass 1,2,3,4,5
//RemainingS -91..34
//PredictedS 3..37

const layerpaint2 = {
  "line-width": {
    base: 1,
    stops: [
      [8, 1],
      [9, 2],
      [10, 4],
      [11, 8],
      [12, 16],
      [13, 16],
      [14, 16],
    ],
  },
  "line-color": [
    "interpolate",
    ["linear"],
    ["get", "QClass"],
    1,
    "#FF0000",
    5,
    "#00FF00",
  ],
};

export default class Mapbox extends React.Component {
  constructor(props) {
    super(props);
    this.mapref = React.createRef();
    this.state = {
      center: [16.5509, 59.6368], //västerås
      zoom: 8.37,
      isfetching: true,
      isunpacking: false,
    };
  }

  componentDidMount() {
    mapboxgl.accessToken = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;
    this.map = new mapboxgl.Map({
      container: this.mapref.current,
      style: `mapbox://styles/mapbox/light-v9`,
      center: this.state.center,
      zoom: this.state.zoom,
      minZoom: 4.0,
      maxZoom: 17.0,
      attributionControl: false,
    });

    fetchcollection().then((collection) => {
      this.setState({ isfetching: false, isunpacking: true });

      let id = "allroads";
      this.map.on("load", () => {
        this.createsource(id, parsecollection(collection));
        this.setState({ isunpacking: false });
      });

      this.map.on("click", (e) => {
        var mousefeatures = this.map.queryRenderedFeatures(e.point);
        for (let i = 0; i < mousefeatures.length; i++) {
          if (mousefeatures[i].source === "allroads") {
            console.log("properties: ", mousefeatures[i].properties);
          }
        }
      });
    });
  }

  createsource(id, source) {
    this.map.addSource(id, source);
    this.map.addLayer({
      id: id,
      type: "line",
      source: id,
      layout: {
        "line-join": "round",
        "line-cap": "round",
        //visibility: "none",
      },
      paint: layerpaint,
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    if (!(typeof window !== "undefined" && window)) {
      return null; //cant render if no window (aka when gatsby build)
    } else {
      return (
        <>
          {this.state.isfetching ? (
            <>
              <Typography variant="body1" align="center" component="span">
                Hämtar komprimerad data (30MB){" "}
                <CircularProgress color="secondary" />
              </Typography>
            </>
          ) : null}
          {this.state.isunpacking ? (
            <>
              <Typography variant="body1" align="center" component="span">
                Packar upp data <CircularProgress />
              </Typography>
            </>
          ) : null}
          <div
            style={{
              width: "100%",
              height: "80vh",
              position: "relative", //needed for controls to layout correctly
              margin: "auto",
            }}
          >
            <div ref={this.mapref} style={{ width: "100%", height: "100%" }} />
          </div>
        </>
      );
    }
  }
}

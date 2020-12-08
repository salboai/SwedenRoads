/* eslint-disable max-len, no-underscore-dangle */
import React from "react";
import mapboxgl from "mapbox-gl";
import "../css/mapbox-gl.css";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

/*
async function fetchcollection() {
  let url1 = "https://storage.googleapis.com/swedenroads/coordinates.f32array";
  let url2 = "https://storage.googleapis.com/swedenroads/lengths.uint16array";
  let url3 = "https://storage.googleapis.com/swedenroads/properties.f32array";
  return await Promise.all([
    fetch(url1)
      .then((res) => res.arrayBuffer())
      .then((buf) => new Float32Array(buf)),
    fetch(url2)
      .then((res) => res.arrayBuffer())
      .then((buf) => new Uint16Array(buf)),
    fetch(url3)
      .then((res) => res.arrayBuffer())
      .then((buf) => new Float32Array(buf)),
  ]);
}
*/

async function fetchcollection() {
  //let url1 = "/coordinates.f32array";
  //let url2 = "/lengths.uint16array";
  //let url3 = "/properties.int16array";

  let url1 =
    "https://storage.googleapis.com/swedenroads/coordinates2020.f32array";
  let url2 =
    "https://storage.googleapis.com/swedenroads/lengths2020.uint16array";
  let url3 =
    "https://storage.googleapis.com/swedenroads/properties2020.int16array";
  return await Promise.all([
    fetch(url1)
      .then((res) => res.arrayBuffer())
      .then((buf) => new Float32Array(buf)),
    fetch(url2)
      .then((res) => res.arrayBuffer())
      .then((buf) => new Uint16Array(buf)),
    fetch(url3)
      .then((res) => res.arrayBuffer())
      .then((buf) => new Int16Array(buf)),
  ]);
}

async function fetchNearbyImages(longlat, radius = 150) {
  const MapillaryClientID = process.env.GATSBY_MAPILLARY_CLIENTID;
  const baseurl = "https://a.mapillary.com/v3/images?";
  const lng = longlat.lng;
  const lat = longlat.lat;
  const mapillaryurl = `${baseurl}client_id=${MapillaryClientID}&closeto=${lng},${lat}&radius=${radius}`;
  const featurecollection = await fetch(mapillaryurl).then((res) => res.json());
  return featurecollection.features;
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
  let props = collection[2];
  let Nfeatures = lengths.length;
  let Nprops = 31; //MAKE SURE THIS IS SAME AS IN featurecollection2properties.js
  console.log("Totalt antal features: ", Nfeatures);

  let i = 0;
  let len = 0;
  let features = new Array(Nfeatures);

  for (let id = 0; id < Nfeatures; id++) {
    len = lengths[id] * 2; //2 numbers per feature coord

    features[id] = {
      type: "Feature",
      id: id,
      properties: {
        ÅtrstnL: props[id * Nprops],
        Hastght: props[id * Nprops + 1],
        DoU2017: props[id * Nprops + 2],
        ÅDT_tng: props[id * Nprops + 3],
        ÅDT_mtr: props[id * Nprops + 4],
        Vägnmmr: props[id * Nprops + 5],
        Vägktgr: props[id * Nprops + 6],
        Vägtyp: props[id * Nprops + 7],
        Längd: props[id * Nprops + 8],
        Blggnngst: props[id * Nprops + 9],
        Län_nr: props[id * Nprops + 10],
        Kmmn_nr: props[id * Nprops + 11],
        Trfkkls: props[id * Nprops + 12],
        IRI_ndr: props[id * Nprops + 13] / 10,
        Sprdjp_: props[id * Nprops + 14],
        Region: props[id * Nprops + 15],
        Ålder: props[id * Nprops + 16],
        FrvntdL: props[id * Nprops + 17],
        TllstnI: props[id * Nprops + 18],
        IndxKls: props[id * Nprops + 19],
        ÅDT_frd: props[id * Nprops + 20] * 10,
        Spårdjp: props[id * Nprops + 21] / 100,
        IRI: props[id * Nprops + 22] / 100,
        Vägbrdd: props[id * Nprops + 23] / 100,
        Brghtsk: props[id * Nprops + 24],
        Byear: props[id * Nprops + 25],
        Bmonth: props[id * Nprops + 26],
        Bday: props[id * Nprops + 27],
        Myear: props[id * Nprops + 28],
        Mmonth: props[id * Nprops + 29],
        Mday: props[id * Nprops + 30],
      },
      geometry: {
        type: "LineString",
        coordinates: slice2longlats(coords.slice(i, i + len)),
      },
    };
    i += len;
  }

  const source = {
    type: "geojson",
    data: { type: "FeatureCollection", features: features },
  };
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
    ["get", "IndxKls"],
    1,
    "#FF0000",
    2,
    "#FF8000",
    3,
    "#FFFF00",
    4,
    "#9FCC00",
    5,
    "#00CC00",
    "#ccc", //other
  ],
};

//"case",
//["boolean", ["feature-state", "hover"], false],
const layerpaint2 = {
  "line-width": ["case", ["boolean", ["feature-state", "hover"], false], 15, 5],
  "line-color": [
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
  ],
};

export default class Mapbox extends React.Component {
  constructor(props) {
    super(props);
    this.mapref = React.createRef();
    this.hoveredID = null;
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

    fetchcollection()
      .then((collection) => {
        this.setState({ isfetching: false, isunpacking: true });

        let id = "allroads";
        this.map.on("load", () => {
          let parsedcollection = parsecollection(collection);
          this.createsource(id, parsedcollection);
          this.setState({ isunpacking: false });
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
            fetchNearbyImages(e.lngLat).then((images) => {
              this.props.updateroadinfo(mousefeatures[ind].properties, images);
            });
          } else {
            this.placemarker([0, 0]);
            this.props.updateroadinfo({});
          }
        });
      })
      .catch((err) => {
        console.log("fetchcollection().catch: ", err);
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
      paint: layerpaint2,
    });

    let el = document.createElement("div");
    el.className = "marker";
    this.markerelement = new mapboxgl.Marker(el)
      .setLngLat([0, 0])
      .addTo(this.map);
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
        <>
          {this.state.isfetching && (
            <Typography variant="body1" align="center" component="span">
              Hämtar komprimerad data (30MB){" "}
              <CircularProgress color="secondary" />
            </Typography>
          )}
          {this.state.isunpacking && (
            <Typography variant="body1" align="center" component="span">
              Packar upp data <CircularProgress />
            </Typography>
          )}
          <div
            style={{
              width: "100vv",
              height: "96vh",
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

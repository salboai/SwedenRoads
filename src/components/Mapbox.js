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
  let featureproperties = collection[2];
  let Nproperties = 31; //MAKE SURE THIS IS SAME AS IN featurecollection2properties.js
  console.log("Totalt antal vägar: ", lengths.length);

  let source = {
    type: "geojson",
    //generateId: true,
    data: { type: "FeatureCollection", features: [] },
  };

  let i = 0;
  let len = 0;
  let featurecoordinates = [];

  for (let featureid = 0; featureid < lengths.length; featureid++) {
    //for (let featureid = 0; featureid < 1000; featureid++) {
    len = lengths[featureid] * 2; //2 numbers per feature coord
    featurecoordinates = slice2longlats(coords.slice(i, i + len));
    source.data.features.push({
      type: "Feature",
      id: `${featureid}`,
      properties: {
        id: `${featureid}`,
        ÅtrstnL: featureproperties[featureid * Nproperties],
        Hastght: featureproperties[featureid * Nproperties + 1],
        DoU2017: featureproperties[featureid * Nproperties + 2],
        ÅDT_tng: featureproperties[featureid * Nproperties + 3],
        ÅDT_mtr: featureproperties[featureid * Nproperties + 4],
        Vägnmmr: featureproperties[featureid * Nproperties + 5],
        Vägktgr: featureproperties[featureid * Nproperties + 6],
        Vägtyp: featureproperties[featureid * Nproperties + 7],
        Längd: featureproperties[featureid * Nproperties + 8],
        Blggnngst: featureproperties[featureid * Nproperties + 9],
        Län_nr: featureproperties[featureid * Nproperties + 10],
        Kmmn_nr: featureproperties[featureid * Nproperties + 11],
        Trfkkls: featureproperties[featureid * Nproperties + 12],
        IRI_ndr: featureproperties[featureid * Nproperties + 13],
        Sprdjp_: featureproperties[featureid * Nproperties + 14],
        Region: featureproperties[featureid * Nproperties + 15],
        Ålder: featureproperties[featureid * Nproperties + 16],
        FrvntdL: featureproperties[featureid * Nproperties + 17],
        TllstnI: featureproperties[featureid * Nproperties + 18],
        IndxKls: featureproperties[featureid * Nproperties + 19],
        ÅDT_frd: featureproperties[featureid * Nproperties + 20] * 10,
        Spårdjp: featureproperties[featureid * Nproperties + 21] / 100,
        IRI: featureproperties[featureid * Nproperties + 22] / 100,
        Vägbrdd: featureproperties[featureid * Nproperties + 23] / 100,
        Brghtsk: featureproperties[featureid * Nproperties + 24],
        Byear: featureproperties[featureid * Nproperties + 25],
        Bmonth: featureproperties[featureid * Nproperties + 26],
        Bday: featureproperties[featureid * Nproperties + 27],
        Myear: featureproperties[featureid * Nproperties + 28],
        Mmonth: featureproperties[featureid * Nproperties + 29],
        Mday: featureproperties[featureid * Nproperties + 30],
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
            <>
              <Typography variant="body1" align="center" component="span">
                Hämtar komprimerad data (30MB){" "}
                <CircularProgress color="secondary" />
              </Typography>
            </>
          )}
          {this.state.isunpacking && (
            <>
              <Typography variant="body1" align="center" component="span">
                Packar upp data <CircularProgress />
              </Typography>
            </>
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

import React, { useState, useEffect, useRef } from "react";
import { Box } from "@material-ui/core";

import Mapbox from "../Mapbox";
import Roadinfo from "../Roadinfo";
import useSource from "../../hooks/useSource";
import useProperties from "../../hooks/useProperties";
import TopNav from "../TopNav";
import CookieBanner from "../CookieBanner";
import { isMobileOnly } from "react-device-detect";
import { fetchNearbyImages } from "../../js/mapillary"
import "./layout.css";

export default function Layout(props) {
  const mapboxref = useRef();
  const source = useSource();
  const properties = useProperties();
  const [road, setRoad] = useState({ isopen: false });
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    if (isMobileOnly) {
      alert(
        "Please note: This website works best on Tablet, Laptop or Desktop."
      );
    }
  }, []);

  const onRoadclick = (lnglat, id) => {
    //console.log("clickedroad, id:", id);
    if (!properties.isLoading) {
      //console.log("lnglat: ", lnglat);
      setRoad({ lnglat, id, properties: properties.data[id], isopen: id >= 0 });
      fetchNearbyImages(lnglat)
        .then((x) => {
          setFeatures(x);
        })
        .catch((e) => {
          setFeatures([]);
        });
    }
  };

  useEffect(() => {
    if (!source.isLoading) {
      mapboxref.current.addsource("allroads", source.data);
    }
  }, [source]);

  return (
    <Box className="layoutcontainer">
      <TopNav />
      <Roadinfo road={road} features={features} />
      <CookieBanner />
      <Mapbox ref={mapboxref} onRoadclick={onRoadclick} />
    </Box>
  );
}

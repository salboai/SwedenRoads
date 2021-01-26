import React, { useState } from "react";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./searchbar.css";

async function fetchplaces(str) {
  const token = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;
  const baseurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  const query = `${str}.json?autocomplete=true&country=se&access_token=${token}`;
  const url = `${baseurl}${query}`;
  const data = await fetch(url).then((res) => res.json());
  return data;
}

function vec2obj(vec) {
  //with place_name as key
  let obj = {};
  for (let i = 0; i < vec.length; i++) {
    obj[vec[i].place_name] = vec[i];
  }
  return obj;
}

export default function Searchbar(props) {
  const [tag, setTag] = useState("");
  const [selected, setSelected] = useState("");
  const [places, setPlaces] = useState({});

  const handleTag = (e, v) => {
    setTag(v);
    fetchplaces(v).then((data) => {
      if (data.features) {
        setPlaces(vec2obj(data.features));
      } else {
        console.log("places dont have features");
        setPlaces({});
      }
    });
  };

  const handleSelected = (e, v) => {
    const p = places[v];
    setSelected(v);
    if (p.bbox) {
      //some places such as municipalities have a bounding box. nice.
      props.fitBounds(p.bbox);
    } else {
      props.flyTo(p.center);
    }
  };

  return (
    <Autocomplete
      className="autocomplete"
      inputValue={tag} //the typed text
      onInputChange={handleTag}
      value={selected} //the selected option
      onChange={handleSelected}
      freeSolo
      id="search-place"
      disableClearable
      options={Object.keys(places)}
      renderInput={(params) => (
        <TextField
          className="textfield"
          {...params}
          label="Sök plats"
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
}

/*
onKeyDown={(e) => {
        if (e.key === "Enter") {
          //console.log("pressed enter. selected is now: ", selected);
          //console.log("pressed enter. e: ", e);
          console.log("pressed enter. ind: ", e.target.dataset.optionIndex);
          //setAutoCompleteValue(autoCompleteValue.concat(e.target.value));
        }
      }}
      */

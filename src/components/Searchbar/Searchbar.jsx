import React, { useState } from "react";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

async function fetchplaces(str) {
  const token = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;
  //const token = "pk.eyJ1Ijoic2FsYm9haSIsImEiOiJja2Nldjl3bjcwYzZsMnJwYzFrNnF1YTIwIn0.P9sRvGp848IlDhyJPKTw0Q"
  const baseurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  const query = `${str}.json?autocomplete=true&country=se&access_token=${token}`;
  const url = `${baseurl}${query}`;
  const data = await fetch(url).then((res) => res.json());
  return data;
}

export default function Searchbar(props) {
  const [tag, setTag] = useState("");
  const [selected, setSelected] = useState("");
  const [places, setPlaces] = useState([]);

  const handleTag = (e, v) => {
    setTag(v);
    fetchplaces(v).then((data) => {
      if (data.features) {
        setPlaces(data.features);
      } else {
        setPlaces([]);
      }
    });
  };

  const handleSelected = (e, v) => {
    setSelected(v);
    const p = places[e.target.dataset.optionIndex];
    props.fitBounds(p.bbox);
    /*
    props.fitBounds([
      [32.958984, -5.353521],
      [43.50585, 5.615985],
    ]);
    */

    console.log("selected place: ", p);
  };

  return (
    <Autocomplete
      inputValue={tag}
      onInputChange={handleTag}
      value={selected}
      onChange={handleSelected}
      freeSolo
      id="search-place"
      disableClearable
      options={places.map((place) => place.place_name)}
      renderInput={(params) => (
        <TextField
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

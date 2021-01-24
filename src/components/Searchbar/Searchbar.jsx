import React, { useState } from "react";
import { TextField } from "@material-ui/core";

async function fetchplaces(str) {
  const token = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;
  //const token = "pk.eyJ1Ijoic2FsYm9haSIsImEiOiJja2Nldjl3bjcwYzZsMnJwYzFrNnF1YTIwIn0.P9sRvGp848IlDhyJPKTw0Q"
  const baseurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  const query = `${str}.json?autocomplete=true&country=se&access_token=${token}`;
  const url = `${baseurl}${query}`;
  const data = await fetch(url).then((res) => res.json());
  console.log("data: ", data);
  return data;
}

export default function Searchbar() {
  const [tag, setTag] = useState("");

  const handleChange = (e) => {
    const q = e.target.value;
    setTag(q);
    fetchplaces(q).then((data) => {
      console.log("then data: ", data);
    });
  };

  return <TextField label="Sök" value={tag} onChange={handleChange} />;
}

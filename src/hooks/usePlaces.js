import { useState, useEffect } from "react";

const token = process.env.GATSBY_MAPBOX_ACCESS_TOKEN;
const baseurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

async function fetchplaces(str) {
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

export default function usePlaces(tag) {
  //return both the vector and object
  const [places, setPlaces] = useState([[], []]);

  useEffect(() => {
    if (tag === "") {
      //dont fetch for empty string (initial and later)
      setPlaces([[], {}]);
    } else {
      fetchplaces(tag)
        .then((data) => {
          if (data.features) {
            setPlaces([data.features, vec2obj(data.features)]);
          } else {
            //console.log("places dont have features");
            setPlaces([[], {}]);
          }
        })
        .catch((e) => {
          //console.log("couldnt fetch places");
          setPlaces([[], {}]);
        });
    }
  }, [tag]);

  return places;
}

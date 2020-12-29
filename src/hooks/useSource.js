import usePromise from "react-fetch-hook/usePromise";

function slice2longlats(v) {
  let longlats = [];
  for (let i = 0; i < v.length; i += 2) {
    longlats.push([v[i], v[i + 1]]);
  }
  return longlats;
}

function makesource(collection) {
  let coords = collection[0];
  let lengths = collection[1];
  let props = collection[2];
  let Nfeatures = lengths.length;
  let Nprops = 2; //MAKE SURE THIS IS SAME AS IN the datascript that generated it
  console.log("Total number of features: ", Nfeatures);

  let i = 0;
  let len = 0;
  const features = new Array(Nfeatures);

  for (let id = 0; id < Nfeatures; id++) {
    len = lengths[id] * 2; //2 numbers per feature coord

    features[id] = {
      type: "Feature",
      id: id,
      properties: {
        IndxKls: props[id * Nprops],
        //IndxKls2: props[id * Nprops + 1],
        IndxKls2: 1, //debug with all red future
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

async function fetchsource() {
  //let url1 = "/coordinates2020.f32array";
  //let url2 = "/lengths2020.uint16array";
  //let url3 = "/indexKls2020.uint8array";
  let url1 =
    "https://storage.googleapis.com/swedenroads/coordinates2020.f32array";
  let url2 =
    "https://storage.googleapis.com/swedenroads/lengths2020.uint16array";
  let url3 =
    "https://storage.googleapis.com/swedenroads/indexKls2020.uint8array";

  const collection = await Promise.all([
    fetch(url1)
      .then((res) => res.arrayBuffer())
      .then((buf) => new Float32Array(buf)),
    fetch(url2)
      .then((res) => res.arrayBuffer())
      .then((buf) => new Uint16Array(buf)),
    fetch(url3)
      .then((res) => res.arrayBuffer())
      .then((buf) => new Uint8Array(buf)),
  ]);
  const source = makesource(collection);
  return source;
}

export default function useSource() {
  return usePromise(() => fetchsource());
}

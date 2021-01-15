import usePromise from "react-fetch-hook/usePromise";

function slice2longlats(v) {
  // v=[1,2,3,4,5,6] => [[1,2],[3,4],[5,6]]
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
        IndK2030: props[id * Nprops + 1],
        //IndK2030: 1, //debug with all red future
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
  //debug by placing arrays in the static folder
  //let url1 = "/coordinates2020v3.f32array";
  //let url2 = "/lengths2020v3.uint16array";
  //let url3 = "/indexKls2020v3.uint8array";

  const baseurl = "https://storage.googleapis.com/swedenroads";
  let url1 = `${baseurl}/coordinates2020v3.f32array`;
  let url2 = `${baseurl}/lengths2020v3.uint16array`;
  let url3 = `${baseurl}/indexKls2020v3.uint8array`;

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

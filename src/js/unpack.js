function slice2longlats(v) {
  let longlats = [];
  for (let i = 0; i < v.length; i += 2) {
    longlats.push([v[i], v[i + 1]]);
  }
  return longlats;
}

export function makesource(collection) {
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
        IndxKls2: props[id * Nprops + 1],
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

function makeVERYEXPENSIVEsource(collection) {
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

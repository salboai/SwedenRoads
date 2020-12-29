import usePromise from "react-fetch-hook/usePromise";

function makeproperties(v) {
  let Nprops = 31; //MAKE SURE THIS IS SAME AS IN featurecollection2properties.js
  let Nfeatures = v.length / Nprops;
  console.log("Totalt antal features (makeproperties): ", Nfeatures);

  const properties = new Array(Nfeatures);
  for (let id = 0; id < Nfeatures; id++) {
    properties[id] = {
      ÅtrstnL: v[id * Nprops],
      Hastght: v[id * Nprops + 1],
      DoU2017: v[id * Nprops + 2],
      ÅDT_tng: v[id * Nprops + 3],
      ÅDT_mtr: v[id * Nprops + 4],
      Vägnmmr: v[id * Nprops + 5],
      Vägktgr: v[id * Nprops + 6],
      Vägtyp: v[id * Nprops + 7],
      Längd: v[id * Nprops + 8],
      Blggnngst: v[id * Nprops + 9],
      Län_nr: v[id * Nprops + 10],
      Kmmn_nr: v[id * Nprops + 11],
      Trfkkls: v[id * Nprops + 12],
      IRI_ndr: v[id * Nprops + 13] / 10,
      Sprdjp_: v[id * Nprops + 14],
      Region: v[id * Nprops + 15],
      Ålder: v[id * Nprops + 16],
      FrvntdL: v[id * Nprops + 17],
      TllstnI: v[id * Nprops + 18],
      IndxKls: v[id * Nprops + 19],
      ÅDT_frd: v[id * Nprops + 20] * 10,
      Spårdjp: v[id * Nprops + 21] / 100,
      IRI: v[id * Nprops + 22] / 100,
      Vägbrdd: v[id * Nprops + 23] / 100,
      Brghtsk: v[id * Nprops + 24],
      Byear: v[id * Nprops + 25],
      Bmonth: v[id * Nprops + 26],
      Bday: v[id * Nprops + 27],
      Myear: v[id * Nprops + 28],
      Mmonth: v[id * Nprops + 29],
      Mday: v[id * Nprops + 30],
    };
  }

  return properties;
}

async function fetchproperties() {
  //let url = "/properties2020.int16array";
  let url =
    "https://storage.googleapis.com/swedenroads/properties2020.int16array";

  const collection = await fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new Int16Array(buf));
  const properties = makeproperties(collection);
  return properties;
}

export default function useProperties() {
  return usePromise(() => fetchproperties());
}

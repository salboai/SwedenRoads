import usePromise from "react-fetch-hook/usePromise";

async function fetchcollection() {
  const url1 =
    "https://storage.googleapis.com/swedenroads/coordinates2020.f32array";
  const url2 =
    "https://storage.googleapis.com/swedenroads/lengths2020.uint16array";
  const url3 =
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

export default function useData() {
  return usePromise(() => fetchcollection());
}

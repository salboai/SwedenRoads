import fetch from "node-fetch";
import { VectorTile } from "@mapbox/vector-tile";
import Protobuf from "pbf";

const client_token = process.env.GATSBY_MAPILLARY_CLIENT_TOKEN;

/**
 * The images dont have static urls, so fetch based on id when needed.
 *
 * imgobj = {thumb_256_url, captured_at}
 */
export async function fetchMapillaryImg(id) {
  const api_url = `https://graph.mapillary.com/${id}?access_token=${client_token}&fields=thumb_256_url,captured_at`;
  const imgobj = await fetch(api_url).then((res) => res.json());
  //const d = new Date(imgobj.captured_at)
  //console.log("captured_at: ", d.toISOString().slice(0,10))
  //const url = imgobj.thumb_256_url
  return imgobj;
}

const deg2rad = (deg) => (Math.PI * deg) / 180;

/**
 * https://github.com/taneljairus/random-mapillary-stuff/blob/master/mapillary_v4_downloader.py
 */
function deg2num(lng, lat, zoom) {
  const lat_rad = deg2rad(lat);
  const n = Math.pow(2, zoom);
  const xtile = parseInt(((lng + 180) / 360) * n);
  const ytile = parseInt(
    ((1 - Math.asinh(Math.tan(lat_rad)) / Math.PI) / 2) * n
  );
  return [xtile, ytile];
}

/**
 * In Mapillary v4 we can no longer query for "closeto=${lng},${lat}&radius=${radius}"
 * we must instead ourselves do:
 * 1. find the correct vector tile
 * 1. fetch the entire vector tile
 * 3. parse its features and sort/filter yourself
 */
async function fetchVectorTileImageFeatures(lnglat, zoom = 14) {
  const [xtile, ytile] = deg2num(lnglat.lng, lnglat.lat, zoom);

  const type = "mly1_public"; //"mly1_computed_public"
  const baseurl = `https://tiles.mapillary.com/maps/vtp/${type}/2`;
  const url = `${baseurl}/${zoom}/${xtile}/${ytile}?access_token=${client_token}`;
  const buf = await fetch(url).then((res) => res.arrayBuffer());
  const tile = new VectorTile(new Protobuf(buf));
  //let layers = Object.keys(tile.layers);

  const imagefeatures = [];

  if (tile?.layers?.image) {
    let layer = tile.layers.image;
    for (let i = 0; i < layer.length; i++) {
      let feature = layer.feature(i).toGeoJSON(xtile, ytile, zoom);
      imagefeatures.push(feature);
    }
  }
  return imagefeatures;
}

const dist = (p1, p2) => Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);

/**
 * Sort images by distance to lnglat, closest first
 */
function sortFeaturesByDist(imagefeatures, lnglat) {
  const coord = [lnglat.lng, lnglat.lat];
  return imagefeatures.sort((a, b) => {
    let p1 = a.geometry.coordinates;
    let p2 = b.geometry.coordinates;
    return dist(p1, coord) - dist(p2, coord);
  });
}

function isWithinDist(feature, lnglat, radius = 150) {
  return dist(feature.geometry.coordinates, [lnglat.lng, lnglat.lat]) < radius;
}

export async function fetchNearbyImages(lnglat, radius = 150) {
  const imagefeatures = await fetchVectorTileImageFeatures(lnglat);
  const imagefeaturessorted = sortFeaturesByDist(imagefeatures, lnglat);
  if (isWithinDist(imagefeaturessorted[0], lnglat, radius)) {
    return [imagefeaturessorted[0]];
  } else {
    return [];
  }
}

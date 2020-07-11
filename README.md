# Sveriges vägar - notes to self:
## data
Sweden.zip ~ 250MB
unzip -> Kristin_S.shp

## ...some googling
There is a good tool for converting between data formats GeoJSON, Shapefile, PostGIS and others:
[ogr2ogr](https://gdal.org/programs/ogr2ogr.html), which is part of the [Geospatial Data Abstraction Library](https://gdal.org/index.html)

## Geojson specification
Coordinate reference system is the World Geodetic System 1984 (WGS84), with long,lat units of decimal degreees aka Open Geospatial Consortium (OGC) urn:ogc:def:crs:OGC::CRS84

## Convert
So use format=geojson and target_reference_system=urn:ogc:def:crs:OGC::CRS84
```bash
sudo apt-get install gdal-bin
ogr2ogr -f GeoJSON -t_srs urn:ogc:def:crs:OGC::CRS84 featurecollection.json Kristin_S.shp
```
featurecollection.json ~ 400Mb

featurecollection.json is in the correct format, but its huge and not usable on a website.

## Massage
data looks like this:
featurecollection has features
features have properties and geometry

- properties is a list of stuff describing this feature aka road (some numbers and some strings)
- geometry is an array of array[latitude, longitude, height]

where height is meters above the [WGS 84 reference ellipsoid](https://gisgeography.com/wgs84-world-geodetic-system/)

with a custom script, go though the collection and store the numbers as typed arrays instead of strings:

```
node features2typedarrays.js
node features2properties.js
```

- features.f32array ~ 29.5 MB
- lengths.uin16array ~ 0.5 MB
- properties (3 numbers for now QClass, PredictedS, RemainingS) ~ 2.7 MB

these can be fetched in parallell so it will potentially load
400/29.5 = 10.1 times faster, (but at a minimum 400/42.7 = 9.4 times faster)


## mapbox

[how to work with lines](https://docs.mapbox.com/mapbox-gl-js/example/geojson-line/)

## Cloudstorage

30 MB is still to big to be hosted on a static website cdn like netlify, even though it works nicely with gatsby develop and even gatsby build locally when developing. (they recommend above 20MB to be hosted elsewhere)

so put the file on storage.googleapis.com/ (Which I have to pay for, depending on usage) and fetch from there.
But also make it public by setting permission for "AllUsers" [according to this](https://cloud.google.com/storage/docs/access-control/making-data-public#console)

Nope, need "CORS headers" on the cloud bucket and choose which sites have access to the bucket. This can NOT simply be done in the ui so..
- download install gcloud CLI
- make a bucketcors.json file specifying stuff
- upload CORS settings [accordign to docs](https://cloud.google.com/storage/docs/configuring-cors#gsutil) to the bucket 

note: I should change origin to not be "star" but rather a websites I want to have access, star means every website.

so bucketcors.json:
```json
[
    {
      "origin": ["*"],
      "method": ["GET"],
      "responseHeader": ["Content-Type"],
      "maxAgeSeconds": 3600
    }
]
```
```bash
gcloud init
gsutil cors set bucketcors.json gs://swedenroads
```

now the 30MB data can be speedily fetched from [here](https://storage.googleapis.com/swedenroads/coordinates.f32array)

and the website is [swedenroads.netlify.app](https://swedenroads.netlify.app)
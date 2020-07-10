# Sveriges vägar - notes to self:
## data
Sweden.zip ~ 250MB
unzip -> Kristin_S.shp

## ...some googling
There is a good tool for converting between data formats GeoJSON, Shapefile, PostGIS and others:
(ogr2ogr)[https://gdal.org/programs/ogr2ogr.html], which is part of the (Geospatial Data Abstraction Library)[https://gdal.org/index.html]

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

where height is meters above the (WGS 84 reference ellipsoid)[https://gisgeography.com/wgs84-world-geodetic-system/]"

with a custom script, go though the collection and store the numbers as typed arrays instead of strings:

```
node features2typedarrays.js
node features2properties.js
```
features.f32array ~ 30MB
lengths.uin16array ~ 7MB
properties (3 numbers for now QClass, PredictedS, RemainingS) ~ 3 MB

these can be fetched in parallell so it will potentially load
400/30 = 13x faster, (but at a minimum 400/40 = 10x faster)

## 



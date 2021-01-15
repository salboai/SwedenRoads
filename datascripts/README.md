# converting .shp to typedarrays

### install ogr2ogr

```bash
sudo apt-get install gdal-bin
```

### step 1: .shp -> .json

```bash
ogr2ogr -f GeoJSON -t_srs urn:ogc:def:crs:OGC::CRS84 featurecollection.json some_shapefile.shp
```

### step 2: .json -> typedarrays

```bash
node featurecollection2indexKls.js
node featurecollection2properties.js
node featurecollection2typedarrays.js
```

### step 3: parse typedarrays clientside

modify src/hooks/useProperties and useSource accordingly. They essentially reverse what these scripts do. The whole point of this is to be able to download like 60MB (the arrays) instead of 500MB (the json).

### Note

If the shapefile changes content. redo step 1-3.

//https://stackoverflow.com/questions/20306750/what-is-a-compact-way-to-save-a-float32array-to-disk-on-node-js/23347027

//https://nodejs.org/api/buffer.html#buffer_buf_writeint16le_value_offset

var fs = require("fs");
const collection = require("./featurecollection.json");

function safe(x) {
  //zero instead of null.
  let r = x === null ? 0 : x;
  r = isFinite(r) ? r : 0;
  return r;
}

function write_int16(buf, x, i, bs, factor = 1) {
  //factor 10 means store 0.2 as 2.
  //These multiplication needs to be undone when parsing arrays later (on clientside)
  let k = safe(Math.round(factor * parseFloat(x)));
  buf.writeInt16LE(k, i);
  return i + bs;
}

function writearray(features) {
  Nproperties = 32;

  let N = 0; //length of array
  for (let n = 0; n < features.length; n++) {
    if (features[n].geometry !== null) {
      N += Nproperties;
    }
  }
  //let bs = 2; //size in bytes of a single number. 2 bytes per int16 aka 16bit number
  let bs = 2;
  let buf = new Buffer.alloc(N * bs);

  let i = 0; //current byteindex of array.
  for (let n = 0; n < features.length; n++) {
    if (features[n].geometry !== null) {
      //write in Little-Endian format, at offset

      //here goes Nproperties number of buf.write calls. (Nproperties is 31)
      //always write in Little-Endian.

      //deal with decimals by multiplying and store ints.

      i = write_int16(buf, features[n].properties["ÅtrstnL"], i, bs);
      i = write_int16(buf, features[n].properties["Hastght"], i, bs);
      i = write_int16(buf, features[n].properties["DoU2017"], i, bs);
      i = write_int16(buf, features[n].properties["ÅDT_tng"], i, bs);
      i = write_int16(buf, features[n].properties["ÅDT_mtr"], i, bs);
      i = write_int16(buf, features[n].properties["Vägnmmr"], i, bs);
      i = write_int16(buf, features[n].properties["Vägktgr"], i, bs);
      i = write_int16(buf, features[n].properties["Vägtyp"], i, bs);
      i = write_int16(buf, features[n].properties["Längd"], i, bs);
      i = write_int16(buf, features[n].properties["Blggnngst"], i, bs);
      i = write_int16(buf, features[n].properties["Län_nr"], i, bs);
      i = write_int16(buf, features[n].properties["Kmmn_nr"], i, bs);
      i = write_int16(buf, features[n].properties["Trfkkls"], i, bs);
      i = write_int16(buf, features[n].properties["IRI_ndr"], i, bs, 10);
      i = write_int16(buf, features[n].properties["Sprdjp_"], i, bs);
      i = write_int16(buf, features[n].properties["Region"], i, bs);
      i = write_int16(buf, features[n].properties["Ålder"], i, bs);
      i = write_int16(buf, features[n].properties["FrvntdL"], i, bs);
      i = write_int16(buf, features[n].properties["TllstnI"], i, bs);
      i = write_int16(buf, features[n].properties["IndxKls"], i, bs);
      i = write_int16(buf, features[n].properties["ÅDT_frd"], i, bs, 0.1); //lose 1 digit of precision to stay within int16 max value
      i = write_int16(buf, features[n].properties["Spårdjp"], i, bs, 100);
      i = write_int16(buf, features[n].properties["IRI"], i, bs, 100);
      i = write_int16(buf, features[n].properties["Vägbrdd"], i, bs, 100);
      i = write_int16(buf, features[n].properties["Brghtsk"], i, bs);

      //"1985/09/12" => [1985,09,12]
      let Blggnngsd = features[n].properties["Blggnngsd"];
      let [Byear, Bmonth, Bday] = [0, 0, 0];
      if (Blggnngsd) {
        [Byear, Bmonth, Bday] = Blggnngsd.split("/");
      }

      //"1985/09/12" => [1985,09,12]
      let Matdatm = features[n].properties["Mätdatm"];
      let [Myear, Mmonth, Mday] = [0, 0, 0];
      if (Matdatm) {
        [Myear, Mmonth, Mday] = Matdatm.split("/");
      }

      i = write_int16(buf, Byear, i, bs);
      i = write_int16(buf, Bmonth, i, bs);
      i = write_int16(buf, Bday, i, bs);
      i = write_int16(buf, Myear, i, bs);
      i = write_int16(buf, Mmonth, i, bs);
      i = write_int16(buf, Mday, i, bs);

      i = write_int16(buf, features[n].properties["IndK2030"], i, bs);

      console.log("done: ", n);
    }
  }

  let wstream = fs.createWriteStream("properties.int16array");
  wstream.write(buf);
  wstream.end();
}

writearray(collection.features);

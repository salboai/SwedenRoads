//https://stackoverflow.com/questions/20306750/what-is-a-compact-way-to-save-a-float32array-to-disk-on-node-js/23347027

//https://nodejs.org/api/buffer.html#buffer_buf_writeint16le_value_offset

var fs = require("fs");
const collection = require("./featurecollection.json");

function sum(v) {
  return v.reduce((a, b) => a + b, 0);
}

function safe(x) {
  //zero instead of null.
  let r = x === null ? 0 : x;
  r = isFinite(r) ? r : 0;
  return r;
}
function writearray(features) {
  Nproperties = 4; //This file is only for indexKls, indexKls2, Ikls_2 and Ikls_3

  let N = 0; //length of array
  for (let n = 0; n < features.length; n++) {
    if (features[n].geometry !== null) {
      N += Nproperties;
    }
  }
  let bs = 1; //size in bytes of a single number. 1 bytes per uint8 aka 8bit number
  let buf = new Buffer.alloc(N * bs);

  let i = 0; //current index of array. incr every time its written to.
  for (let n = 0; n < features.length; n++) {
    if (features[n].geometry !== null) {
      //write in Little-Endian format, at offset
      //here goes Nproperties number of buf.write calls.

      buf.writeUInt8(safe(features[n].properties["IndxKls"]), i * bs);
      i += 1;
      buf.writeUInt8(safe(features[n].properties["IndK2030"]), i * bs);
      i += 1;
      buf.writeUInt8(safe(features[n].properties["IKls_2"]), i * bs);
      i += 1;
      buf.writeUInt8(safe(features[n].properties["IKls_3"]), i * bs);
      i += 1;      

      console.log("done: ", n);
    }
  }

  let wstream = fs.createWriteStream("indexKls.uint8array");
  wstream.write(buf);
  wstream.end();
}
//https://storage.googleapis.com/swedenroads/indexKls2020.uint8array
writearray(collection.features);

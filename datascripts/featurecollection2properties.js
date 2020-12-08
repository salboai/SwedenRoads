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
  Nproperties = 31;

  let N = 0; //length of array
  for (let n = 0; n < features.length; n++) {
    if (features[n].geometry !== null) {
      N += Nproperties;
    }
  }
  //let bs = 2; //size in bytes of a single number. 2 bytes per int16 aka 16bit number
  let bs = 2;
  let buf = new Buffer.alloc(N * bs);

  let i = 0; //current index of array. incr every time its written to.
  for (let n = 0; n < features.length; n++) {
    if (features[n].geometry !== null) {
      //write in Little-Endian format, at offset

      //here goes Nproperties number of buf.write calls. (Nproperties is 31)
      //always write in Little-Endian.

      buf.writeInt16LE(safe(features[n].properties["ÅtrstnL"]), i * bs); //can be negative.
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["Hastght"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["DoU2017"]), i * bs);
      i += 1; 
      buf.writeInt16LE(safe(features[n].properties["ÅDT_tng"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["ÅDT_mtr"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["Vägnmmr"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["Vägktgr"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["Vägtyp"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["Längd"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["Blggnngst"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["Län_nr"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["Kmmn_nr"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["Trfkkls"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(Math.round(10*features[n].properties["IRI_ndr"])), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["Sprdjp_"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["Region"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["Ålder"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["FrvntdL"]), i * bs);
      i += 1;
      
      buf.writeInt16LE(safe(features[n].properties["TllstnI"]), i * bs);
      i += 1;
      buf.writeInt16LE(safe(features[n].properties["IndxKls"]), i * bs);
      i += 1;

      //this guy has some items (1139 to be exact) larger than int16 (and even larger than uint16).
      //max is 141420, int16 has max 32767. so divide by 10 to fit, losing one digit of precision this way.
      buf.writeInt16LE(safe(Math.round(features[n].properties["ÅDT_frd"] / 10)), i * bs);
      i += 1;

      //deal with some float properties (x100 and save as ints. divide later on website)
      buf.writeInt16LE(
        safe(Math.round(100 * features[n].properties["Spårdjp"])),
        i * bs
      );
      i += 1;
      buf.writeInt16LE(
        safe(Math.round(100 * features[n].properties["IRI"])),
        i * bs
      );
      i += 1;
      buf.writeInt16LE(
        safe(Math.round(100 * features[n].properties["Vägbrdd"])),
        i * bs
      );
      i += 1;

      //deal with some NaN properties
      //'1' => 1
      buf.writeInt16LE(
        safe(parseInt(features[n].properties["Brghtsk"])),
        i * bs
      );
      i += 1;

      //"1985/09/12" => [1985,09,12]
      let Blggnngsd = features[n].properties["Blggnngsd"];
      let [Byear, Bmonth, Bday] = [0, 0, 0];
      if (Blggnngsd) {
        [Byear, Bmonth, Bday] = Blggnngsd.split("/");
      }
      buf.writeInt16LE(safe(parseInt(Byear)), i * bs);
      i += 1;
      buf.writeInt16LE(safe(parseInt(Bmonth)), i * bs);
      i += 1;
      buf.writeInt16LE(safe(parseInt(Bday)), i * bs);
      i += 1;

      //"1985/09/12" => [1985,09,12]
      let Matdatm = features[n].properties["Mätdatm"];
      let [Myear, Mmonth, Mday] = [0, 0, 0];
      if (Matdatm) {
        [Myear, Mmonth, Mday] = Matdatm.split("/");
      }
      buf.writeInt16LE(safe(parseInt(Myear)), i * bs);
      i += 1;
      buf.writeInt16LE(safe(parseInt(Mmonth)), i * bs);
      i += 1;
      buf.writeInt16LE(safe(parseInt(Mday)), i * bs);
      i += 1;

      console.log("done: ", n);
    }
  }

  let wstream = fs.createWriteStream("properties.int16array");
  wstream.write(buf);
  wstream.end();
}

writearray(collection.features);

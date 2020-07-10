//https://stackoverflow.com/questions/20306750/what-is-a-compact-way-to-save-a-float32array-to-disk-on-node-js/23347027
var fs = require('fs');
const collection = require("./featurecollection.json")

function sum(v) {
  return v.reduce((a,b)=>a+b,0)
}

function safe(x) {
  //zero instead of null.
  let r = x === null ? 0 : x
  return r
}
function writef32array(features) {
  Nproperties = 3
  let N = 0 //length of array
  for (let n=0; n<features.length; n++) {
    if (features[n].geometry !== null) {
      N += Nproperties
    }
  }

  let buffer3 = new Buffer(N*4); //4 bytes per float aka 32bit per float

  let i=0 //current index of f32array. incr every time its written to.
  for (let n=0; n<features.length; n++) {
    if (features[n].geometry !== null) {
      //write in Little-Endian format, at offset i*4
      
      buffer3.writeFloatLE(safe(features[n].properties.QClass), i*4);
      i+=1

      buffer3.writeFloatLE(safe(features[n].properties.PredictedS), i*4);
      i+=1

      buffer3.writeFloatLE(safe(features[n].properties.RemainingS), i*4);
      i+=1
    }
  }
  
  let wstream = fs.createWriteStream("properties.f32array");
  wstream.write(buffer3);
  wstream.end();
}

writef32array(collection.features)
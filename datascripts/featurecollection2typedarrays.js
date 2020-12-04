var fs = require('fs');
const collection = require("./featurecollection.json")

function sum(v) {
  return v.reduce((a,b)=>a+b,0)
}

function writef32array(features) {
  let lengths =[]
  let N = 0
  for (let n=0; n<features.length; n++) {
    if (features[n].geometry !== null) {
      let len = features[n].geometry.coordinates.length
      N += len*2 //two numbers (long,lat) per coordinate
      lengths.push(len)
    } else {
      console.log("feature ", n,"has geometry null")
    }
  }

  
  let buffer = new Buffer.alloc(N*4); //4 bytes per float aka 32bit per float
  let buffer2 = new Buffer.alloc(lengths.length*2); //2 byte per uint16

  let i=0 //current index of f32array. incr every time its written to.
  let k=0 //current index of uint16array. incr every time its written to.
  for (let n=0; n<features.length; n++) {
    if (features[n].geometry !== null) {
      for (let j=0; j<features[n].geometry.coordinates.length; j++) {
        //write in Little-Endian format, at offset i*4
        for (let d=0; d<2; d++) { //long and lat
          buffer.writeFloatLE(features[n].geometry.coordinates[j][d], i*4);
          i+=1  
        }
      }
      buffer2.writeUInt16LE(lengths[k], k*2)
      k+=1
    } else {
      console.log("features[n].geometry for n: ",n," was null")
    }
  }
  
  let wstream = fs.createWriteStream("features.f32array");
  wstream.write(buffer);
  wstream.end();

  //let wstream2 = fs.createWriteStream("lengths.uint8array");
  let wstream2 = fs.createWriteStream("lengths.uint16array");
  wstream2.write(buffer2);
  wstream2.end();
}

writef32array(collection.features)
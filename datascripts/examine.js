//https://stackoverflow.com/questions/20306750/what-is-a-compact-way-to-save-a-float32array-to-disk-on-node-js/23347027
var fs = require('fs');
const collection = require("./featurecollection.json")

const numberproperties = [
"LSTRKAID",
"RELSTART",
"RELSLUT",
"Shape_Leng",
"Traffic_cl",
"Length",
"SP_MEAN",
"IR_MEAN",
"SpeedLimit",
"AADT",
"AADT_heavy",
"Width",
"Age",
"IRI_maint",
"SP_maint",
"PredictedS",
"RemainingS",
"QClass",
]

function sum(v) {
  return v.reduce((a,b)=>a+b,0)
}

function arrayMin(arr) {
  return arr.reduce(function (p, v) {
    return ( p < v ? p : v );
  });
}

function arrayMax(arr) {
  return arr.reduce(function (p, v) {
    return ( p > v ? p : v );
  });
}

function examine(features) {
  let vRemainingS = []
  let vPredictedS = []
  let vQClass = []
  for (let n=0; n<features.length; n++) {
    if (features[n].geometry !== null) {
      let r = features[n].properties.RemainingS
      let p = features[n].properties.PredictedS
      let q = features[n].properties.QClass
      if (r !== null && p !== null) {
        vRemainingS.push(features[n].properties.RemainingS)
        vPredictedS.push(features[n].properties.PredictedS)
        vQClass.push(features[n].properties.QClass)
      }
      
    }
  }

  console.log("min vQClass: ",arrayMin(vQClass))
  console.log("max vQClass: ",arrayMax(vQClass))

  console.log("min vRemainingS: ",arrayMin(vRemainingS))
  console.log("max vRemainingS: ",arrayMax(vRemainingS))
  //min vRemainingS: -91
  //max vRemainingS: 34

  console.log("min vPredictedS: ",arrayMin(vPredictedS))
  console.log("max vPredictedS: ",arrayMax(vPredictedS))
  //min vPredictedS: 3
  //max vPredictedS: 37
}

examine(collection.features)
/*
const template = {
OBJECTID: 101,
LSTRKAID: 117,
OID_: '1000:33726',
RELSTART: 0.2359744094,
RELSLUT: 0.2395289862,
Shape_Leng: 43.6087444164,
X: 330529.588535,
Y: 6381575.06599,
X2: 330572.658,
Y2: 6381580.592,
Traffic_cl: 5,
Length: 44,
SP_MEAN: 3.2318181761,
IR_MEAN: 1.1959090905,
PavementTy: 'Asphalt concrete',
SpeedLimit: 60,
StoneSize: 'medium',
ClimateZon: 'South',
Roadtype: 'Ordinary road',
RoadCatego: 'Secondary',
Region: 'Vast',
AADT: 3150,
AADT_heavy: 204,
Width: 62,
Age: 1,
IRI_maint: 4.9,
SP_maint: 18,
PredictedS: 22,
RemainingS: 21,
QClass: 5
}



*/
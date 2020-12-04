//https://stackoverflow.com/questions/20306750/what-is-a-compact-way-to-save-a-float32array-to-disk-on-node-js/23347027
const fs = require('fs');
const collection = require("./featurecollection.json")

//console.log(collection.features[0].properties)
/*
n=172158
console.log(collection.features[n-1].properties)
console.log(collection.features[n].properties)
console.log(collection.features[n+1].properties)
*/
//ID: 2, //this will go big, ignore?

//make data fit as Int16Array 
/*
'Blggnngsd': '1985/09/12', //[Byear,Bmonth,Bday] = Blggnngsd.split("/")
'Mätdatm': '2019/05/03', //[Mear,Mmonth,Mday] = Blggnngsd.split("/")

'Brghtsk': '1', //parseInt(Brghtsk)
'Spårdjp': 2.8, //Math.round(Spårdjp*100)
'IRI': 2.95, //Math.round(IRI*100)
'Vägbrdd': 5.6, ////Math.round(Vägbrdd*100)
'Hastght': 70,
'DoU2017': 6,
'ÅDT_frd': 868,
'ÅDT_tng': 42,
'ÅDT_mtr': 2015,
'Vägnmmr': 521,
'Vägktgr': 4,
'Vägtyp': 4,
'Längd': 699,
'Blggnngst': 2,
'Län_nr': 12,
'Kmmn_nr': 1233,
'Trfkkls': 3,
'IRI_ndr': 5.8,
'Sprdjp_': 24,
'Region': 5,
'Ålder': 35,
'FrvntdL': 26,
'ÅtrstnL': -9, 
'TllstnI': 11,
'IndxKls': 1
*/

function examineprop(features) {
	let min = features[0].properties["ÅDT_frd"]
	let max = features[0].properties["ÅDT_frd"]
	k = 0
	for (let n = 0; n < features.length; n++) {
    	if (features[n].geometry !== null) {
    		let v = features[n].properties["ÅDT_frd"]
    		//if (v>65535) { //uint16 max value
    		if (v>32767) { //int16 max value
    			console.log("value: ",v, " at n: ",n)
    			k+=1;
    		}
    		min = Math.min(min, v)
    		max = Math.max(max, v)
		}
	}
	console.log("min: ",min)
	console.log("max: ",max)
	console.log(k," items exceed int16 size") //1139  items exceed int16 size
}





examineprop(collection.features)
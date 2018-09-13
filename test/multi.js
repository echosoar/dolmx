const Dolmx = require('../build/dolmx');
const Fs = require('fs');
let data = Fs.readFileSync(__dirname + '/multi.xml').toString();

let xml = Dolmx(data);
console.log(JSON.stringify(xml, null, '\t'));
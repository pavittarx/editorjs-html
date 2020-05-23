const edjsHTML =  require('./../build/edjsHTML');
const data = require('./data.json');

const edjsParser = edjsHTML();

console.log(edjsParser.parse(data));
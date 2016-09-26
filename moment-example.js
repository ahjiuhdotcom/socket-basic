var moment = require("moment");
var now = moment();

console.log(now.format());
console.log(now.format("X"));
console.log(now.format("x"));
console.log(now.valueOf("x"));

var timestamp = now.valueOf("x");
var timestampMoment = moment.utc(timestamp).local();

console.log(timestampMoment.format());

console.log(now.format("MMM Do YYYY, h:mma"));
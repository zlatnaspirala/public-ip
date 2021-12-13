
var myMicroService = require("./index.js");

console.log("TEST MS PUBLIC IP => ", myMicroService)

myMicroService.publicIP.start();

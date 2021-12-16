
/**
 * @description
 * Node.js terminal application
 * MicroService get my public ip
 */

var fs = require("fs");

let config = {
  protocol: "http",
  port: 8080
};

let options = {};

// console.log("[NODE] => ", process.argv[0]);
// console.log("[appName] => ", process.argv[1]);

if (typeof process.argv[2] != undefined &&
     (process.argv[2] == "http" || process.argv[2] == "https" || process.argv[2] == "http2")) {
  config.protocol = process.argv[2];
  console.warn("Use protocol: ", config.protocol);
} else {
  console.warn("Use default protocol http.");
}

if (typeof process.argv[3] != undefined) {
  config.port = process.argv[3];
  console.warn("Use port: ", config.port);
} else {
  console.warn("Use default port: ", config.port);
}

if (typeof process.argv[4] == undefined) {
  options = {
    key: fs.readFileSync("self-cert/privatekey.pem"),
    cert: fs.readFileSync("self-cert/certificate.pem")
  };
} else {
  options = {
    key: fs.readFileSync(process.argv[4]),
    cert: fs.readFileSync(process.argv[5])
  };
}

function start() {

  var express = require("express");
  var app = express();
  var https = require('https');
  var http = require('http');
  // var bodyParser = require('body-parser');

  app.use(express.json({limit: '2kb'}));
  app.use(express.urlencoded({limit: '2kb'}));
  // app.use(bodyParser.json({limit: '256b'}));
  // app.use(bodyParser.urlencoded({limit: '256b', extended: true}));

  /**
   * @description Allow or disallow headers flags.
   * Add headers
   */
  app.use(function (req, res, next) {
    // console.log("HOSTING MICRO SERVICE SERVER ->")
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);
    // Pass to next layer of middleware
    next();
  });

  app.use(function (req, res) {
    // console.log(req.connection.remoteAddress);
    var ipaddress = req.socket.remoteAddress.replace("::ffff:", "");
    res.status(200).json({
      message: "Microservice publicIP - MIT Licence https://github.com/zlatnaspirala/public-ip 2021",
      ipaddress: ipaddress,
    });
  });

  /**
   * @description
   * Define main server object.
   */
  var serverRunner = null;

  if (config.protocol == 'http') {
    serverRunner = http;
  } else if (config.protocol == 'https') {
    serverRunner = https;
  } else if (config.protocol == 'http2') {
    serverRunner = spdy;
  }

  serverRunner.createServer(options, app).listen(config.port, error => {
    if (error) {
      console.warn("Something wrong with micro service public-ip server.")
      console.error(error);
      return process.exit(1);
    } else {
      console.log("micro service public-ip server started at " + config.port + " port.");
    }
  });

}

module.exports = {
  start
};

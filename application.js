var mbaas = require('fh-mbaas-express');
var express = require('express');
var cors = require('cors');
//var mainjs = require('main.js');

// Securable endpoints: list the endpoints which you want to make securable here
var securableEndpoints = [];

var app = express();

// Enable CORS for all requests
app.use(cors());

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaas.sys(securableEndpoints));
app.use('/mbaas', mbaas.mbaas);
//app.use('/cloud', mbaas.cloud(mainjs));

// Note: important that this is added just before your own Routes
app.use(mbaas.fhmiddleware());

// You can define custom URL handlers here, like this one:
app.use('/fhdb', require('./lib/fhdb.js')());

app.use('/', function(req, res) {
  res.end('Your Cloud App is Running.');
});

// Important that this is last!
app.use(mbaas.errorHandler());

var port = process.env.FH_PORT || process.env.VCAP_APP_PORT || 8001;
var server = app.listen(port, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
});
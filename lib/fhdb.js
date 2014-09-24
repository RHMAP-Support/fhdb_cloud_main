var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fh = require('fh-mbaas-api');

// Detail of this request module can be found at https://github.com/mikeal/request
var request = require('request');

function fhdbRoute() {
  var fhdb = new express.Router();
  fhdb.use(cors());
  fhdb.use(bodyParser());

  // GET REST endpoint - query params may or may not be populated
  fhdb.get('/', function(req, res) {
    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'fhdb root here'});
  });

  fhdb.get('/bd', function(req, res) {
    res.json({msg: 'bd here'});
  });

  fhdb.get('/fhdbList', function(req, res) {
    console.log("In dbList()");
    fh.db({
      "act": "list",
      "type": "fhdbExample"
    }, function(err, data) {
      if (err) {
        timelog("Error " + err);
      } else {
        console.log(JSON.stringify(data));
        res.json({msg: data});
      }
    })
  });

  fhdb.get('/fhdbAdd', function(req, res) {
    timelog(req);
    fh.db({
        "act" : "create",
        "type" : "fhdbExample",
        "fields" : {
          "firstName" : req.firstname,
          "lastName" : req.lastname,
          "country" : req.country,
         "phone" : req.phone
        }
    }, function(err, data) {
      if (err) {
        timelog("Error " + err);
        res.json({msg: err});
      } else {
        timelog("Response is " + data);
        res.json({msg: data});
      }
    })
  });

  fhdb.get('/deleteall', function(req, res) {
    timelog("In deleteall");
    fh.db({
      "act": "deleteall",
      "type": "fhdbExample"
    }, function(err, data) {
      if (err) {
        timelog("Error " + err);
        res.json({msg: err});
      } else {
        timelog("Response is " + data);
        res.json({msg: data});
      }
    })
  });

  fhdb.get('/listLastName', function(req, res) {
    timelog("In dbListLastName()");
    fh.db({
      "act": "list",
      "type": "fhdbExample",
      "eq": {
        "lastName": req.lastname
      }
    }, function(err, data) {
      if (err) {
        timelog("Error " + err);
        res.json({msg: err});
      } else {
        timelog("Response is " + data);
        res.json({msg: data});
      }
    })
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  fhdb.post('/', function(req, res) {
    res.json({msg: 'Specify an endpoint please.'});
  });

  return fhdb;
}

timelog = function(message) {
	console.log(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' UTC -- ' + message);
}

module.exports = fhdbRoute;
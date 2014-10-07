// Express web application framework
var express = require('express');

// Parsing middleware, see https://github.com/expressjs/body-parser.
var bodyParser = require('body-parser');

// Allow cross-origin resource sharing, see https://www.npmjs.org/package/cors
var cors = require('cors');

// FeedHenry API.
var fh = require('fh-mbaas-api');

// Detail of this request module can be found at https://github.com/mikeal/request
var request = require('request');

// Node utilities.
var util = require('util');

function fhdbRoute() {
  var fhdb = new express.Router();
  fhdb.use(cors());
  fhdb.use(bodyParser());

  // GET REST endpoint - query params may or may not be populated
  fhdb.get('/', function(req, res) {
    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'fhdb root here'});
  });

  fhdb.get('/fhdbList', function(req, res) {
    timelog("In dbList()");
    fh.db({
      "act": "list",
      "type": "fhdbExample"
    }, function(err, data) {
      if (err) {
        // Error.
        timelog("Error " + err);
      } else {
        // Success.
        console.log(JSON.stringify(data));
        res.json({msg: data});
      }
    })
  });

  fhdb.post('/fhdbAdd', function(req, res) {
    timelog('adding');
    timelog(util.inspect(req.body));

    fh.db({
        "act" : "create",
        "type" : "fhdbExample",
        "fields" : {
//          "firstname" : req.body.form.firstname,
//          "lastname" : req.body.form.lastname,
//          "country" : req.body.form.country,
//         "phone" : req.body.form.phone
          "firstname" : req.body.firstname,
          "lastname" : req.body.lastname,
          "country" : req.body.country,
         "phone" : req.body.phone
        }
    }, function(err, data) {
      if (err) {
        // Error.
        timelog("Error " + err);
        res.json({msg: err});
      } else {
        // Success.
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
        // Error.
        timelog("Error " + err);
        res.json({msg: err});
      } else {
        // Success.
        timelog("Response is " + data);
        res.json({msg: data});
      }
    })
  });

  fhdb.post('/fhdbListLastName', function(req, res) {
    timelog("In dbListLastName()");
    timelog(util.inspect(req.body));
    fh.db({
      "act": "list",
      "type": "fhdbExample",
      "eq": {
        "lastname": req.body.lastname
      }
    }, function(err, data) {
      if (err) {
        // Error.
        timelog("Error " + err);
        res.json({msg: err});
      } else {
        // Success.
        timelog("Response is " + data);
        res.json({msg: data});
      }
    })
  });

  return fhdb;
}

timelog = function(message) {
  // Adds timestamp top console output.
	console.log(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' UTC -- ' + message);
}

module.exports = fhdbRoute;
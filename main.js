exports.fhdbInit = function(params, callback) {
  console.log("In dbInit()");
  $fh.db({
      "act" : "create",
      "type" : "fhdbExample",
      "fields" : {
        "firstName" : "Jim",
        "lastName" : "Feedhenry",
        "country" : "Henryland",
       "phone" : "555-123456"
      }
}, function(err, data) {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log(JSON.stringify(data));
    callback(undefined, data);
  }
})};

exports.fhdbAdd = function(params, callback) {
  console.log("In fhdbAdd()");
  $fh.db({
      "act" : "create",
      "type" : "fhdbExample",
      "fields" : {
        "firstName" : params.firstname,
        "lastName" : params.lastname,
        "country" : params.country,
       "phone" : params.phone
      }
}, function(err, data) {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log(JSON.stringify(data));
    callback(undefined, data);
  }
})};

exports.fhdbList = function(params, callback) {
console.log("In dbList()");
$fh.db({
  "act": "list",
  "type": "fhdbExample"
}, function(err, data) {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log(JSON.stringify(data));
    callback(undefined, data);
  }
})};

exports.fhdbListLastName = function(params, callback) {
console.log("In dbListLastName()");
$fh.db({
  "act": "list",
  "type": "fhdbExample",
  "eq": {
    "lastName": params.lastname
  }
}, function(err, data) {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log(JSON.stringify(data));
    callback(undefined, data);
  }
})};

exports.fhdbDeleteall = function(params, callback) {
console.log("In Deleteall");
$fh.db({
  "act": "deleteall",
  "type": "fhdbExample"
}, function(err, data) {
    console.log(JSON.stringify(data));
    callback(undefined, data);  
})};


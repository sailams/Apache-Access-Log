// Import Log model
Log = require('./logModel');

// Handle index actions
exports.index = function (req, res) {
    Log.get(function (err, logs) {
       if (err) {
           res.json({
               status: "error",
               message: err,
           });
       }
       res.json({
           status: "success",
           message: "Logs retrieved successfully",
           data: logs
       });
    });
};


// Handle create Log actions
exports.new = function (req, res) {
    var newlog = new Log();
    newlog.clientip = req.body.clientip;
    newlog.status_code = req.body.status_code;
    newlog.request_uri = req.body.request_uri;
    newlog.method = req.body.method;
    newlog.bytes_received = req.body.bytes_received;
    newlog.first_path = req.body.first_path;
    newlog.last_path = req.body.last_path;
    newlog.creation_time = req.body.datetime;

    // save the Log and check for errors
    newlog.save(function (err) {
       if (err)
           res.json(err);
       res.json({
           message: 'New Log created!',
           data: Log
       });
    });
};

exports.host_req_count = function (req,res) {
    Log.aggregate(
    [
      {
        $group: {
          _id: "$clientip",
          countOfReq: { $sum: 1}
        }},
      { $sort: {'countOfReq': -1}},
      { $limit: 10}
    ],
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
};


exports.status_code_count = function (req,res) {
    Log.aggregate(
    [
      {
        $group: {
          _id: "$status_code",
          countOfStatCode: { $sum: 1}
        }},
      { $sort: {'countOfStatCode': -1}}
    ],
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
};

exports.first_last_path = function (req,res) {
    Log.aggregate(
    [
      {
        $group: {
          _id: "$request_uri",
          first: {$first:"$first_path"},
          last: {$first:"$last_path"},
          countOfReqUri: { $sum: 1}
        }},
      { $sort: {'countOfReqUri': -1}},
      { $limit: 10}
    ],
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
};

exports.highest_req_hour = function (req,res) {
    Log.aggregate(
    [
      { "$project": {
      y:{"$year":"$creation_time"},
      m:{"$month":"$creation_time"},
      d:{"$dayOfMonth":"$creation_time"},
      h:{"$hour":"$creation_time"}
	  }
      },
      { $group:{
       _id: { year:"$y",month:"$m",day:"$d",hour:"$h",clientip:"$clientip"},
       Highest_Request_hour:{ $sum: 1}
      }},
      { $sort: {'Highest_Request_hour': -1}},
      { $limit : 1}
    ],
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
     }
    }
  );
};

exports.highest_bytes_received_hour = function (req,res) {
    Log.aggregate(
    [
      { "$project": {
      y:{"$year":"$creation_time"},
      m:{"$month":"$creation_time"},
      d:{"$dayOfMonth":"$creation_time"},
      h:{"$hour":"$creation_time"},
      bytes_received:1 }
      },
      { $group:{
       _id: { year:"$y",month:"$m",day:"$d",hour:"$h"},
       highest_bytes_received:{ $sum: "$bytes_received"}
      }},
      { $sort: {'highest_bytes_received': -1}},
      { $limit : 1}
    ],
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
       res.json(result);
      }
    }
  );
};

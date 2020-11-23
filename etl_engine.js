const http = require('http');
const axios = require('axios');

var server = http.createServer(function(request, response) {
if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
            data = '';
        });
        request.on('end', function () {
            try {
              var lines = body.split("\n"), line = null;
                  body = '';
              var client_ip="", method_type = "", request_uri = "";
              var response_code, num_of_bytes;
              var linedata = {}

              lines.forEach(line => {
              tmp = line.split(" ");
              console.log("Temp line log", tmp);
              if (tmp != "")
              {
                 linedata['clientip'] = tmp[0];
                 linedata['datetime'] = converttimestamp(tmp[3]);
                 linedata['method'] = tmp[5];
                 linedata['request_uri'] = tmp[6];
                 linedata['status_code'] = tmp[8];
                 linedata['bytes_received'] = tmp[9];
                 var url = linedata['request_uri'].split("/");
                 linedata['first_path'] = url[1];
                 if ((url.length - 1) != 0)
                      linedata['last_path'] = url[url.length - 1];
                 else
                      linedata['last_path'] = " ";
                 const newdata = JSON.stringify(linedata);
                 axios
                 .post('http://localhost:8010/api/logs', newdata, {
                  headers: {
                  'Content-Type': 'application/json'
                 }
                 })
                 .then(res => {
                    console.log("statusCode:", res.statusCode)
                 })
                .catch(error => {
                    console.error(error)
                 })
              }
              });
              response.writehead(200,{"Content-Type": "text/plain"});
              response.write("Processed POST request");
              response.end()
              return;
            }catch (err){
              response.writeHead(500, {"Content-Type": "text/plain"});
              response.write("Bad Post Data.  Is your data a proper JSON?\n");
              response.end()
              return;
            }
        });
    }
});
server.listen(3000);
console.log("server started")

function converttimestamp(d)
{

  var datestr = d.split("[");
  var months = {Jan: "01",Feb: "02",Mar: "03",Apr: "04",May: "05",Jun: "06",Jul: "07",Aug: "08",Sep: "09",Oct: "10",Nov: "11",Dec: "12"};

  var newdatestr = datestr[1].split("/");
  var newhrstr = newdatestr[2].split(":");

  return months[newdatestr[1]] + "-" + newdatestr[0] + "-" + newhrstr[0] + " " + newhrstr[1] + ":" + newhrstr[2] + ":" + newhrstr[3]

}

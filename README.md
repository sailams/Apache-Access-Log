# Apache Log parser

Utility to pull the logs from apache access file to MongoDB for further analysis. Below are the list of metrics retrieved from MongoDB using Application server(Express) as part of this project.

  - (host, request-count) tuples for the top-10 frequent hosts
  - (HTTP-status-code, count) tuples, sorted by count
  - the hour with the highest request count, along with the count
  - the hour with the highest total number of bytes served, along with the total
  - the first & last path name components of top-10 most frequently accessed resources

# Pre-requisites
  - Apache server 

### Installation Procedures

Apache access log analyser uses a number of open source tools to work properly:

* [Python] - Process to ship the Apache access logs from Target host!
* [NodeJS] - HTTP Server to parse, transform and load relevant fields to MongoDB
* * [MongoDB] - Database to store relevant Apache access log field information
* [Express] - fast app framework to access Apache access log information via REST APIs

You will also need below 3rd party libraries:
  - Axios
  - body-parser
  - Mongoose


### Installation instructions for Dev Environment (Virtual BOX running Ubuntu 20.04)

Apache Log Access analyser requires Python, Node.js, Express and MongoDB to function properly.

To start with, please follow below instructions for installation of Node.JS
$ sudo apt install nodejs

Once installed, verify the node version using below command
$ node -v

Similarly follow installation of Python3 and Express as given below
$ sudo apt install python3.8
$ npm install express (--no-save or --save)

Once installed, verify the python version using below command
$ python3 ––version

For installtion of MongoDB, please follow the below steps 
$ sudo apt install mongodb

MongoDB is installed on your system now and it starts automatically after installation. To check the status of this database, type the following command in the terminal window
$ sudo systemctl status mongodb

### Setup
Once all necessary packages are installed, pull the code from Git repository to local machine.

To start the node.js Server use below command
$ node etl_engine.js (add & in the end to run the process in backend)

To ensure that the node.js server process is up and listening on port 3000, type in the below command in terminal
$lsof -i :3000

To start the log shipper agent, use the below command
$python3 log_shipper.py &

To start the application server (express), issue the below command in the terminal
$node home.js (add & in the end to run the process in backend)

### URL Endpoints for retrieving the Metrics

1) http://localhost:8010/api/logs/request_count --> Retrieves Client IP and Request count from MongoDB
2) http://localhost:8010/api/logs/status_count  --> Retrieves Status code and associated count from MongoDB
3) http://localhost:8010/api/logs/pathresources --> Retrieves first and last path of the Request URI from MongoDB
4) http://localhost:8010/api/logs/highestreqhour --> Retrieves the highest request count hour and the count
5) http://localhost:8010/api/logs/highestbyteshour --> Retrieves the highest bytes received hour and the total

### Todos

 - Develop ETL engine (Node.JS) to process logs efficiently at near real time
 - Security features for HTTP endpoints including APIs for fetching MongoDB information
 - MORE Testing

### OPEN ISSUE
Seen an issue with ETL engine sending HTTP Post to MongoDB i.e ETL engine processing old data in subsequent HTTP Post request to MongoDB hence it delays ingestion to MongoDB. Needs further investigation. 


**Free Software!**

   [git-repo-url]: <https://github.com/sailams/Apache-Access-Log>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>

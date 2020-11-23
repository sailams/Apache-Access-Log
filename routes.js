// Import express router
let Router = require('express').Router();

// Set default API response
Router.get('/', function (req, res){
    res.json({
        status: 'WORKING',
        message: 'This is the /api/ route!'
    });
});

// Import Log controller
var logController = require('./logController');

// Log routes
Router.route('/logs')
    .get(logController.index)
    .post(logController.new);
Router.route('/logs/request_count')
    .get(logController.host_req_count);
Router.route('/logs/status_count')
    .get(logController.status_code_count);
Router.route('/logs/request_uri_count')
    .get(logController.request_uri_count);
Router.route('/logs/destroy')
    .get(logController.destroy);
Router.route('/logs/pathresources')
    .get(logController.first_last_path);
Router.route('/logs/highestreqhour')
    .get(logController.highest_req_hour);
Router.route('/logs/highestbyteshour')
    .get(logController.highest_bytes_received_hour);

// Export API routes
module.exports = Router;

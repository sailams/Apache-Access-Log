var mongoose = require('mongoose');

// Setup schema
var newlogSchema = mongoose.Schema({
    clientip: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    status_code: Number,
    request_uri: String,
    bytes_received: Number,
    first_path: String,
    last_path: String,
    creation_time: Date
});
// Export Log model
var Log = module.exports = mongoose.model('newlog', newlogSchema);
module.exports.get = function (callback, limit) {
    Log.find(callback).limit(limit);
}

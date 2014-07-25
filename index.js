var osmtogeojson = require('osmtogeojson'),
    request = require('request');

module.exports = function(query, cb) {
    request.post('http://overpass-api.de/api/interpreter', function (error, response, body) {
        var geojson;

        if (!error && response.statusCode === 200) {
            geojson = osmtogeojson(JSON.parse(body));
            cb(undefined, geojson);
        } else if (error) {
            cb(error);
        } else if (response) {
            cb({
                message: 'Request failed: HTTP ' + response.statusCode,
                statusCode: response.statusCode
            });
        } else {
            cb({
                message: 'Unknown error.',
            });
        }
    }).form({
        data: query
    });
};
var unirest = require('unirest');
var express = require('express');
var events = require('events');
var placeIdArray = require('./place-id-array').placeIdArray;

var getFromApi = function(placeId) {
	var emitter = new events.EventEmitter();
    unirest.get('https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyCtV0ahkNkZ3Cy6toDuTxYFMWJ_deh0TqQ&placeid=' + placeId)
           .end(function(response) {
                if (response.ok) {
                    emitter.emit('end', response.body);
                }
                else {
                    console.log(error);
                    emitter.emit('error', response.code);
                }
            });
    return emitter;
};

var app = express();
app.use(express.static('public'));

app.get('/places', function(req, res) {
    var results = [];
    var completed = 0;
    placeIdArray.forEach(function(placeId) {
        var searchReq = getFromApi(placeId);
        searchReq.on('end', function(data) {
            console.log(data);
            var resultObj = {};
            resultObj.name = data.result.name;
            resultObj.placeId = data.result.place_id;
            resultObj.address = data.result.formatted_address;
            resultObj.state = "South Dakota";
            resultObj.phone = data.result.formatted_phone_number;
            resultObj.website = data.result.website;
            results.push(resultObj);
            completed++;
            if (completed === placeIdArray.length) {
                console.log('completed');
                res.json(results);
            }
        });
        searchReq.on('error', function(code) {
            console.log('Error code: ', code, placeId);
        });
    });
});

app.listen(8080);
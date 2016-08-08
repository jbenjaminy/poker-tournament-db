var unirest = require('unirest');
var express = require('express');
var events = require('events');
var placeIdArray = ['ChIJ7bRHg_gmjIgRS-ky29EhrjA', 'ChIJRQ5dKFi2woARBYMGje10qsw'];

var getFromApi = function(placeId) {
	var emitter = new events.EventEmitter();
    unirest.get('https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyDm71dLA-nxg3KI4eSUYrAh8V5lp_gOoZI&placeid=' + placeId)
           .end(function(response) {
                if (response.ok) {
                    emitter.emit('end', response.body);
                }
                else {
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
            var resultObj = {};
            resultObj.name = data.result.name;
            resultObj.placeId = data.result.place_id;
            resultObj.address = data.result.formatted_address;
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
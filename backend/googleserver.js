var unirest = require('unirest');
var express = require('express');
var events = require('events');
var placeIdArray = ['ChIJ7bRHg_gmjIgRS-ky29EhrjA', 'ChIJlwnkYvkujIgR9cbtzIJWZgI', 'ChIJa3v5_JmhKYcRDVaid_ywq3E', 'ChIJQcP5r76D0YAR0HKIuY75akw', 'ChIJix501bYoLYcR0dg4N0DmhWY', 'ChIJVaAtBW541oYRO6Sc0kGuH-U', 'ChIJAUiEiPZ41oYRwAf7kOSmx44', 'ChIJ6zTkSwsALYcRZyNGV6Cjjeg', 'ChIJ2QZbdG9Z1oAR3i6nTqjSpLQ', 'ChIJI-KD5qJ71oYRb8mVT7PheDY', 'ChIJdYYLxrdBK4cR4XeW4H-lYgQ', 'ChIJqdKCj86bK4cRRIVXu1Wnfg0', 'ChIJE-0UhfIDK4cRntOa1yWf4Eo', 'ChIJbeYcJ5EZK4cRCB2VsdyJrKk', 'ChIJOQjYP1EBK4cRVM3WDmcx1Ik'];

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
var unirest = require('unirest');
var express = require('express');
var events = require('events');
// var placeIdArray = require('./place-id-array').placeIdArray;
var placeIdArray = ['ChIJrQwEolE-1YcRnjsJ_6FAWD4', 'ChIJGersBcw_1YcRgSUJiyD_B5s', 'ChIJrTulNPfGg4gRzeQnusNGqZc', 'ChIJeYTsICwJnIgR0RhKLRNHLVk', 'ChIJ9_PUGiHgKIYRi4CI6mbwiXs', 'ChIJw92slOYOnIgRdjOPfc7tbgg', 'ChIJ35d8ZUDyK4YRgaeCjkzmlO4', 'ChIJJ59qNSdA1YcR9g7q_x_v48o', 'ChIJp9ZrqtMOnIgRAJVC-sBC9XI', 'ChIJkwCueYQtnIgRJnMxPPdt21E', 'ChIJuSdwJP881YcR00YkIZOatyQ', 'ChIJQcQfuM4_1YcRVp6QNqAunu4', 'ChIJQwZhFZIOnIgR0cuu97E-hJk', 'ChIJI2h5eF09nIgRX2DbYBxy1bY', 'ChIJ7ZaMCDfVKoYRQwpfGRQtQ8A', 'ChIJBWlBz-X2JYYRCitfaVWab4Y', 'ChIJG0rnMCXeKIYRqdMqsu6uXbU', 'ChIJQYYt0uL2JYYR5gQVlULYtOU', 'ChIJj5Yz6jvEyIAR2K5IP3Gtna0', 'ChIJszlD8C0JnIgRZJRQeCnojCo', 'ChIJXYFYCaV8SFMRs7quIev2M8c', 'ChIJ6QCS4v081YcRXwczqLGEUZs', 'ChIJ-eFX4y7eKIYRj0f3Xg7219U', 'ChIJw2N9lqo91YcRCzFIQbSv848', 'ChIJO2mQmprUnYgRKpWl2wVT8L8', 'ChIJt0-ZRWjINoYRXX3sKoQkaWk', 'ChIJFadyx84RnIgRBf7HiXFi3Q0', 'ChIJv5R7NKLyK4YRo-vFH3G6aIg', 'ChIJQ_Kh1M4_1YcRiOUg6r-4sTM', 'ChIJP84-Q1cu34cRRoCJN1XQgOM', 'ChIJYXLvR_77wIcRc4YobtYpQjM', 'ChIJAQCaWL_2wIcRlLVefHi-URE', 'ChIJqbdTahn6wIcRKrVVOrX4Zbc', 'ChIJU3n4cGYu34cRdJDRRsqlEe4', 'ChIJhTZn15uHd4gRpG3RGJFeaAE', 'ChIJuwlN_I-Hd4gROjvUYkg61GE', 'ChIJp5JYjp3wwIcRJib8zkVYPig', 'ChIJa2MgeL0_w4cRhyMYOoYgm5I', 'ChIJASjXdDvBeIgRWJ_6ViuX-QM', 'ChIJqWmFUWpe54cRAINw6ObHUPc', 'ChIJm6xZG96y2IcR-kYOdQV_oZM', 'ChIJ50iGVFS22IcRpKhCwZwx7Sg', 'ChIJkdgEs0MbwIcR5YEG7nulyLo', 'ChIJN-nO81rpyIARHjXlXCKPuIk', 'ChIJP75bbtm_yIARo-Lc7yD39xQ', 'ChIJhWQVHS7EyIARbwWzRC-I8y4', 'ChIJrS6jN9_ayIARxNq8BUY3NTk', 'ChIJHUEpLGzByIAR4vhqjsm-xyI', 'ChIJ3Sp9O3lAmYARH3M4AoqFxvo', 'ChIJQxNEw5c4zoARf37Pt4Xcj2g', 'ChIJaWcwyXfEyIARTe69U71N5YA', 'ChIJ82svbEc_mYARbo9psxsjoAE', 'ChIJJ9M69znEyIAR4JClP57b-W0', 'ChIJWff7PBLQyIARa34nGm0alRc', 'ChIJDzOsX6DHqYARrIAcK5bp8zI', 'ChIJvUdRyzDEyIARhA3R2cXH8oI', 'ChIJu_M8nAZEz4AREQ9fzUCB9S8', 'ChIJm0UnxgrDyIARQXp13D2WiyE', 'ChIJIXr8JcyhmYARq_prG0TiENw', 'ChIJ96vwRbBHmYARQBziT7xFPS4', 'ChIJTf3Bsd2GmIARUYJOwALdELg', 'ChIJI2uhUzNbmYARerDtmrKj-q0', 'ChIJ3dP4KTDbyIARQ0878gAiDaI', 'ChIJw6d_TjA_mYARf6lnVUsU3Ms', 'ChIJDxfnP6IKmYARKepLT7gy5j0', 'ChIJHelpRGmwqYARgLx8CxL2kzU', 'ChIJleDKRDzEyIAR9z-vovLIyXc', 'ChIJv_WQA6HDyIAR_wdTCqIWDZg', 'ChIJ0w46t-l6mYAR15jrsncVtDo', 'ChIJxYriRSDoyIARQUoiMxvfoDw', 'ChIJjQBPaKIKmYARfrbjwXIBPKg', 'ChIJZYzkZ5a9mYARogWzij1FkJY', 'ChIJ1QiF794qyoARlahhPTPv-lw', 'ChIJV4qmAjqgmYARj1YqSkQDVe0', 'ChIJLzuL-ZPXyIARPhK6qXaxYFg', 'ChIJ4-v-KDzEyIARRrpUdLA6agI', 'ChIJaava57ZQkIAR-tP2VQCCeLE', 'ChIJmZorE5TZmoARU4-XLLugg4Q', 'ChIJmyLcu45W2YARze4Al_4wdOg', 'ChIJy8FzkeA4mIARElchvoyjjWo', 'ChIJuaQnSvxWmIAROxTQ5GlCq64', 'ChIJmSto3AzEyIAR9CR5eHxI4BM', 'ChIJ8ZZtmjZHmYARPmy0CY53NYo', 'ChIJk5ehscpAmYARzEnEgofAsKs', 'ChIJHapjJQBDzoAR3sJEFEsLSMw', 'ChIJy-NPezEHpoARsBvxVP61XWA', 'ChIJT__BBTHEyIARSHye841eD20', 'ChIJY5VYasJ6mYARUEV8U5K2AAA', 'ChIJmdNoSasPmYAR5nCHqUtkvIA', 'ChIJWVQ5eTKiiYcRjVmojx1hHAo', 'ChIJ3fSVtuA4mIARRsynlQ3PoyI', 'ChIJI9tTB6DDyIARBYf7r_X-rdE', 'ChIJgz1t4_1CzoARoYTDwx-mIf0', 'ChIJVbt5oPdgvYAR4oO3MBZ14rA', 'ChIJrwYDNU_RyIARwRU8V-XBbjs', 'ChIJGToTtvLayIARIj6j-kHNjnQ', 'ChIJc2nKAXXDyIARs-mmzOLrTCo', 'ChIJQ10dxaTWyIARQqTucQq7rH4', 'ChIJ080StzVHmYARD-YbD1sKARw', 'ChIJw7ayOUjEyIARDpKewawk8hU', 'ChIJS0B4ZMzCyIARxg2SVf4dIZk', 'ChIJzZtJhM3FyIAR6eHpF4xTR68', 'ChIJP9Noe_PByIARyv_dFb9V5zA', 'ChIJPV1bFDVHmYARKlSZuGnFSvc', 'ChIJVdePyjvEyIARderixECdW2Q', 'ChIJxQGUycivqYARxUxD0-4j7mY', 'ChIJ11yZSXTDyIARlxlY5q_c6JQ', 'ChIJFTJhO6DDyIARYs7dJsDxK2Y', 'ChIJNfEuFygBpoARrcYiyFksaWM', 'ChIJ73KY5J7GyIARMWEsH702oW0', 'ChIJqxKN930KmYARYL8T-Yg7-OA', 'ChIJrRng_BgHpoARfhKinRP97V0', 'ChIJwwCgEi5HmYAR0lLeXAha-rY', 'ChIJG2_a3BlbmYARAEhYpaDJ-tQ', 'ChIJiWmm0c0HmYARlsvbDMBnHqk', 'ChIJs1w9Q_DQyIAR6ZPW0gzrVcM', 'ChIJhYJ3NXXDyIARo_SCc3vMKjw', 'ChIJ0Tqqg4FJz4AR3qzvL6qy8O8', 'ChIJP_e37KHDyIAR972mwUmavqE', 'ChIJM5pPyaHDyIARi2GWubblECA', 'ChIJNQhqgLJDzoARDyXqhK0p204', 'ChIJGfoPHjVHmYAREVM1s1q2hU4', 'ChIJG7qnuls_mYARweP739kMgh8', 'ChIJxfy2Ut7RyIAR0LOPVNgrwYc', 'ChIJ_SFE1PyPmYARqCOqvmsDlMQ', 'ChIJOV4Pe03EyIARDGQ__xHAMJ0', 'ChIJae3o-neQmYARWQ4WjA9fWcY', 'ChIJWxuQMDzEyIARsw492ihhHOE', 'ChIJsdIov8lDzoARwhKfdqzdsrE', 'ChIJw3NtXjVHmYARDMrE3lr5Pb4', 'ChIJnR9tTJ2amYARC-ftPtd_eLM', 'ChIJpeFHN8rFyIAROSGCAIYxpLA', 'ChIJz-mTWessyYARa_90_REypAk', 'ChIJHelpRGmwqYARZp2b9IW_wbA', 'ChIJFT-m86-ssYAR3kEPGyXa-Fo', 'ChIJra8hnEZwmYARkb17p09lRp4', 'ChIJ81hAnuDXx4AR2kGH08Sj-qU', 'ChIJhRmp4q-ssYAR8X4R-aX1m38', 'ChIJP6_zgf3CyIARbaPPhoWYlJE', 'ChIJTVGKO8J6mYARN_dWwWgtv_Y', 'ChIJUaXo_tLWyIARAv0vwUrvdSQ', 'ChIJF__xv6HDyIARkXLzY9Z-tqg', 'ChIJ2w30ooWamYARs_oSKAw7pps', 'ChIJP_YNmqHDyIARk0KVcqa-mkU', 'ChIJ38KlUGXEyIARkT07Nn0apvI', 'ChIJn-BbXLRDzoAR-HRHY2ZZV-s', 'ChIJQyxr-fkHx4ARxrYhaOZg4Mo', 'ChIJR7RcPs7FyIAROAHQry50Wgs', 'ChIJoxOc-TrEyIARdqVkZ98SRE8', 'ChIJpeG5A8LFyIARGMfZ4YyFn90', 'ChIJs-lvDNvQyIARaaVtkhkA0Io', 'ChIJ5_f_SRTMyIARY8g0l5VzTMA', 'ChIJi30u1KbDyIARNE76kZcu75w', 'ChIJYUKC-8_FyIAR7920xSWK9pc', 'ChIJ8yod5wqgmYARu_rqcbxkqrE', 'ChIJu_XZ0DxIQlMR9rQBCev5C9E', 'ChIJE-O4uaHDyIARC990DmzzPu4', 'ChIJJQ6Ck8zFyIARfxB2vQVF2Z0', 'ChIJTdYA9Wi0jocRU1AWurpYKqo', 'ChIJXWr3w4KamYARZP7TljsumIE', 'ChIJCSs1ZDLEyIARiNF4wrbBbvI', 'ChIJC570cFIvrIARCFpBXKUk7OA', 'ChIJF7qxbdM5xoARmFAqv-jLN30', 'ChIJ2y_yN6XDyIAR_rmFeZircHE', 'ChIJGToTtvLayIARmtp4OdQzqYE', 'ChIJZ4lcwszFyIAR7nw_Ba2KrO0', 'ChIJxQpVnjo_mYARW9gkVzXSKgY', 'ChIJHc9juXoIW1MRHD5j2ZnYZUA', 'ChIJ87YpjdzCyIARxCg1f7kDBJA', 'ChIJm0UnxgrDyIARa5_E8I-gQms', 'ChIJR0E2dKAKmYAR3KGG20A2Wyk', 'ChIJ_ydaeznEyIARY4yDHi273-w', 'ChIJuVyRtZe0uoARuVdYZUsVod8', 'ChIJV5vH8Ho3xoARFHiPe9MtlFw', 'ChIJd51IYNoGvIARSMiCFJnG_WI', 'ChIJi-l8wPfDyIARwVNphCouqZs', 'ChIJAQAAAGzDyIARAVwe_ga0REU', 'ChIJ07LkRY9AmYARbPPabWOgb1I', 'ChIJSf2SFKkorIARLCEu1gqfg4U', 'ChIJu4S-6bJDzoAR64sdyCERl_M', 'ChIJa2eKHi9Nz4ARwMWEWM0ARgo', 'ChIJqzfRYTbEyIARnAVadHZlVHw', 'ChIJh6GqRl-ChI4RaWGxZP2MXz0', 'ChIJ_d1KW8XCyIARm-IV6gpPC8s', 'ChIJfStaQQREz4AR8LtnMjBXo2g', 'ChIJF42NwqKssYARJ5o7aTHEqkA', 'ChIJNefIcEw_mYARCJh2qaHcAcY', 'ChIJebRWFKkorIARkM38tQWBapw', 'ChIJU9VPLbvWyIARjB-eDJzabys', 'ChIJBwWn3k7EyIARXI8BgVMbKg8', 'ChIJDccs6ou_yIARdgRZTCFtI5k', 'ChIJH0sVNacorIARc1l1T8uWChk', 'ChIJtUT8XCgBpoARA9IyuTEHO5A', 'ChIJPyboc06-yIAR_JCJkTTID9M', 'ChIJMfU7pKxDzoARvqKP6ShfUJU', 'ChIJfWkGPzVHmYARy-8xPJ55C2o', 'ChIJhcdOQg3EyIARxJQwFt_x8EY', 'ChIJ5_5rfjLEyIARsI4bsrHnbKg', 'ChIJX8LqCCDEyIARtXpjW9_P7YQ', 'ChIJkck4CABDzoARsD7EZpNAuyk']

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
// unspalsh.js

// $get.JSON('https://api.unsplash.com/photos/?client_id=81406c2a5a1edcae83c9fae49f3c97d503eb3df6a4895a2a6a477d14cd390927');
// var $ = require("jquery");
// require("jsdom").env("", function(err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     var $ = require("jquery")(window);
// });
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

var $ = jQuery = require('jquery')(window);
var url = 'https://api.unsplash.com/search/photos?query=california&client_id=81406c2a5a1edcae83c9fae49f3c97d503eb3df6a4895a2a6a477d14cd390927';
$.getJSON(url, function (data) {
    $.each(data.results, function (index, value) {
        imageurl = value.urls.regular;
        // console.log(value.urls.regular);

        // Creates a client
        const client = new vision.ImageAnnotatorClient();

        // Performs label detection on the image file
        client
            .labelDetection(imageurl)
            .then(results => {
                const labels = results[0].labelAnnotations;

                console.log('Labels:');
                labels.forEach(label => console.log(label.description));
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    });
});

// GET /search/photos
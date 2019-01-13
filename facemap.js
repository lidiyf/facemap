// facemap.js
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
const vision = require('@google-cloud/vision'); // Imports the Google Cloud client library
var $ = jQuery = require('jquery')(window);
var request = require('request');
var fs = require('fs');
var states = [
  {
    "name": "Alabama",
    "abbreviation": "AL"
  },
  {
    "name": "Alaska",
    "abbreviation": "AK"
  },
  {
    "name": "Arizona",
    "abbreviation": "AZ"
  },
  {
    "name": "Arkansas",
    "abbreviation": "AR"
  },
  {
    "name": "California",
    "abbreviation": "CA"
  },
  {
    "name": "Colorado",
    "abbreviation": "CO"
  },
  {
    "name": "Connecticut",
    "abbreviation": "CT"
  },
  {
    "name": "Delaware",
    "abbreviation": "DE"
  }];
var states1 = [
  {
    "name": "Alabama",
    "abbreviation": "AL"
  },
  {
    "name": "Alaska",
    "abbreviation": "AK"
  },
  {
    "name": "Arizona",
    "abbreviation": "AZ"
  },
  {
    "name": "Arkansas",
    "abbreviation": "AR"
  },
  {
    "name": "California",
    "abbreviation": "CA"
  },
  {
    "name": "Colorado",
    "abbreviation": "CO"
  },
  {
    "name": "Connecticut",
    "abbreviation": "CT"
  },
  {
    "name": "Delaware",
    "abbreviation": "DE"
  },
  {
    "name": "District Of Columbia",
    "abbreviation": "DC"
  },
  {
    "name": "Florida",
    "abbreviation": "FL"
  },
  {
    "name": "Georgia",
    "abbreviation": "GA"
  },
  {
    "name": "Hawaii",
    "abbreviation": "HI"
  },
  {
    "name": "Idaho",
    "abbreviation": "ID"
  },
  {
    "name": "Illinois",
    "abbreviation": "IL"
  },
  {
    "name": "Indiana",
    "abbreviation": "IN"
  },
  {
    "name": "Iowa",
    "abbreviation": "IA"
  },
  {
    "name": "Kansas",
    "abbreviation": "KS"
  },
  {
    "name": "Kentucky",
    "abbreviation": "KY"
  },
  {
    "name": "Louisiana",
    "abbreviation": "LA"
  },
  {
    "name": "Maine",
    "abbreviation": "ME"
  },
  {
    "name": "Maryland",
    "abbreviation": "MD"
  },
  {
    "name": "Massachusetts",
    "abbreviation": "MA"
  },
  {
    "name": "Michigan",
    "abbreviation": "MI"
  },
  {
    "name": "Minnesota",
    "abbreviation": "MN"
  },
  {
    "name": "Mississippi",
    "abbreviation": "MS"
  },
  {
    "name": "Missouri",
    "abbreviation": "MO"
  },
  {
    "name": "Montana",
    "abbreviation": "MT"
  },
  {
    "name": "Nebraska",
    "abbreviation": "NE"
  },
  {
    "name": "Nevada",
    "abbreviation": "NV"
  },
  {
    "name": "New Hampshire",
    "abbreviation": "NH"
  },
  {
    "name": "New Jersey",
    "abbreviation": "NJ"
  },
  {
    "name": "New Mexico",
    "abbreviation": "NM"
  },
  {
    "name": "New York",
    "abbreviation": "NY"
  },
  {
    "name": "North Carolina",
    "abbreviation": "NC"
  },
  {
    "name": "North Dakota",
    "abbreviation": "ND"
  },
  {
    "name": "Ohio",
    "abbreviation": "OH"
  },
  {
    "name": "Oklahoma",
    "abbreviation": "OK"
  },
  {
    "name": "Oregon",
    "abbreviation": "OR"
  },
  {
    "name": "Pennsylvania",
    "abbreviation": "PA"
  },
  {
    "name": "Rhode Island",
    "abbreviation": "RI"
  },
  {
    "name": "South Carolina",
    "abbreviation": "SC"
  },
  {
    "name": "South Dakota",
    "abbreviation": "SD"
  },
  {
    "name": "Tennessee",
    "abbreviation": "TN"
  },
  {
    "name": "Texas",
    "abbreviation": "TX"
  },
  {
    "name": "Utah",
    "abbreviation": "UT"
  },
  {
    "name": "Vermont",
    "abbreviation": "VT"
  },
  {
    "name": "Virginia",
    "abbreviation": "VA"
  },
  {
    "name": "Washington",
    "abbreviation": "WA"
  },
  {
    "name": "West Virginia",
    "abbreviation": "WV"
  },
  {
    "name": "Wisconsin",
    "abbreviation": "WI"
  },
  {
    "name": "Wyoming",
    "abbreviation": "WY"
  }
];
var key1 = '81406c2a5a1edcae83c9fae49f3c97d503eb3df6a4895a2a6a477d14cd390927';
var key2 = '27842d8f4d23b6998eb7ff85eba3103bd5b2c7c05eebd581d114b9a9466a13e1';
var key = key2;
states.forEach(function (state) {
  var testMap = new Map(); // Create map to store descriptions of pictures
  var maximum = 0;
  var statetheme = '';
  var url = 'https://api.unsplash.com/search/photos?query=' + state.name + '&client_id=' + key;
    $.getJSON(url, function (data) {
        $.each(data.results, function (index, value) {
          imageurl = value.urls.regular;
          const client = new vision.ImageAnnotatorClient(); // Creates a client
          client // Performs label detection on the image file
            .labelDetection(imageurl)
            .then(results => {
              const labels = results[0].labelAnnotations;
              labels.forEach(label => {
                if (testMap.has(label.description)) {
                  var count = testMap.get(label.description);
                  count++;
                  testMap.set(label.description, count);
                }
                else {
                  testMap.set(label.description, "1");
                }
              });
              for (var key of testMap.keys()) {
                if (key != "sky" && maximum < testMap.get(key)) {
                  maximum = testMap.get(key);
                  statetheme = key;
                }
                state["theme"] = statetheme;
                console.log(states);
              }
            })
        });
    });
});
setTimeout(function () {
  console.log("-----------");
  console.log(states);
  // states.forEach(function (state) {
  //   themeurl = 'https://api.unsplash.com/search/photos?query=' + state.theme + '&client_id=' + key;
  //   $.getJSON(themeurl, function (data) {
  //     console.log(data.results[2][0].urls.regular);
  //     // var download = function (uri, filename, callback) {
  //     //   request.head(uri, function (err, res, body) {
  //     //     console.log('content-type:', res.headers['content-type']);
  //     //     console.log('content-length:', res.headers['content-length']);
  //     //     request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  //     //   });
  //     // };
  //     // download(data.results[2], 'google.png', function () {
  //     //   console.log('done');
  //     // });
  //   });
  // });
}, 15000);
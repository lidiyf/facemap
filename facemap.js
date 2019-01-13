// facemap.js
// export GOOGLE_APPLICATION_CREDENTIALS="facemap.json"
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
const vision = require('@google-cloud/vision'); // Imports the Google Cloud client library
var $ = jQuery = require('jquery')(window);
var https = require('https');
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
  }];
var states2 = [
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
  }];
  var states3 = [
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
  }];
  var states4 = [
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
  }];
  var states5 = [
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
  }];
  var states6 = [
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
var states = states1;
// var states = states2;
// var states = states3;
// var states = states4;
// var states = states5;
// var states = states6;
var key1 = '81406c2a5a1edcae83c9fae49f3c97d503eb3df6a4895a2a6a477d14cd390927';
var key2 = '27842d8f4d23b6998eb7ff85eba3103bd5b2c7c05eebd581d114b9a9466a13e1';
var key3 = 'ce6f7550e44a547e8234c7407f12684113f58025b281f4c5d558763564750e52';
var key4 = '65479bb936da3219a9cf2228e92ccf6ac6d79aa45fd64fb25d7d15d4bd15c5e8';
var key = key4;
states.forEach(function (state) {
  var testMap = new Map(); // Create map to store descriptions of pictures
  var maximum = 0;
  var statetheme = "";
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
          }
        })
    });
  });
});
async function saveImageToDisk(url, localPath) {
  var fullUrl = await url;
  var file = await fs.createWriteStream(localPath);
  var request = await https.get(url, async function (response) {
    await response.pipe(file);
  });
}
setTimeout(function () {
  states.forEach(async function (state) {
    if (!(state.hasOwnProperty("theme")) || state.theme == "") {
      state["theme"] = await state.name + " sky";
    }
  });
  console.log("-----------");
  console.log(states);
  states.forEach(async function (state) {
    themeurl = await 'https://api.unsplash.com/search/photos?query=' + state.theme + '&client_id=' + key;
    await $.getJSON(themeurl, async function (data) {
      await console.log(state.name + '\n' + data.results[0].urls.regular);
    });
  });
}, 15000);
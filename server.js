// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
//app.get("/api/hello", function (req, res) {
  //res.json({greeting: 'hello API'});

app.get("/api/timestamp/:date", function(req, res){ 
  var date = req.params.date;
  
  var dateFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  // if date is not a number=if date is string
  if(isNaN(date)){
    var utcDate = new Date(date);
    utcDate = utcDate.toLocaleDateString("en-us", dateFormatOptions);
    var unixDate = new Date(date).getTime()/1000;//this is in second
  }
  else {
    var unixDate = date;
    var utcDate = new Date(date*1000);
    //utcDate = utcDate.toLocaleDateString("en-us", dateFormatOptions);
  }
  
  res.json({unix: unixDate, utc: utcDate});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
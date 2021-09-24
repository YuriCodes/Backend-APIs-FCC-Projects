// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", (req,res) => {
  //error message for invalid formats
  //parse returns milliseconds
  //also check for normal number inputs
  let input = req.params.date
  if(!Date.parse(input) && !Number(input)){
    return res.send({error:"Invalid Date"});
  }
  //use regex to test for (-) which is normal input dates
  //to then work with milliseconds
  //and check if it's a numbers
  else if(!(/[-]/.test(input)) && Number(input)){
    let date = new Date(Number(input));
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
  //for normal date format
  let date = new Date(input);
  let datesOutput = {
    unix: date.getTime(),
    utc: date.toUTCString()
  }
  res.json(datesOutput);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

require('./server/config/mongoose.js')

var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var http = require('http')

'use strict';

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
require('./server/config/routes.js')(app);


app.use(express.static(path.join(__dirname, '/client')));
app.use('/scripts', express.static(__dirname + '/node_modules'));




app.listen('8000', function(){
	console.log('server is listening at 8000');
})


// app.get('/', function(req, res) {
  // res.status(200).send('Hello, world!');
// });

// Start the server
// var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function() {
//   console.log('App listening at http://%s:%s', server.address().address,
//     server.address().port);
//   console.log('Press Ctrl+C to quit.');
// });

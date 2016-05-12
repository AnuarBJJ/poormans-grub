require('./server/config/mongoose.js')

var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var http = require('http')



var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
require('./server/config/routes.js')(app);


app.use(express.static(path.join(__dirname, '/client')));
app.use('/scripts', express.static(__dirname + '/node_modules'));




app.listen('8000', function(){
	console.log('server is listening at 8000');
})
var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var app = express();
// app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/client')));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


require('./server/config/mongoose.js')

require('./server/config/routes.js')(app);

app.listen('8888', function(){
	console.log('server is listening at 8888');
})
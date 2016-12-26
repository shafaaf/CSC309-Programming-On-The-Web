var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

require('./routes.js')(app);	//load our routes in

app.get('/', function(req, res){
	 res.sendfile(__dirname+'/index.html');
})

app.listen(port);
console.log('Listening on port ' + port);

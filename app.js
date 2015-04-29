var express = require('express');
var logger = require('morgan');
var app = express();
var swig = require('swig');
swig.setDefaults({cache: false});
// var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
var routes = require('./routes');

app.use(logger('dev') );
app.use('/', routes);

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var server = app.listen(3000, function() {
	console.log('listening on port...');
});

app.use(express.static(__dirname + '/public'));



// app.get('/', function(req,res) {
// 	// res.send("Hello World");
// 	res.render('index', {title: 'Hall of Fame', people: people});
// });


// app.get('/news', function(req,res) {
// 	res.send("This is a news page");
// });
var express = require('express');
var logger = require('morgan');
var app = express();
var swig = require('swig');
var socketio = require('socket.io');


var server = app.listen(3000);
var io = socketio.listen(server);


// /////////////////Body Parser//////////////////////////
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// ////////////////////////////////////////////////////


swig.setDefaults({cache: false});
// var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
var routes = require('./routes');

app.use(logger('dev') );
// app.use('/', routes);
app.use('/', routes(io) );
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// var server = app.listen(3000, function() {
// 	console.log('listening on port...');
// });

app.use(express.static(__dirname + '/public'));

var User = require('./models').User;
User.find(1).then(function(user) {
    user.getTweets().then(function(tweets) {
        console.log(tweets);
  });
});
var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var User = require('../models').User;
var Tweets = require('../models').Tweet;

module.exports = function (io) {

router.get('/', function (req, res) {
  Tweets.findAll({
    include:[User]
  }).then(function(tweets) {
    console.log("tweets", tweets);
    console.log("nAmEEEEEEEEEE", User);
    res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true});
  })
});


router.get('/users/:name', function(req, res) {
  var userName = req.params.name;
  User.find({
    where: {name: userName}
  }).then(function(userObj) {
      userObj.getTweets().then(function(tweets){
        res.render( 'index', { title: 'Twitter.js - Posts by '+ userName, tweets: tweets, showForm: true, name: userName});
      })
  })
});

router.get('/users/:name/tweets/:id', function(req, res){
	var userName = req.params.name;
	var idOfTweet = +req.params.id;
  Tweets.find({
    where: {id: idOfTweet},
    include: [User]
  }).then(function(aTweet){
      console.log("aTweet", aTweet);
      res.render('index', { title: 'Twitter.js - Post by '+ userName, tweets: aTweet});
  })
});

router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
   io.sockets.emit('new_tweet', {name:name, text:text});
  res.redirect('/');

});

// module.exports = router;



  return router;
};
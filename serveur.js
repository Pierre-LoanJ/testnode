//avec Express pour la couche HTTP et EJS pour le moteur de templates
var express = require('express');
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres de formulaire

var mongo = require('mongodb');
var monk = require('monk');

var passport = require('passport')  
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session');
var logger = require('morgan');
var flash = require('connect-flash');

var app = express();
var db = monk('localhost:27017/nodetest');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('./public'));

app.use(session({ secret: 'shhsecret' }));  
app.use(passport.initialize());  
app.use(passport.session());  
app.use(flash());

/*
app.use(function(req, res, next) {  
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {  
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});
*/

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});


app.get('/todo', function(req, res) {
    res.render('index.ejs');
})
.post('/login', function(req, res) {
    //recup user psw


    // controler l'authentification


    /*

    if ok
    res.render('profile.ejs');
    */
})

.post('/saveTask', function(req, res) {
    console.log("request received");
    //code metier
    //......
    var db = req.db;
    var collection = db.get('usercollection');
    var datas = collection.find({}, {}, function(e,docs){
    // code retour
    res.send({  data: docs,
                codeRetour: "OK" });
    });
});
app.get('/profile', isLoggedIn, function(req, res) {  
  res.render('profile.ejs', { user: req.user });
});

app.listen(3030);
module.exports = app;

function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated())
      return next();
}
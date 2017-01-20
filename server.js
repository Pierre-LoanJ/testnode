//avec Express pour la couche HTTP et EJS pour le moteur de templates
/*
var express = require('express');
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres de formulaire

var mongo = require('mongodb');
var monk = require('monk');
var User = require('./models/user');

var passport = require('passport')  
, LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var logger = require('morgan');
var flash = require('connect-flash');

var app = express();
var db = monk('localhost:27017/nodetest');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('./public'));

app.use(session({ secret: 'shhsecret' }));  
app.use(passport.initialize());  
app.use(passport.session());  
app.use(flash());


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});



app.post('/saveTask', function(req, res) {
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
  res.render('profile.ejs'  , { user: req.user }     );
});


require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passpo

app.listen(3030);
module.exports = app;

*/









// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = 3030; //process.env.PORT || 3030;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

 require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(express.static('./public'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

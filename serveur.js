/*
serveur http sans le package Express
var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end('<p>Voici un paragraphe <strong>HTML</strong> !</p>');
});
*/


//avec Express pour la couche HTTP et EJS pour le moteur de templates
var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres de formulaire

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest');



var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

app.use(express.static('./public'));


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

/*
app.use(session({secret: 'todotopsecret'}))

.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})*/
app.get('/todo', function(req, res) {
    res.render('index.ejs' /*,{todolist: req.session.todolist}*/);
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


app.listen(3030);
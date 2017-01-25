// app/routes.js
var formidable = require('formidable');
var path       = require('path');
var fs         = require('fs');
var body       = require('body-parser');
var User       = require('../models/user');
var logger = require('../logs/config.js');
var mongoose = require('mongoose');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('home.ejs'); // load the home.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
   /* app.get('/profile/photo', function(req, res){
        res.render();
    });*/
    app.post('/profile/photo/upload', function(req, res){

      // create an incoming form object
      var form = new formidable.IncomingForm();

      // specify that we want to allow the user to upload multiple files in a single request
      form.multiples = true;

      // store all uploads in the /uploads directory
      form.uploadDir = path.join('.', 'public/uploads');

      // every time a file has been uploaded successfully,
      // rename it to it's orignal name
      form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, "profile.jpg"));
      });

      // log any errors that occur
      form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
      });

      // once all the files have been uploaded, send a response to the client
      form.on('end', function() {
        //res.redirect('/');
        res.end('success');
      });

      // parse the incoming request containing the form data
      form.parse(req);

    });
     app.post('/profile/infos/update', function(req, res){

        var name = req.body.name;
        var job  = req.body.job;

        var id = req.session.passport.user;
//logger.debug('/profile/infos/update ', ' bodyparser ', ' name=' + req.body.name + ', job=' + req.body.job);

        User.findOne({ '_id' :  id }, function(err, res) {
            // if there are any errors, return the error
            if (err){
logger.error('/profile/infos/update ', ' User.findOne ERROR', ' err=' + err);  // NE LOG PAS 
                return done(err);

            }

            // check if document exists
            if (res) {
                logger.debug('/profile/infos/update ', ' User.findOne ', ' res=' + res);
                res.local.name    = name;
                res.local.job     = job;
                res.save(function(err) {
                    if (err)
                        logger.error('ERROR', 'save failed', 'err:' + err);
                    else
                        logger.info('some datas of User schema have been updated');
                        
                    });
            }
                 else {
                    logger.warn('/profile/infos/update ', ' User.findOne ', ' no res=' + res);
                    return done(null, false, req.flash('user retrieve', 'no user found for update'));
            }
        });
        res.redirect('/profile');
    });
};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
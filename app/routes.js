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
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
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
            user : req.user, // get the user out of session and pass to template
            userId : req.session.passport.user
        });
    });

    app.get('/profile/userProfilePicture', isLoggedIn, function(req, res) {
        var id = req.session.passport.user;
        var data = {
            userProfilePicture : id
        };
        //res.writeHead(200, {"Content-Type": "text/plain"});
        //res.json(data);
        res.send(data);
        res.end();
    });

   
   /* app.get('/profile/photo', function(req, res){
        res.render();
    });*/
    app.post('/profile/photo/upload', function(req, res){

      // create an incoming form object
      var form = new formidable.IncomingForm();

      // specify that we want to allow the user to upload multiple files in a single request
      form.multiples = false;

      // store all uploads in the /uploads directory
      form.uploadDir = path.join('.', 'public/uploads');

      // every time a file has been uploaded successfully,
      // rename it to it's orignal name
      // parse the incoming request containing the form data
      form.parse(req);
      var id = req.session.passport.user;
        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, "/profile_" + id + ".jpg"));
        });

        var imgData = fs.readFileSync(form.uploadDir + "/profile_" + id + ".jpg");
        var imgContentType = 'image/jpg';
        /*User.save(function (err, User) {
             if (err) throw err;
        });*/        

        
        User.findOne({ '_id' :  id }, function(err, res) {
            // if there are any errors, return the error
            if (err){
                logger.error('/profile/upload/photo ', ' User.findOne ERROR', ' err=' + err);  // NE LOG PAS 
                return done(err);

            }
  // check if document exists
            if (res) {
                logger.debug('/profile/upload/photo ', ' User.findOne ', ' res=' + res);
                res.local.img    = imgData;
                try {
                    res.save(function(err) {
                        if (err)
                            logger.error('ERROR', 'save failed', 'err:' + err);
                        else
                            logger.info('Profile picture has been uploaded');
                            
                        });   
                }
                catch(exception){

                }
            }
                 else {
                    logger.warn('/profile/upload/photo ', ' User.findOne ', ' no res=' + res);
                    return done(null, false, req.flash('user retrieve', 'no user found for update'));
            }
        });
        res.send({userProfilePicture : id});
        res.end();

      // log any errors that occur
      form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
      });

      // once all the files have been uploaded, send a response to the client
      form.on('end', function() {
        logger.warn('/profile/upload/photo ', ' OK ');
        //res.redirect('/');
        res.end('success');
      });
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
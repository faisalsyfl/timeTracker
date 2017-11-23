/* Load library requirement */
var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var User = require('../models/users');

// call socket.io to the app
router.io = require('socket.io')();

/*Setup env for login from Auth0 */
var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* GET user index. */
router.get('/', ensureLoggedIn, function(req, res, next) {
    /*search user from database*/
    User.findOne({email : req.user.nickname+"@gmail.com"},function(err,data){
       /*if user not exits from database* */
        if(!data){ 
            /*Created userdata for save to database*/                                                              
            var Userdata = new User({
                name  : req.user.displayName,
                email : req.user.nickname+"@gmail.com",
                profile_picture : req.user.picture
            });
            
            /*save to database*/
            Userdata.save(function(err){
                if(!err){
                    return console.log("created");
                }else{
                    return console.log(err);
                }
            });

            /* search user again from database*/
            User.findOne({email : req.user.nickname+"@gmail.com"},function(err,data){
                /*render user.ejs with data exits from database*/
                res.render('index', { title: 'Express' , user: data });
            });
        }

         /*render user.ejs with data exits from database*/
        res.render('index', { title: 'Makers Institute | Dashboard' , user: data }); 
    });
    
});

/*GET login page */
router.get('/login',function(req, res){
    res.render('login', { title: 'Express' , env: env });
});

/*GET login page */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/*GET callback for login from Auth0 */
router.get('/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/login',
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });
 
/*Export module index from router*/
module.exports = router;

/* Load library requirement */
var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var User = require('../models/users');


/* GET user profile. */
router.get('/:id', ensureLoggedIn, function(req, res, next) {
    /*search user from database*/
    User.findOne({_id : req.params.id},function(err,data){
         /*render user.ejs with data exits from database*/
        res.render('user', { title: 'My Profile' , user: data }); 
    });    
});

/*Export module user from router */
module.exports = router;

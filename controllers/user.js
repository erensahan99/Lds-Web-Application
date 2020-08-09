const passport = require('passport');
const myPassword = require('../passport_setup')(passport);

const models = require('../models');


exports.loginPage = function (req, res, next) {
    res.render('user/login',{form_data:{},errors:{}});
}

exports.login = function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
}




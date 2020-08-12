const passport = require('passport');
const myPassword = require('../passport_setup')(passport);

const models = require('../models');

exports.mainPage = function (req, res, next) {
    res.render('user/index', {
        user: req.user.dataValues
    });
};

exports.loginPage = function (req, res, next) {
    res.render('user/login', {
        form_data: {},
        errors: {}
    });
}

exports.login = function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
}

exports.logout = function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
}
const bcrypt = require('bcrypt');
const passport = require('passport');
const myPassword = require('../passport_setup')(passport);

const models = require('../models');


const hashGenerator = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}


exports.adminPage = function (req, res, next) {
    res.render('user/adminPage');
}

exports.singupPage = function (req, res, next) {
    res.render('user/signup', {
        form_data: {},
        errors: {}
    });
}

exports.signup = function (req, res, next) {
    const newUser = models.User.build({
        username: req.body.username,
        password: hashGenerator(req.body.password),
        email: req.body.email,
        name: req.body.name,
        lastname: req.body.lastname
    });
    return newUser.save().then(result => {
        passport.authenticate('local', {
            successRedirect: "/",
            failureRedirect: "/signup",
            failureFlash: true
        })(req, res, next);
    })
}
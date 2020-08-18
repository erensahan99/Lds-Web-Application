var path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const myPassword = require('../passport_setup')(passport);

const models = require('../models');


const hashGenerator = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}


exports.adminPage = function (req, res, next) {

    res.render('admin/adminPage',{
        user: req.user.dataValues
    });
}

exports.userList = function (req, res, next) {
    return models.User.findAll().then(users => {
        res.render('admin/userList', {
            user: req.user.dataValues,
            users: users
        });
    })
}

exports.addUserPage = function (req, res, next) {
    res.render('admin/addUser', {
        user: req.user.dataValues,
        form_data: {},
        errors: {}
    });
}

exports.addUser = function (req, res, next) {
    let isAdmin;
    if (req.body.isAdmin === 'on')
        isAdmin = 1;
    else
        isAdmin = 0;
    models.User.create({
        username: req.body.username,
        password: hashGenerator(req.body.username),
        email: req.body.email,
        name: req.body.name,
        lastname: req.body.lastname,
        isAdmin: isAdmin
    }).then(function () {
        res.redirect('/users')
    }).catch(err => {
        console.log(err);
    })
}

exports.aracTakipMenu = function (req, res, next) {
    res.render('admin/aracTakipMenu', {
        user: req.user.dataValues
    });
}

exports.vehicleList = function (req, res, next) {
    return models.Vehicle.findAll().then(vehicles => {
        res.render('admin/vehicleList', {
            user: req.user.dataValues,
            vehicles: vehicles
        });
    })
}

exports.addVehiclePage = function (req, res, next) {
    res.render('admin/addVehicle', {
        user: req.user.dataValues,
        form_data: {},
        errors: {}
    });
}
exports.addVehicle = function (req, res, next) {
models.Vehicle.create({
    macAddress: req.body.macAddress,
    alias: "Lodos-" + parseInt(Math.random() * 100),
    color: req.body.colorId
}).then(result => {
    res.redirect('/vehicles')
}).catch(err => {
    console.log("err0= " + err);
})
}

exports.singupPage = function (req, res, next) {
    res.render('admin/signup', {
        form_data: {},
        errors: {},
        user: req.user.dataValues
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
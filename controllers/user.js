const passport = require('passport');
const myPassword = require('../passport_setup')(passport);

const { Op, MACADDR } = require("sequelize");
const models = require('../models');

exports.mainPage = function (req, res, next) {
    return models.Data.findAll({
        where: {
           [Op.or]: [{dataName : 'sicaklik1'},{dataName : 'sicaklik2'},{dataName : 'sicaklik3'},{dataName : 'sicaklik4'}],
           [Op.and]: [{macAddress: req.user.macAddress}]

        },
        order: [['time', 'DESC']],
        limit:100
    }).then(data => {
        models.Data.findOne({
            attributes: ['data'],
            raw: true,
            where:{
                [Op.and]: [{dataName : 'gps'}, {macAddress: req.user.macAddress}],
                [Op.not]: [{data:['None,None']}]
            },
            order: [['time', 'DESC']],
            limit:1
        }).then(gps => {
            res.render('user/index', {
                user: req.user.dataValues,  
                data: data,
                macAddress: req.user.macAddress,
                gps: gps
            });
        }).catch(err => {
            console.log("err0= " + err);
        })
    })
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

exports.userProfile = function (req, res, next) {
    
    res.render('user/index', {
        user: req.user.dataValues,
        data: data
    });
    

}

exports.logout = function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
}
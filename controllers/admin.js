var path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const myPassword = require('../passport_setup')(passport);

const { Op, MACADDR } = require("sequelize");
const models = require('../models');
const {
    sequelize
} = require('../models');
const {
    connect
} = require('http2');


const hashGenerator = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

const getLastLocs = function(vehicles, currentNum, result, vehicleCount, clientCount, adminCount, req, res){
    console.log(vehicles);
    if(vehicles.length == 0){
        res.render('admin/adminPage', {
            user: req.user.dataValues,
            vehicleCount: vehicleCount,
            clientCount: clientCount,
            adminCount: adminCount,
            lastLocs: result
        });
    }else
    models.Data.findOne({
        where:{
            [Op.and]: [{dataName : 'gps'}, {macAddress: vehicles[currentNum].macAddress}],
            [Op.not]: [{data:['None,None']}]
        },
        order: [['time', 'DESC']],
        limit:1,
        raw: true
    }).then(gps => {
        if(gps){
            result.push({'macAddress':vehicles[currentNum].macAddress, 'loc':gps.data});
        }
        
        currentNum--;

        if(currentNum <= 1){
            console.log(result);

            res.render('admin/adminPage', {
                user: req.user.dataValues,
                vehicleCount: vehicleCount,
                clientCount: clientCount,
                adminCount: adminCount,
                lastLocs: result
            });
        }

        return getLastLocs(vehicles, currentNum, result, vehicleCount, clientCount, adminCount, req, res);
    }).catch(err => {
        if(currentNum!=-1)
            console.log('err' + currentNum +':'+err)
    })
}


exports.adminPage = function (req, res, next) {
    return models.Vehicle.findAll({
        attributes: ['macAddress'],
        raw: true
    }).then(vehicles => {
        var vehicleCount = Object.values(vehicles).length;
        models.User.count({
            where: [{ 'isAdmin' : 0 }]
        }).then(clientCount => {
            models.User.count({
                where: [{ 'isAdmin' : 1 }]
            }).then(adminCount => {
                getLastLocs(vehicles, vehicleCount-1, [], vehicleCount, clientCount, adminCount, req, res);
            }).catch(err => {
                console.log("err5= " + err);
            })
        })
    })
}

exports.userList = function (req, res, next) {
    return models.Vehicle.findAll().then(vehicles => {
        sequelize.query("SELECT U.userId, U.username, U.name, U.lastname, U.email, U.isAdmin, O.macAddress FROM Users U LEFT JOIN Ownerships O ON U.userId = O.userId ORDER BY U.userName, U.isAdmin", {
            type: sequelize.QueryTypes.SELECT
        }).then(users => {
            res.render('admin/userList', {
                user: req.user.dataValues,
                users: users,
                vehicles: vehicles
            });
        })
    }).catch(err => {
        console.log(err)
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
    return models.Vehicle.findAll().then(vehicles => {
        res.render('admin/aracTakipMenu', {
            user: req.user.dataValues,
            vehicles: vehicles
        });
    })
}

exports.aracTakip = function (req, res, next) {
    return models.Data.findAll({
        where: {
           [Op.or]: [{dataName : 'sicaklik1'},{dataName : 'sicaklik2'},{dataName : 'sicaklik3'},{dataName : 'sicaklik4'}],
           [Op.and]: [{macAddress: req.params.macAddress}]
        },
        order: [['time', 'DESC']],
        limit:100
    }).then(data => {
        models.Data.findOne({
            attributes: ['data'],
            raw: true,
            where:{
                [Op.and]: [{dataName : 'gps'}, {macAddress: req.params.macAddress}],
                [Op.not]: [{data:['None,None']}]
            },
            order: [['time', 'DESC']],
            limit:1

        }).then(gps => {
            res.render('admin/aracTakip', {
                user: req.user.dataValues,  
                data: data,
                macAddress: req.params.macAddress,
                gps: gps
            });
        }).catch(err => {
            console.log("err0= " + err);
        })
    })
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

exports.changeOwnership = function (req, res, next) {
    req.body.macAddresses.forEach(macAddress => {
        let values = macAddress.split("_");
        if (values[1]) {

            models.Ownership.findOne({
                where: {
                    userId: values[0]
                }
            }).then(result => {
                if (result) {
                    models.Ownership.update({
                        macAddress: values[1]
                    }, {
                        where: [{
                            userId: values[0]
                        }]
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    //console.log(values)
                    models.Ownership.create({
                        macAddress: values[1],
                        userId: values[0]
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        }
    });
    res.redirect('/users')
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
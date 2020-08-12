var express = require('express');
var router = express.Router();

let user = require('../controllers/user')
let admin = require('../controllers/admin')
let {
    isLoggedin,
    isAdmin,
    admin_userRouter
} = require('../middleware/hasAuth.js')


/* GET home page. */
router.get('/', isLoggedin, admin_userRouter, user.mainPage);

router.get('/login', isLoggedin, admin_userRouter, user.loginPage);
router.post('/login', user.login);
router.get('/logout', user.logout);

router.get('/users', isAdmin, admin.userList);
router.get('/addUser', isAdmin, admin.addUserPage);
router.post('/addUser', admin.addUser);
router.get('/aracTakipMenu', isAdmin, admin.vehicleList);
router.get('/vehicles', isAdmin, admin.vehicleList);
router.get('/addVehicle', isAdmin, admin.addVehiclePage);
router.post('/addVehicle', admin.addVehicle);
router.get('/signup', isAdmin, admin.singupPage);
router.post('/signup', admin.signup);

router.get('/adminPage', isAdmin, admin.adminPage);

module.exports = router;
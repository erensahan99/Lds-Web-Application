var express = require('express');
var router = express.Router();

let index = require('../controllers/index')
let user = require('../controllers/user')
let admin = require('../controllers/admin')
let {isLoggedin, isAdmin} = require('../middleware/hasAuth.js')


/* GET home page. */
router.get('/', isLoggedin, index.index);

router.get('/login', user.loginPage);
router.post('/login', user.login);

router.get('/signup', isAdmin, admin.singupPage);
router.post('/signup', isAdmin, admin.signup);

router.get('/adminPage', isAdmin, admin.adminPage);

module.exports = router;
var express = require('express');
var router = express.Router();

let soap = require('../controllers/soap')
/* GET users listing. */
router.get('/soap/:mac', soap.soap);

module.exports = router;

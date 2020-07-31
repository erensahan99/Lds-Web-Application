var express = require('express');
var router = express.Router();

let index = require('../controllers/index')
let soap = require('../controllers/soap')

/* GET home page. */
router.get('/', index.index);
router.get('/soap/:mac', soap.soap);

module.exports = router;
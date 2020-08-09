const models = require('../models')
const passport = require('passport');
const myPassword = require('../passport_setup')(passport);


exports.index = function (req, res, next) {
  res.render('index', {
    resu: 'Lodos E2'
  });
};


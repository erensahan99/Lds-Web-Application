const models = require('../models')

exports.index = function (req, res, next) {
  res.render('index', {
    resu: 'Lodos E2'
  });
};

exports.abc = function (req, res, next) {
  return models.User.create({
    username: 'erensahan99',
    password: '123456',
    name: 'Eren',
    lastname: 'ŞAHAN',
    email: 'eren.sahan99@gmail.com',
    isAdmin: true
  }).then(user => {
    res.redirect('/');
  }).catch(err => {
    done(err, false);
  })
};
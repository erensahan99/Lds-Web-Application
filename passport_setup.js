let LocalStrategy = require('passport-local').Strategy;

let models = require('./models');
let bcrypt = require('bcrypt');

const validPassword = function (user, password) {
    return bcrypt.compareSync(password, user.password);
}

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.userId);
    });
    passport.deserializeUser(function (userId, done) {
        models.User.findOne({
            where: {
                'userId': userId
            }
        }).then(user => {
            if (user == null) {
                done(new Error('Böyle bir kullanıcı bulunmamaktadır.'))
            }
            done(null, user);
        })
    });

    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, username, password, done) {
            return models.User.findOne({
                where: {
                    'username': username
                },
            }).then(user => {
                if (user == null) {
                    req.flash('message', 'Incorrect username or password');
                    return done(null, false);
                } else if (user.password == null || user.password == undefined) {
                    req.flash('message', 'Something went wrong. Please contact a Lodos representative');
                    return done(null, false);
                } else if (!validPassword(user, password)) {
                    req.flash('message', 'Incorrect username or password');
                    return done(null, false);
                }
                console.log("==> " + user.isAdmin)
            return done(null, user);
            }).catch(err => {
                done(err, false);
            })
        }));
}
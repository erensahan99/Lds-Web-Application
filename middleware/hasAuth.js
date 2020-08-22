const createError = require('http-errors')

exports.isLoggedin = function (req, res, next) {
	if (req.user)
		next();
	else
		res.redirect('/login');
}

exports.isLoggedin2 = function (req, res, next) {
	if (req.user)
		res.redirect('/');
	else
		next();
}

exports.isAdmin = function (req, res, next) {
	if (req.user && req.user.isAdmin == true)
		next();
	else
		res.redirect('/');
}

exports.admin_userRouter = function (req, res, next) {
	if (req.user) {
		if (req.user.isAdmin)
			res.redirect('/adminMenu')
		else
			next()
	} else
		res.redirect('/login')
}
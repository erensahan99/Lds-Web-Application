const createError = require('http-errors')

exports.isLoggedin = function (req, res, next) {
	console.log(process.env.user)
	if (req.user) {
		next();
	} else
		res.render('user/login', {
			form_data: {},
			errors: {}
		});
}

exports.isAdmin = function (req, res, next) {
	if (req.user && req.user.isAdmin == true)
		next();
	else
		next(createError(404, "Page does not exist."));
}

exports.admin_userRouter = function (req, res, next) {
	if (req.user) {
		if (req.user.isAdmin)
			res.render('admin/adminPage', {
				user: req.user.dataValues
			});
		else
			res.render('user/index', {
				user: req.user.dataValues
			});
	} else
		next();
}
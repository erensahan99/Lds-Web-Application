
exports.soap = function(req, res, next) {
    console.log(req.params.mac)
    res.redirect('/soapservice?wsdl');
  }
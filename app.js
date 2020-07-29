var http = require('http');
var soap = require('soap');

var soapservice = {
    Hello_Service: {
        Hello_Port: {
            // This is how to define an asynchronous function.
            sayHello: function (args, callback) {
                // do some work
                console.log('sayHello: '+JSON.stringify(args));
                callback({'greeting': 'Hello '+args.firstName.$value});
            }
        }
    }
};

var wsdlxml = require('fs').readFileSync('soapservice.wsdl', 'utf8'),
    server = http.createServer(function (request, response) {
        response.end("404: Not Found: " + request.url);
    });

var PORT = process.env.PORT || 3000;

server.listen(PORT);
console.log('server running on port ' + PORT);

soap.listen(server, '/soapservice', soapservice, wsdlxml);
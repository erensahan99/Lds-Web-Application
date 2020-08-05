var mqtt = require('mqtt');
require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');

var indexRouter = require('./routes/index');
var soapRouter = require('./routes/soap');
const {
    count
} = require('console');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/images/icon.png'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;



var options = {
    port: process.env.port,
    host: process.env.host,
    clientId: process.env.clientId,
    username: process.env.username,
    password: process.env.password,
    keepalive: 60,
    rejectUnauthorized: true
};
var client = mqtt.connect(process.env.host, options);
client.on('connect', function () {
    console.log('connected');
    // subscribe to a topic
    client.subscribe('eren.sahan99@gmail.com/abc', function () {
        // when a message arrives, do something with it
        client.on('message', function (topic, message, packet) {

            console.log("Message received on'" + topic + "': " + message);
        });
        var counter = 0;
        

    });
});

client.on('error', function (err) {
    console.log(err);
});
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');
// var util = require('./util/util')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    if (req.cookies.userId) { //判断用户是否登陆
        next()
    } else {
        if (
            req.originalUrl == '/users/login' ||
            req.path == '/goods/list' ||
            req.originalUrl == '/user/checkLogin'
        ) {
            next()
        } else {
            res.json({
                status: '1',
                msg: "用户未登录",
                result: ''
            })
        }
    }
});
app.use('/', index);
app.use('/users', users);
app.use('/goods', goods);

// catch 404 and forward to error handler
// 访问拦截，当我们点击加入购物车的时候判断一下是否登陆
// 规定哪些接口是可以访问的，哪些接口是需要登陆后才能访问的


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var AdminUser = require('./models/admin_user');

var app = express();
var AdminUser = require('./models/admin_user');
var utils = require('./tools/utils');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

global.baseDir = __dirname; //设置存储全局目录路径
// global.pageSize = 2; //分页的页数

app.use(logger('dev'));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//自定义路由模块
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/common', require('./routes/common'));

// 管理后台登陆页面(从路由中取出是为了让其执行因为在清除cookie时在后面的判断后会执行不到路由中文件)
app.get('/admin/main/login', (req, res) => {
	res.render('admin/login');
});
app.post('/admin/main/login_sub', (req, res) => {
	AdminUser.findOne({ $or: [{ user_name: req.body.uName }, { email: req.body.uName}] })
		.then(u => {
			if(u) {
				var strPwd = req.body.uPwd;
				strPwd = utils.md5(strPwd);
				if(strPwd = u.user_pwd) {
					res.cookie('admin_user', u.id, { path: '/' });
					res.json({
						status: 'y',
						msg: '登录成功'
					})
				} else {
					res.json({
						status: 'n',
						msg: '用户密码错误'
					})
				}
			} else {
				res.json({
					status: 'n',
					msg: '该用户未注册'
				})
			}
		})
});

//设置后台管理权限
//app.all表示所有请求
// app.all('/admin/*', (req, res, next ) => {
// 	if(req.cookies.admin_user) {
// 	//	已经登录
// 		next();
// 	} else { //未登录成功
// 		res.redirect('/admin/main/login')
// 	}
// });
app.use('/admin/rows', require('./routes/admin/admin_row'));
app.use('/admin/cols', require('./routes/admin/admin_col'));
app.use('/admin/main', require('./routes/admin/main'));
app.use('/admin/goodsType', require('./routes/admin/admin_goodsType'));
app.use('/admin/goods', require('./routes/admin/admin_goods'));

app.use('/admin/user', require('./routes/admin/admin_user'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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

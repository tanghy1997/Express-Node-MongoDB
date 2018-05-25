var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Col = require('../models/col');
var Row = require('../models/row');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
	const rowData = Row.find();
	const colData = Col.find();
	const userData = User.find();
	const allP = Promise.all([rowData, colData, userData]);
	allP.then(([rowList, colList, users]) => {
		res.render(('user/index', {
			rowList,
			colList,
			users
		}))
	})
});

//用户注册
router.get('/reg', (req, res) => {
	const rowData = Row.find();
	const colData = Col.find();
	const  allP = Promise.all([rowData, colData]);

	allP.then(([rowList, colList]) => {
		console.log(123)
		res.render('user/reg', {
			rowList,
			colList
		})
		.catch(err => {
			console.log(err);
		})
	})
});

router.post('/reg', (req, res) => {
	const model = new User(req.body);
	// count统计数量
	User.count({
		row_id: req.body.row_id,
		col_id: req.body.col_id
	}).then(c => {
		console.log(c);
		if(c > 0) {
			res.send('此位置已经有人了');
		} else {
			model.save()
				.then(data => {
					res.send(data);
				})
				.catch(err => {
					res.send(err);
				})
		}
	})
});


module.exports = router;

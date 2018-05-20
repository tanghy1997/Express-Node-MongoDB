const express = require('express');
const router = express.Router();

const goodsType = require('../../models/goods_type');

router.get('/', (req, res) => {
	goodsType.find()
		.then(data => {
			res.render('admin/goodsType/index', { list: data })
		});
});
router.get('/add', (req, res) => {
	res.render('admin/goodsType/add')
});

router.post('/add', (req, res) => {
	var model = new goodsType(req.body);
	model.save()
		.then(data => {
			console.log(data);
			res.redirect('/admin/goodsType');
		})
		.catch(err => {
			console.log(err);
			res.send(err);
		})
});

module.exports = router;
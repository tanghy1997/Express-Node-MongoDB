const express = require('express');
const router = express.Router();

const Goods = require('../../models/goods');
const GoodsType = require('../../models/goods_type');

router.get('/', (req, res) => {
	const goodsData = Goods.find();
	const goodsTypeData = GoodsType.find();
	const allP = Promise.all([goodsData, goodsTypeData]);
	// 此处使用解构赋值方式
    // 在js中如果属性名和属性值是同样的变量名，可以省略一个
	allP.then(([goodsData, goodsTypeData]) => {
		res.render('./admingoods/index', {
			goodsData,
			goodsTypeData
		})
	})
	.catch(err => {
		console.log(err);
	})
});

router.get('/add', (req, res) => {
	GoodsType.find()
		.then(data => {
			console.log(data);
			res.render('admin/goods/add', { data })
		})
		.catch(err => {
			console.log(err);
		})
});

router.post('/add', (req, res) => {
	var model = new Goods(req.body);
	model.save()
		.then(data => {
			console.log(data);
			res.redirect('/admin/goods');
		})
		.catch(err => {
			console.log(err);
			res.send(err);
		})
});

module.exports = router;
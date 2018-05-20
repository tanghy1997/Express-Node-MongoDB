const express = require('express');
const router = express.Router();

const Col = require('../../models/col');

router.get('/', (req, res) => {
	Col.find()
		.then(data => {
			res.render('admin/col/index', { list: data })
		});
});

router.get('/add', (req, res)=> {
	res.render('admin/col/add')
});

router.post('/add', (req, res) => {
	var model = new Col(req.body);
	model.save()
		.then(data => {
			console.log(data);
			res.redirect('/admin/cols');
		})
		.catch(err => {
			console.log(err);
			res.send(err);
		})
});

module.exports = router;
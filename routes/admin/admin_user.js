const express = require('express');
const router = express.Router();
const AdminUser = require('../../models/admin_user');
const untils = require('../../tools/utils');

router.get('/register', (req, res) =>{
	const adminData = AdminUser.find();
	adminData.then(
		res.render('admin/user/register', adminData)
	)
});

router.get('/', (req,vres) => {
	const adminData = AdminUser.find();
	adminData.then( data => {
		res.render('admin/user/index', { adminData: data })
	})
});

router.post('register', (req, res) => {
	const model = new AdminUser(req.body);
	if(model.name.trim() == '') {
		res.send('用户名不能为空！');
		return;
	}
	if (model.user_name.trim() == '') {
        res.send('昵称不能为空');
        return;
    }
    if (model.user_pwd.trim() == '') {
        res.send('密码不能为空');
        return;
    }
    if (model.email.trim() == '') {
        res.send('邮箱不能为空');
        return;
	}
	
	AdminUser.validateUserName(model, function(isok) {
		if(isok) {
			model.user_pwd = untils.md5(req.body.user_pwd)
			model.save()
				.then(data => {
					console.log(data);
					res.redirect('/admin/user');
				})
				.catch(err => {
					console.log(err);
					res.send(err);
				})
		}
	})
})

module.exports = router;
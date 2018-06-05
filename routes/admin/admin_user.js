var express = require('express');
var router = express.Router();
var AdminUser = require('../../models/admin_user');
var utils = require('../../tools/utils');

router.get('/register', (req, res) => {
    // const adminData = AdminUser.find();
    // adminData.then(
    //     res.render('admin/user/register', adminData)
    // )

    // let model = new AdminUser()
    // model.save()
    //     .then(data => {
    //         res.render('admin/user/register', {
    //             model: data,
    //             isEditor: false
    //         })
    //     })

    let model = new AdminUser()
        //这里不能用save方法，因为会保存空数据
    res.render('admin/user/register', {
        model,
        isEditor: false
    })
});
router.get('/', (req, res) => {
    let page = 1; // 当前页码
    if (req.query.page) {
        page = Number(req.query.page);
    }
    const queryCount = AdminUser.count();
    const queryData = AdminUser.find() // 数据查找
        .limit(global.pageSize).skip((page - 1) * global.pageSize);
    const pAll = Promise.all([queryCount, queryData])
    pAll.then(([allCount, data]) => {
        const pageCount = Math.ceil(allCount / global.pageSize); // 总页数
        // console.log(pageCount);
        const arrPages = utils.getPagesArr(page, pageCount); // 总页数
        res.render('admin/user/index', {
            list: data,
            pages: arrPages, //页面中显示的分页页码
            pageCount, //总页数
            pageIndex: page, //当前页码
        });
    })
})

router.post('/register', (req, res) => {
    const model = new AdminUser(req.body);
    if (model.name.trim() == '') {
        res.send('用户名不能为空');
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
        if (isok) {
            model.user_pwd = utils.md5(req.body.user_pwd)
            model.save()
                .then(data => {
                    console.log(data);
                    // res.send('保存成功')
                    res.redirect('/admin/user'); // 页面重定向
                })
                .catch(err => {
                    console.log(err);
                    res.send(err);
                })
        }
    })
})

router.post('/delete', (req, res) => {
    if (req.body.id) {
        AdminUser.findByIdAndRemove(req.body.id)
            .then(data => {
                res.redirect('/admin/user')
            })
            .catch(err => {
                res.json({
                    status: 'n',
                    msg: '删除错误'
                })
            })
    }
})

router.get('/editor', (req, res) => {
    if (req.query.id) {
        AdminUser.findById(req.query.id)
            .then(model => {
                res.render('admin/user/register', { model, isEditor: true });
            })
            .catch(err => {
                res.send(err);
            })
    }
})
router.post('/editor/:id', (req, res) => {
    AdminUser.findByIdAndUpdate(req.params.id, req.body)
        .then(data => {
            res.redirect('/admin/user');
        })
        .catch(err => {
            res.send(err);
        })
})
module.exports = router;
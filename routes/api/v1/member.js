const express = require('express');
const router = express.Router();

const utils = require('../../../tools/utils');
const Member = require('../../../models/member');


router.get('/', (req, res) => {
    let page = 1;
    console.log(req.query)
    if (req.query.page) {
        page = Number(req.query.page);
    }
    const queryCount = Member.count();
    const queryData = Member.find()
        .limit(global.pageSize).skip((page - 1) * global.pageSize);
    const pAll = Promise.all([queryCount, queryData])
    pAll.then(([allCount, data]) => {
        const pageCount = Math.ceil(allCount / global.pageSize);
        const arrPages = utils.getPagesArr(page, pageCount);
        res.render('admin/member/index', {
            list: data,
            pages: arrPages,
            pageCount,
            pageIndex: page,
        })
    })
});
router.get('/add', (req, res) => {
    let model = new Member();
    res.render('admin/member/add', {
        model,
        isEditor: false
    });
});
router.post('/add', (req, res) => {
    var model = new Member(req.body);
    if (model.username.trim() == '') {
        res.send('用户名不能为空');
        return;
    }
    console.log(model)
    if (model.mobile.trim() == '') {
        res.send('手机号不能为空');
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
    Member.validateUserName(model, function(isok) {
        if (isok) {
            model.user_pwd = utils.md5(req.body.user_pwd);
            model.save()
                .then(data => {
                    console.log(data);
                    res.redirect('/api/v1/members');
                })
                .catch(err => {
                    console.log(err);
                    res.send(err);
                })
        }
    })
});
router.post('/delete', (req, res) => {
    if (req.body.id) {
        Member.findByIdAndRemove(req.body.id)
            .then(data => {
                res.redirect('/api/v1/members');
            })
            .catch(err => {
                res.send('请选择要删除的id');
            })
    }
})

router.get('/editor', (req, res) => {
    if (req.query.id) {
        Member.findById(req.query.id)
            .then(model => {
                res.render('admin/member/add', { model, isEditor: true })
            })
            .catch(err => {
                res.send(err);
            })
    }
})
router.post('/editor/:id', (req, res) => {
    Member.findByIdAndUpdate(req.params.id, req.body)

    .then(data => {
            res.redirect('/api/v1/members');
        })
        .catch(err => {
            res.send(err);
        })
})
module.exports = router;
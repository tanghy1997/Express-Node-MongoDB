const express = require('express');
const router = express.Router();

const memberAddress = require('../../../models/member_address');

//:id用parmas解析的必须要用：
router.get('/list/:id', (req, res) => {
    const queryData = memberAddress.find({ m_id: req.params.id }).sort({ _id: -1 }) //倒序
    queryData
        .then(data => {
            res.render('admin/memberAddress/index', {
                list: data,
                m_id: req.params.id
            });
        })
        .catch(err => {
            console.log(err);
        })
})
router.get('/add/:m_id', (req, res) => {
    const model = new memberAddress();
    let p = '';
    let c = '';
    let a = '';
    res.render('admin/memberAddress/add', {
        model,
        isEditor: false,
        p,
        c,
        a
    });
});
router.post('/add/:m_id', (req, res) => {
    var model = new memberAddress({
        m_id: req.params.m_id,
        address: req.body.Province + '-' + req.body.City + '-' + req.body.Area,
        address_detail: req.body.address_detail,
        is_default: req.body.is_default
    });
    model.save()
        .then(data => {
            console.log(data);
            res.redirect('/api/v1/memberAddress/list/' + req.params.m_id);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

router.post('/delete', (req, res) => {
    if (req.body.id) {
        memberAddress.findByIdAndRemove(req.body.id)
            .then(data => {
                console.log(data);
                res.redirect('/api/v1/memberAddress/list/' + data.m_id)
            })
    } else {
        res.send('请选择要删除的id');
    };
});
router.get('/editor', (req, res) => {
    const queryData = memberAddress.findById(req.query.id);
    queryData.then(model => {
            let p = '';
            let c = '';
            let a = '';
            try {
                p = model.address.split('-')[0]
                c = model.address.split('-')[1]
                a = model.address.split('-')[2]
            } catch (err) {}
            res.render('admin/memberAddress/add', {
                model,
                isEditor: true,
                p,
                c,
                a
            });
        })
        .catch(err => {
            res.send(err);
        })
})
router.post('/editor/:id', (req, res) => {
    var reqData = {
        address: req.body.Province + '-' + req.body.City + '-' + req.body.Area,
        address_detail: req.body.address_detail,
        is_default: req.body.is_default
    };
    memberAddress.findByIdAndUpdate(req.params.id, reqData)
        .then(data => {
            res.redirect('/api/v1/memberAddress/list/' + data.m_id)
        })
        .catch(err => {
            res.send(err);
        })
});

module.exports = router;
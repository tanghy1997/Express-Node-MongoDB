const express = require('express');
const router = express.Router();

const Member = require('../../../models/member')
const AdminUser = require('../../../models/admin_user')
    // 验证用户名是否存在
router.get('/admin_user_name', (req, res) => {
    //只查询数量count
    AdminUser.count({ user_name: req.query.user_name })
        .then(c => {
            if (c > 0) {
                res.send(false);
            } else {
                res.send(true);
            }
        })
})
router.get('/member_user_name', (req, res) => {
    console.log('11111')
    Member.count({ username: req.query.username })
        .then(c => {
            if (c > 0) {
                res.send(false);
            } else {
                res.send(true);
            }
        })
})

router.get('/member_email', (req, res) => {
    Member.count({ email: req.query.email })
        .then(c => {
            if (c > 0) {
                res.send(false);
            } else {
                res.send(true);
            }
        })
})

router.get('/member_mobile', (req, res) => {
    Member.count({ mobile: req.query.mobile })
        .then(c => {
            if (c > 0) {
                res.send(false);
            } else {
                res.send(true);
            }
        })
})



// router.get('/admin_user_name', (req, res) => {
//     console.log(req.query);
//     res.send(false);
// })

module.exports = router;
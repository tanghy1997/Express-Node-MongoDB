const express = require('express');
const router = express.Router();

// 管理后台入口界面
router.get('/', (req, res) => {
    res.render('admin/main')
})


module.exports = router;
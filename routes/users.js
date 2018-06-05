var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Col = require('../models/col');
var Row = require('../models/row');

/* GET users listing. */
router.get('/', function(req, res, next) {
    const rowData = Row.find();
    const colData = Col.find();
    const userData = User.find();
    const allP = Promise.all([rowData, colData, userData]);
    // then后面的数据名和下面的要一致
    allP.then(([rowList, colList, users]) => {
            res.render('user/index', {
                rowList,
                colList,
                users
            })
        })
        // res.send('respond with a resource');

});

/**
 * 用户注册
 */

router.get('/reg', (req, res) => {
    // 方法一
    // Row.find()
    //     .then(rowList => {
    //         Col.find()
    //             .then(colList => {
    //                 res.render('user/reg', {
    //                     rowList: rowList,
    //                     colList: colList
    //                 })
    //             })
    //     })

    // 方法二
    // 在mongoose中find（）返回一个Promise对象
    // 通过调用then返回成功之后的回调函数
    // Promise.all组装一个Promise对象组成的数组
    // 当数组中所有的对象执行成功之后调用then方法
    // then中以数组的形式接受每一个对象成功之后的返回值
    // const rowDate = Row.find();
    // const colDate = Col.find();
    // rowDate.then(rowList => {
    //     colDate.then(colList => {
    //         res.render('user/reg', {
    //             rowList: rowList,
    //             colList: colList
    //         })
    //     })
    // })

    // 方法三
    // const rowData = Row.find();
    // const colData = Col.find();
    // const allP = Promise.all([rowData, colData]);
    // allP.then(allData => {
    //     console.log(allDate);
    //     res.render('user/reg', {
    //         rowList: allData[0],
    //         colList: allData[1]
    //     })
    // })

    // 方法四
    const rowData = Row.find();
    const colData = Col.find();
    const allP = Promise.all([rowData, colData]);
    // 此处使用解构赋值方式
    // 在js中如果属性名和属性值是同样的变量名，可以省略一个
    allP.then(([rowList, colList]) => {
            res.render('user/reg', {
                rowList,
                colList
            })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/reg', (req, res) => {
    const model = new User(req.body);
    // count统计数量
    User.count({
        row_id: req.body.row_id,
        col_id: req.body.col_id
    }).then(c => {
        console.log(c)
        if (c > 0) {
            res.send('此位置已经有人了');
        } else {
            // res.send('此位置可以坐')
            model.save()
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.send(err);
                })
        }
    })

})


module.exports = router;
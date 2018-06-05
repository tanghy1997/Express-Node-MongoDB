const express = require('express');
const router = express.Router();

var utils = require('../../tools/utils');
const Goods = require('../../models/goods');
const GoodType = require('../../models/goods_type')
router.get('/', (req, res) => {
    // const goodsData = Goods.find();
    // const goodsTypeData = GoodType.find();
    // const allP = Promise.all([goodsData, goodsTypeData]);
    // // 此处使用解构赋值方式
    // // 在js中如果属性名和属性值是同样的变量名，可以省略一个
    // allP.then(([goodsData, goodsTypeData]) => {

    //         res.render('./admin/goods/index', {
    //             goodsData,
    //             goodsTypeData
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

    let page = 1;
    if (req.query.page) {
        page = Number(req.query.page);
    }
    const queryCount = Goods.count();
    const goodsTypeData = GoodType.find();
    const queryData = Goods.find()
        .limit(global.pageSize).skip((page - 1) * global.pageSize);
    const pAll = Promise.all([queryCount, queryData, goodsTypeData])
    pAll.then(([allCount, data, goodsTypeData]) => {
        const pageCount = Math.ceil(allCount / global.pageSize);
        const arrPages = utils.getPagesArr(page, pageCount);
        res.render('admin/goods/index', {
            list: data,
            pages: arrPages,
            pageCount,
            pageIndex: page,
            goodsTypeData
        })
    })

});

router.post('/delete', (req, res) => {
    if (req.body.id) {
        Goods.findByIdAndRemove(req.body.id)
            .then(data => {
                res.redirect('/admin/goods')
            })
            .catch(err => {
                res.send('请选择要删除的id')
            })
    }
})

router.get('/add', (req, res) => {
    GoodType.find()
        .then(data => {
            console.log(data)
            res.render('admin/goods/add', { data })
        })
        .catch(err => {
            console.log(err)
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

router.get('/editor', (req, res) => {
    if (req.query.id) {
        Goods.findById(req.query.id)
            .then(model => {
                console.log(model)
                var id = model.goods_type;
                console.log(id)
                GoodType.find({ _id: id })
                    //因为此处需要查两个数据库用find查到的是数组后面页面渲染forEach
                    //循环需要数组，而findById找到的是对象循环不了
                    .then(goodsType => {
                        console.log(goodsType);
                        res.render('admin/goods/editor', {
                            model,
                            goodsType
                        })
                    })
                    .catch(err => [
                        console.log(err)
                    ])

            }).catch(err => {
                res.send(err);
            })
    }
})

router.post('/editor/:id', (req, res) => {
    Goods.findByIdAndUpdate(req.params.id, req.body)
        .then(data => {
            res.redirect('/admin/goods');
        })
        .catch(err => {
            res.send(err);
        })
});

module.exports = router;
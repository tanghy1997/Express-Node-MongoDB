// console.log('我是操作数据库的文件！')
/*
 *mongoose是一个node.js链接mongodb的orm
 *orm对象模型关系映射，把一个对象映射到数据库中的表（集合）上
 *在mongoose中会自动在数据库空生成对象的复数形式对位对象的存储表（集合）
 */
const mongoose = require('mongoose'); //引入mongoose插件
mongoose.Promise = global.Promise; //在node.js中使用内置的promise对象
const Schema = mongoose.Schema; //Schema模块架构
mongoose.connect('mongodb://localhost/super_shop', err => {
    if (err) {
        console.log(err);
        console.log('数据库链接失败...')
    } else {
        console.log('数据库链接成功')
    }
});

module.exports = {
    mongoose: mongoose,
    Schema: Schema
}

// const goodsTypeSchema = new Schema({
//     name: {
//         type: String,
//         default: ''
//     },
//     description: {
//         type: String,
//         default: ''
//     },
//     created_at: {
//         type: Date,
//         dafault: Date.now
//     },
//     updated_at: {
//         type: Date,
//         default: Date.now
//     }
// });

// // 商品分类模型
// const GoodsType = mongoose.model('goods_type', goodsTypeSchema);

// const goodsSchema = new Schema({
//     name: {
//         type: String,
//         default: ''
//     },
//     price: {
//         type: Number,
//         default: 0
//     },
//     description: {
//         type: String,
//         default: ''
//     },
//     store_count: {
//         type: Number,
//         default: 0
//     },
//     content: {
//         type: String,
//         default: ''
//     },
//     goods_type: {
//         type: Schema.Types.ObjectId, //分类id
//         ref: 'goods_type' //关联的模型,在
//     }
// });
// // const Goods = mongoose.model('goods', goodsSchema);
// goodsSchema.statics.findByName = function(name, cb) {
//     this.find({ name: name }).then(data => {
//             cb(data)
//         })
//         .catch(err => {
//             console.log(err)
//             cb({})
//         })
// }
// const Goods = mongoose.model('goods', goodsSchema);
// Goods.findByName('iphone-8', function(r) {
//     console.log(r);
// })

// // 通过populated实现相关联查询
// // Goods.find({}).populate('goods_type')
// //     .then(res => {
// //         console.log(res)
// //     })
// //     .catch(err => {
// //         console.log(res)
// //     })
// const goods = new Goods({
//         name: 'iphone-8',
//         price: 5999,
//         description: '又要用肾了',
//         goods_type: '59b753a90cea502114e46609'
//     })
//     //在mongoose中使用promise方式获取数据
//     // 成功执行then，失败执行catch
// goods.save()
//     .then(res => {
//         console.log(res)
//     }).catch(err => {
//         console.log(err)
//     })


// // const type = new GoodsType({
// //     name: '3c产品',
// //     description: '智能3c产品，手机、电脑、游戏主机、周边设备'
// // })

// // type.save(function(err) {
// //     if (err) {
// //         console.log(err)
// //     } else {
// //         console.log('保存成功')
// //     }
// // })
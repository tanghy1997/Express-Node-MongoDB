// console.log('我是操作数据库的文件！')
/*
 *mongoose是一个node.js链接mongodb的orm
 *orm对象模型关系映射，把一个对象映射到数据库中的表（集合）上
 *在mongoose中会自动在数据库空生成对象的复数形式对位对象的存储表（集合）
 */
const mongoose = require('mongoose'); //引入mongoose插件
mongoose.Promise = global.Promise; //在node.js中使用内置的promise对象
const Schema = mongoose.Schema; //Schema模块架构
mongoose.connect('mongodb://localhost/super_shop');

module.exports = {
	mongoose: mongoose,
	Schema: Schema
}
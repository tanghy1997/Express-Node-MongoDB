const express = require('express');
const router = express.Router();

// 处理文件上传
const formidable = require('formidable');
router.post('/kindeditor/uploadImg', (req, res) => {
	var form = new formidable.IncomingForm();

	form.uploadDir = global.baseDir + '/public/uploads'; //图片保存的路径
	form.keepExtensions = true; //保存文件后缀
	// 格式化requset请求数据
	form.parse(req, function(err, fields, files) {
		if (err) {
			throw err
		}
		// console.log(files);
		const image = files.imgFile; //获取图片信息
		// 获取图片保存路劲web地址
		var fileUrl = image.path.replace(global.baseDir + '\\public', '');
		// 正则表达式
		fileUrl = fileUrl.replace(/\\/g, '/')
		// 两种方法都一样，用cmd终端时候必须加下面两句正则表达式，bash则都可以
		// var filePath = image.path.replace(/\\/g,'/')//路劲正则替换
		// var reGB = global.baseDir.replace(/\\/g,'/')//路径正则替换
		// const fileUrl = filePath.replace(global.baseDir+'/public','');
		console.log(fileUrl);
		res.json({
			error: 0,
			url: fileUrl
		})
	})
})

module.exports = router;
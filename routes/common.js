const express = require('express');
const router = express.Router();

//文件上传
const formidable = require(formidable);
router.post('/kindeditor/uploadImg', (req,res) => {
	var form = new formidable.IncomingForm();
	form.uploadDir = global.baseDir + '/public/upload';//图片保存路径
	form.keepExtensions = true; //保存文件后缀
	// 格式化requset请求数据
	form.parse(req, function(err, fields, filrs) {
		if(err) {
			throw  err;
		}

		const image = files.imgFile;//获取图片信息
		// 获取图片保存路劲web地址
		var fileUrl = image.path.replace(global.baseDir + '\\public', '')
		// 正则表达式
		fileUrl = fileUrl.replace(/\\/g, '/')
		console.log(fileUrl);
		res.json({
			error: 0,
			url: fileUrl
		})
	})
});

module.exports = router;
// 加密模块
const crypto = require('crypto');

var utils = {};

function md5(str) {
	const md5 = crypto.createHash('md5');
	return md5.update(str).digest('hex').toString();
}

module.exports = { md5 };
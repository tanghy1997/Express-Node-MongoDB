const db = require('../db');
const mongoose = db.mongoose;
const Schema = db.Schema;
const adminUserSchema = new Schema({
	user_name: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		default: ''
	},
	qq: {
		type: String,
		default: ''
	},
	user_pwd: {
		type: String,
		default: ''
	},
	is_encryption: {
		type: Number,
		default: ''
	},
	email: {
		type: String,
		default: ''
	},
	phone: {
		type: Number,
		default: ''
	}
});

// $or'或'查找，多个条件满足一个即可
adminUserSchema.statics.validateUserName = function(model, cb) {
	this.count({ $or: [{ user_name: model.user_name }, { email: model.email } ] })
		.then(c => {
			if(c > 0) {
				cb(false)
			} else {
				cb(true)
			}
		})
};

const AdminUser = mongoose.model('admin_user', adminUserSchema);
module.exports = AdminUser;
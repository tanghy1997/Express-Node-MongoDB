// 列信息
const db = required('../db');
const mongoose = db.mongoose;
const Schema = db.Schema;
const colSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	deacription: {
		type: String,
		default: ''
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
});

const Col = mongoose.model('col', colSchema);
module.exports = Col;
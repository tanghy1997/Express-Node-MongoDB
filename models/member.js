/*
username    用户名
email       邮箱
mobile      手机号
name        名字
nick_name   昵称
user_pwd    密码
is_encryption 是否加密（默认加密）
img         头像
用户默认可以使用用户名，邮箱，手机号登陆
所有三者不能重复
*/
const db = require('../db');
const Schema = db.Schema;
const mongoose = db.mongoose;

const membersSchema = new Schema({
    username: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    mobile: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    nick_name: {
        type: String,
        default: ''
    },
    user_pwd: {
        type: String,
        default: ''
    },
    is_encryption: {
        type: Number,
        default: 1
    },
    img: {
        type: String,
        default: ''
    }
})

// $or'或'查找，多个条件满足一个即可
membersSchema.statics.validateUserName = function(model, cb) {
    this.count({ $or: [{ username: model.username }, { email: model.email }, { mobile: model.mobile }] })
        .then(c => {
            if (c > 0) {
                cb(false)
            } else {
                cb(true)
            }
        })
}

const Members = mongoose.model('members', membersSchema);

module.exports = Members;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 使用 module.exports 导出 User 模块
module.exports = mongoose.model('Blog', new Schema({
    title: String,
    body: String,
    author: String,
    category: String,
    comments: [{ body: String, date: Date }],
    tags: [{ title: String }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
}));
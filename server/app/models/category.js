var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 使用 module.exports 导出 User 模块
module.exports = mongoose.model('categorys', new Schema({
    title: String,
}));
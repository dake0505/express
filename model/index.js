/**
 * 数据持久层
 */
const mongoose = require("mongoose");

// 连接 mongodb 数据库
mongoose.connect("mongodb://localhost:27017/test");

const db = mongoose.connection;

// 连接失败
db.on('error', err => {
  console.log('Mongo DB 连接失败', err)
});
// 连接成功
db.once('open', function() {
  console.log('Mongo DB 数据库连接成功')
});

// 组织模型类
module.exports = {
  User: mongoose.model('User', require('./user')),
  Resource: mongoose.model('Resource', require('./resource')),
  SignIn: mongoose.model('SignIn', require('./signIn')),
  Warehouse: mongoose.model('Warehouse', require('./warehouse')),
  Order: mongoose.model('Order', require('./order'))
}

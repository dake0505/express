/**
 * user相关的数据模型
 */
const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const md5 = require('../util/md5')


const userSchema = new mongoose.Schema({
  ...baseModel,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: value => md5(value),
    select: false
  },
  bio: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  score: {
    type: Number,
    default: 0
  },
  lastSignIn: {
    type: Date
  }
})

module.exports = userSchema 
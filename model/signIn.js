/**
 * 签到相关的数据模型
 */
const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const signInSchema = new mongoose.Schema({
  ...baseModel,
  current: {
    type: Number,
    required: true
  }
})

module.exports = signInSchema
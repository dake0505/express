const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const Schema = mongoose.Schema

const orderSchema = new mongoose.Schema({
  ...baseModel,
  totalPrice: {
    type: Number,
    required: true
  },
  goods: [{
    type: Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true
  }],
  status: {
    type: Number,
    enum: [0, 1, 2, 3, 4] // 0-用户提交；1-商家接单；2-派送中；3-已完成；4-已取消
  }
})

module.exports = orderSchema
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
  }]
})
const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const warehouseSchema = mongoose.Schema({
  ...baseModel,
  commodityName: {
    type: String,
    required: true
  },
  commodityDisplayName: {
    type: String,
    require: false
  },
  commodityDesc: {
    type: String
  },
  commodityPrice: {
    type: Number
  },
  commodityCount: {
    type: Number,
    required: true
  },
  commoditySale: {
    type: Number
  },
  isValid: {
    type: Boolean
  }
})

module.exports = warehouseSchema
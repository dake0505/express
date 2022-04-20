const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const Schema = mongoose.Schema

const resourceSchema = new mongoose.Schema({
  ...baseModel,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: false
  },
  tagList: {
    type: [String],
    default: null
  },
  favoriteCount: {
    type: Number,
    default: 0
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = resourceSchema
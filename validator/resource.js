const validate = require('../middleware/validate')
const { body, param } = require('express-validator')
const mongoose = require('mongoose')
const { Resource } = require('../model')

exports.createResource = validate([
  body('title')
    .notEmpty()
    .withMessage('标题不能为空')
])

exports.getResource = validate([
  param('resourceId').custom(value => {
    if (!mongoose.isValidObjectId(value)) {
      // 非异步操作不能使用reject
      // return Promise.reject('文章ID类型错误')
      throw new Error('文章ID类型错误')
    }
    // 同步成功，返回true
    return true
  })
])

exports.updateResource = [
  // 判断ID是否存在
  validate([
    validate.isValidObjectId(['params'], 'resourceId')  
  ]),
  // 判断ID是否在resource中存在
  async (req, res, next) => {
    const resourceId = req.params.resourceId
    const resource = await Resource.findById(resourceId)
    if (!resource) {
      return res.status(404).end()
    }
    // 将查询出的resouce 添加到req上，便于后续中间件调用
    req.resource = resource
    next()
  },
  // 判断资源author与当前author是否一致
  async (req, res, next) => {
    // 注意：req.user._id为ObjectId类型，两侧进行toString转换
    if (req.user._id.toString() !== req.resource.author.toString()) {
      return res.status(403).end()
    }
    next()
  }
]

exports.deleteResource = exports.updateResource
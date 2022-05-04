const { Order } = require('../model')
const BaseRes = require('../util/baseRes')

exports.createOrder = async(req, res, next) => {
  try {
    res.status(200).json(BaseRes.success('create order'))
  } catch (error) {
    next(error)
  }
}

exports.updateOrder = async(req, res, next) => {
  try {
    res.status(200).json(BaseRes.success('update order'))
  } catch (error) {
    next(error)
  }
}

exports.deleteOrder = async(req, res, next) => {
  try {
    res.status(200).json(BaseRes.success('delete order'))
  } catch (error) {
    next(error)
  }
}

exports.queryOrder = async(req, res, next) => {
  try {
    res.status(200).json(BaseRes.success('query order'))
  } catch (error) {
    next(error)
  }
}
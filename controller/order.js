const { Order } = require('../model')
const BaseRes = require('../util/baseRes')

exports.createOrder = async(req, res, next) => {
  try {
    const order = new Order(req.body)
    order.createdBy = req.user.email
    order.createdAt = new Date()
    await order.save()
    res.status(200).json(BaseRes.success(order))
  } catch (error) {
    next(error)
  }
}

exports.updateOrder = async(req, res, next) => {
  try {
    const order = new Order(req.body)
    order.updatedBy = req.user.email
    order.updatedAt = new Date()
    const updateItem = await Order.findByIdAndUpdate(
      req.body._id,
      {$set: {...order}}
    )
    res.status(200).json(BaseRes.success(updateItem))
  } catch (error) {
    next(error)
  }
}

exports.deleteOrder = async(req, res, next) => {
  try {
    const deleteItem = await Order.findByIdAndDelete(req.query.id)
    if (deleteItem) {
      res.status(200).json(BaseRes.success('删除成功'))
    } else {
      res.status(200).json(BaseRes.fail('商品不存在'))
    }
  } catch (error) {
    next(error)
  }
}

exports.queryOrder = async(req, res, next) => {
  try {
    const { pageNumber = 1, pageSize = 10} = req.query
    const limit = pageSize
    const offset = (pageNumber - 1) * pageSize
    const filter = {
      email: req.user.email
    }
    const orderList = await Order
      .find(filter)
      .skip(offset)
      .limit(limit)
    const count = await Warehouse.countDocuments({createdBy: req.user.email})
    res.status(200).json(BaseRes.success({
      list: orderList,
      count
    }))
  } catch (error) {
    next(error)
  }
}
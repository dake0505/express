const { Warehouse } = require('../model')
const BaseRes = require('../util/baseRes')

// 仓库商品列表
exports.queryWarehouseCommodityList = async (req, res, next) => {
  try {
    const { pageNumber = 1, pageSize = 10 } = req.query
    const limit = pageSize
    const offset = (pageNumber - 1) * pageSize
    const filter = {
      email: req.user.email
    }
    const commodityList = await Warehouse
      .find(filter)
      .skip(offset)
      .limit(limit)
    const count = await Warehouse.countDocuments()
    res.status(200).json(BaseRes.success({
      list: commodityList,
      count
    }))
  } catch (error) {
    next(error)
  }
}

// 创建仓库商品
exports.createWarehouseCommodity = async (req, res, next) => {
  try {
    const commodity = new Warehouse(req.body)
    commodity.createdBy = req.user.email
    commodity.createAt = new Date()
    await commodity.save()
    res.status(200).json(BaseRes.success(commodity))
  } catch (error) {
    next(error)
  }
}

// 修改仓库商品信息
exports.updateWarehouseCommodity = async (req, res, next) => {
  try {
    const commodity = new Warehouse(req.body)
    commodity.updatedBy = req.user.email
    commodity.updateAt = new Date()
    const updateItem = await Warehouse.findByIdAndUpdate(
      req.body._id,
      {$set: { ...commodity }}
    )
    console.log(updateItem)
    res.status(200).json(BaseRes.success(updateItem))
  } catch (error) {
    next(error)
  }
}

// 删除仓库商品
exports.deleteWarehouseCommodity = async (req, res, next) => {
  try {
    const deleteItem = await Warehouse.findByIdAndDelete(req.query.id)
    if (deleteItem) {
      res.status(200).json(BaseRes.success('删除成功'))
    } else {
      res.status(200).json(BaseRes.fail('商品不存在'))
    }
  } catch (error) {
    next(error)
  }
}
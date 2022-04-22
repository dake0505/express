const { Warehouse } = require('../model')
const BaseRes = require('../util/baseRes')

// 仓库商品列表
exports.queryWarehouseCommodityList = async (req, res, next) => {
  try {
    const { limit = 20, offset = 0 } = req.query
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
    await commodity.save()
    res.status(200).json(BaseRes.success(commodity))
  } catch (error) {
    next(error)
  }
}

// 修改仓库商品信息
exports.updateWarehouseCommodity = async (req, res, next) => {
  try {
    res.status(200).json(BaseRes.success('修改商品'))
  } catch (error) {
    next(error)
  }
}

// 删除仓库商品
exports.deleteWarehouseCommodity = async (req, res, next) => {
  try {
    res.status(200).json(BaseRes.success('删除商品'))
  } catch (error) {
    next(error)
  }
}
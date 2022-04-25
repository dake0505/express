const { Warehouse } = require('../model')
const BaseRes = require('../util/baseRes')

exports.getShopCommodityList = async (req, res, next) => {
  try {
    const { pageNumber = 1, pageSize = 10 } = req.query
    const limit = pageSize
    const offset = (pageNumber - 1) * pageSize
    const filter = {
      isValid: true
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
const express = require('express')
const auth = require('../middleware/auth')
const warehouseCtrl = require('../controller/warehouse')

const router = express.Router()

// 仓库商品列表
router.get(
  '/warehouse/commodity-list',
  auth,
  warehouseCtrl.queryWarehouseCommodityList
)

// 新增商品
router.post(
  '/warehouse/commodity',
  auth,
  warehouseCtrl.createWarehouseCommodity
)

// 修改商品信息
router.put(
  '/warehouse/commodity',
  auth,
  warehouseCtrl.updateWarehouseCommodity
)

// 删除商品
router.delete(
  '/warehouse/commodity',
  auth,
  warehouseCtrl.deleteWarehouseCommodity
)

module.exports = router
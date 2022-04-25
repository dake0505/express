const express = require('express')
const auth = require('../middleware/auth')
const shopCtrl = require('../controller/shop')


const router = express.Router()

router.get(
  '/shop/commodity-list',
  auth,
  shopCtrl.getShopCommodityList
)


module.exports = router
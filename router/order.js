const express = require('express')
const auth = require('../middleware/auth')
const orderCtrl = require('../controller/order')

const router = express.Router()

router.get(
  '/order/list',
  auth,
  orderCtrl.queryOrder
)

router.post(
  '/order',
  auth,
  orderCtrl.createOrder
)
router.put(
  '/order',
  auth,
  orderCtrl.updateOrder
)
router.delete(
  '/order',
  auth,
  orderCtrl.deleteOrder
)

module.exports = router
/**
 * 用于配置URL路由
 */
const express = require('express')
const router = express.Router()

// 用户相关路由
router.use(require('./user'))
// 用户资料相关路由
router.use('/profiles', require('./profile'))
// 资源相关路由
router.use(require('./resource'))
// 仓库
router.use(require('./warehouse'))

router.get('/', (req, res) => {
  res.send('Hello World')
})

module.exports = router
/**
 * 用户相关路由
 */
const express = require('express')
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')
const auth = require('../middleware/auth')

const router = express.Router()

// 登录
router.post(
  '/user/login',
  userValidator.login,
  userCtrl.login
)

// 注册
router.post(
  '/user',
  userValidator.register,
  // 通过验证，执行具体函数
  userCtrl.register
)

// 获取当前登录用户
router.get(
  '/user/info',
  auth,
  userCtrl.gerCurrentUser
)

// 更新当前登录用户
router.put('/user', auth, userCtrl.updateCurrentUser)

// 获取用户列表
router.get('/user-list', userCtrl.getUserList)

// 删除用户
router.delete('/user', userCtrl.deleteUser)

// 签到功能
router.get(
  '/user/sign-in',
  auth,
  userCtrl.signIn
)

// 签到记录
router.get(
  '/user/sign-in-list',
  auth,
  userCtrl.getSignInList
)


module.exports = router
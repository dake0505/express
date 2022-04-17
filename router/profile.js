/**
 * 用户相关路由
 */
 const express = require('express')
 const router = express.Router()
 
 // 获取用户资料
 router.get('/:username', (req, res, next) => {
   try {
     res.send('get /profiles/:username')
   } catch (error) {
     next(error)
   }
 })
 
 // 关注用户
 router.post('/:username/follow', (req, res, next) => {
  try {
    res.send('post /profiles/:username/follow')
  } catch (error) {
    next(error)
  }
})
 

 // 取消关注
 router.delete('/:username/follow', (req, res, next) => {
  try {
    res.send('delete /profiles/:username/follow')
  } catch (error) {
    next(error)
  }
})
 
 module.exports = router
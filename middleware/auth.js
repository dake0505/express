const { verify } = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const { User } = require('../model')

module.exports = async (req, res, next) => {
  // 获取请求头数据
  let token = req.headers['authorization']
  token = token
    ? token.split('Bearer ')[1]
    : null
  if (!token) {
    return res.status(401).end()
  }
  // 验证token
  // verify返回promise，因此要用trycatch
  try {
    const decodedToken = await verify(token, jwtSecret)
    req.user = await User.findById(decodedToken.userId)
    console.log(req.user)
    next()
  } catch (error) {
    return res.status(401).end()
  }
  // 无效返回401

  // 有效
}
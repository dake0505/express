const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')

// 用户注册
exports.register = async (req, res, next) => {
  try {
    console.log(req.body)
    let user = new User(req.body) // user 为mongoose对象
    await user.save()
    // delete user.password 无法删除属性
    user = user.toJSON() // 调用toJSON，转化为普通js对象，删除password属性
    delete user.password
    res.status(201).json({
      user
    })
  } catch (error) {
    next(error)
  }
}

// 用户登录
exports.login = async (req, res, next) => {
  try {
    const user = req.user.toJSON()
    const token = await jwt.sign({
      userId: user._id
    }, jwtSecret, {
      expiresIn: 60*60*24
    })
    delete user.password
    res.status(200).json({
      ...user,
      token
    })
  } catch (error) {
    next(error)
  }
}

// 获取当前用户信息
exports.gerCurrentUser = async (req, res, next) => {
  try {
    // console.log(req.headers) // 获取请求头
    // res.send('get /user')
    res.status(200).json({
      user: req.user
    })
  } catch (error) {
    next(error)
  }
}

// 更新当前登录用户
exports.uodateCurrentUser = async (req, res, next) => {
  try {
    res.send('put /user')
  } catch (error) {
    next(error)
  }
}

exports.getUserList = async (req, res, next) => {
  try {
    // res.send('user list')
    const { limit = 20, offset = 0 } = req.query
    const userList = await User.find().skip(offset).limit(limit)
    const count = await User.countDocuments()
    res.status(200).json({
      userList,
      count
    })
  } catch (error) {
    next(error)
  }
}
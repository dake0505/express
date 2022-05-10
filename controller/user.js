const { User, SignIn } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const BaseRes = require('../util/baseRes')
const moment = require('moment')

// 用户注册
exports.register = async (req, res, next) => {
  try {
    console.log(req.body)
    let user = new User(req.body) // user 为mongoose对象
    await user.save()
    // delete user.password 无法删除属性
    user = user.toJSON() // 调用toJSON，转化为普通js对象，删除password属性
    delete user.password
    res.status(201).json(
      BaseRes.success(user)
    )
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
    res.status(200).json(
      BaseRes.success({
      ...user,
      token
    }))
  } catch (error) {
    next(error)
  }
}

// 获取当前用户信息
exports.gerCurrentUser = async (req, res, next) => {
  try {
    // console.log(req.headers) // 获取请求头
    // res.send('get /user')
    res.status(200).json(BaseRes.success(req.user))
  } catch (error) {
    next(error)
  }
}

// 更新当前登录用户
exports.updateCurrentUser = async (req, res, next) => {
  try {
    const newInfo = await User.findOneAndUpdate({ email: req.user.email }, req.body)
    res.status(200).json(BaseRes.success(newInfo))
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

exports.signIn = async (req, res, next) => {
  try {
    // 历史记录
    const recordList = await SignIn.find({
      createdBy: req.user.toJSON().email
    })
    // 当前分数
    const currentScore = await User.findOne({ email: req.user.toJSON().email })
    await User.findOneAndUpdate({ email: req.user.toJSON().email }, {
      $set: {
        lastSignIn: new Date()
      }
    })
    // 当前记录
    let record = {
      createdBy: req.user.toJSON().email
    }
    if (recordList.length === 0) {
      // 无签到记录
      record.current = 1
    } else {
      const last = recordList.sort((a, b) => b.createdAt - a.createdAt)[0]
      if (moment(last.createdAt).isSame(new Date(), 'day')) {
        // 最近一次签到是今天
        res.status(200).json(BaseRes.success('今日已签到'))
        return
      } else if (moment(last.createdAt).isSame(moment(new Date()).subtract(1, 'days'), 'day')) {
        // 最近一次签到是昨天
        record.current = last.current + 1
      } else {
        record.current = 1
      }
    }
    await User.findOneAndUpdate(
      { email: req.user.toJSON().email },
      { $set: { score:  req.user.toJSON().score + 5 * record.current } }
    )
    let recordSave = new SignIn(record)
    await recordSave.save()
    res.status(201).json(
      BaseRes.success({
        current: recordSave.current,
        score: req.user.toJSON().score + 5 * record.current
      }))
  } catch (error) {
    next(error)
  }
}

exports.getSignInList = async (req, res, next) => {
  try {
    const signInList = await SignIn.find({
      createdBy: req.user.toJSON().email
    })
    signInList.sort((a, b) => b.createdAt - a.createdAt)
    res.status(200).json(BaseRes.success(signInList))
  } catch (error) {
    next(error)
  }
}
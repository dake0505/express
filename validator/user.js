const validate = require('../middleware/validate')
const { body } = require('express-validator')
const { User } = require('../model')
const md5 = require('../util/md5')

exports.register = validate([
  body('username').notEmpty().withMessage('用户名不能未空'),
  body('password').notEmpty(),
  body('email')
    .notEmpty()
    .bail()
    .custom(async email => {
      const user = await User.findOne({ email })
      if (user) {
        return Promise.reject('邮箱已存在')
      }
    })
])

exports.login = [
  // 创建中间件数组，第一个中间件判断数据不为空，第二个中间件去查询数据库
  validate([
    body('email')
      .notEmpty()
      .withMessage('邮箱不能为空'),
    body('password')
      .notEmpty()
      .withMessage('密码不能为空')
  ]),
  validate([
    body('email')
    // 将中间件的req对象解构添加到验证函数中
      .custom(async (email, { req }) => {
        // password在model中select定义为false，此处手动添加可查询
        const user = await User.findOne({ email })
          .select(['password', 'username', 'email', 'bio', 'score', 'lastSignIn', 'address'])
        if (!user) {
          return Promise.reject('用户不存在')
        }
        // 若查询user成功，则将user添加到请求对象上，后续中间件也可以使用
        req.user = user
      })
  ]),
  validate([
    body('password')
      .custom(async (password, { req }) => {
        if (md5(password) !== req.user.password) {
          return Promise.reject('密码错误')
        }
      })
  ])
]
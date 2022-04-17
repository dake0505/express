const jwt = require('jsonwebtoken')
const { promisify } = require('util')

exports.sign = promisify(jwt.sign)
exports.verify = promisify(jwt.verify)
exports.decode = promisify(jwt.decode)

// 生成jwt jwt.sign(payload, secretOrPrivateKey, [options, callback])
// jwt.sign(
//   {},
//   '',
//   (err, token) => {
//     if (err) {
//       return console.log('token 生成失败')
//     }
//     return token
//   }
// )

// 验证jwt jwt.verify(token, secretOrPublicKey, [options, callback])
// jwt.verify(
//   '',
//   '',
//   (err, res) => {
//     if (err) {
//       return console.log('token 认证失败')
//     }
//     return res
//   } 
// )
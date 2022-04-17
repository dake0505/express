const crypto = require('crypto')

// console.log(crypto.getHashes())

// crypto.createHash('md5')
//   .update('hello')
//   .digest('hex') // 转化为十进制

module.exports = str => {
  return crypto.createHash('md5')
    .update(str)
    .digest('hex')
}
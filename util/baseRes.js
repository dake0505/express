const baseCode = require('./baseCode')
class BaseRes {
  constructor (code, msg, data) {
    this.code = code
    this.msg = msg
    this.data = data
  }

  static success (data) {
    return new BaseRes(
      baseCode.SUCCESS.code,
      baseCode.SUCCESS.desc,
      data
    )
  }

  static fail (data) {
    return new BaseRes(
      baseCode.FAILED.code,
      baseCode.FAILED.desc,
      data
    )
  }
}

module.exports = BaseRes
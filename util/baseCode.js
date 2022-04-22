class BaseCode {
  constructor (code, desc) {
    this.code = code
    this.desc = desc
  }

  static SUCCESS = new BaseCode(200, '成功')
  static FAILED = new BaseCode(500, '失败')
  static VALIDATE_FAILED = new BaseCode(400, '参数校验失败')
  static APT_NODE_FOUND = new BaseCode(404, '接口不存在')
}

module.exports = BaseCode
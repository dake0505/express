const { validationResult, buildCheckFunction } = require("express-validator");
const { isValidObjectId } = require('mongoose')
// can be reused by many routes

// parallel processing
exports = module.exports = validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};
/**
 * 封装请求参数验证
 * @param location 字段位置 body/params/query
 * @param fields 字段名称
 */
exports.isValidObjectId = (location, fields) => {
  return buildCheckFunction(location)(fields).custom(async value => {
    if (!isValidObjectId(value)) {
      return Promise.reject('ID无效')
    }
  })
}

const { Resource, User } = require('../model')

exports.getResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.resourceId).populate('author')
    if (!resource) {
      return res.status(404).end()
    }
    res.status(200).json({
      resource
    })
  } catch (error) {
    next(error)
  }
}
/**
 * 查询资源列表
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getResourceList = async (req, res, next) => {
  try {
    // 分页
    const { limit = 20, offset = 0, tag, author } = req.query
    // 查询tag
    const filter = {}
    if (tag) {
      filter.tagList = tag
    }
    // 查询author
    if (author) {
      const user = await  User.findOne({ username: author })
      filter.author = user ? user._id : null
    }
    const resourceList = await Resource
      // 过滤条件
      .find(filter)
      // 跳过多少条
      .skip(offset)
      // 取多少条
      .limit(limit)
      // 排序
      .sort({
        createdAt: -1
      })
    const count = await Resource.countDocuments()
    res.status(200).json({
      resourceList,
      count
    })
  } catch (error) {
    next(error)
  }
}

exports.createResource = async (req, res, next) => {
  try {
    const resource = new Resource(req.body)
    // 身份认证中间件添加的user信息
    resource.author = req.user._id
    // Mongoose中的填充查询（populate）类似关系型数据库中的“连接查询”
    // 通过populate()函数，使你可以在一个文档中引用另一个集合中的文档，并将其填充到指定文档路径中。
    resource.populate('author')
    await resource.save()
    res.status(201).json({
      resource
    })
  } catch (error) {
    next(error)
  }
}

exports.updateResource = async (req, res, next) => {
  try {
    // res.send('update resource')
    const resource = req.resource
    const bodyResource = req.body.resource
    resource.title = bodyResource.title || resource.title
    resource.description = bodyResource.description || resource.description
    resource.body = bodyResource.body || resource.body
    await resource.save()
    res.status(201).json({
      resource
    })
  } catch (error) {
    next(error)
  }
}

exports.deleteResource = async (req, res, next) => {
  try {
    // res.send('delete resource')
    const resource = req.resource
    await resource.remove()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
const express = require('express')
const resourceCtrl = require('../controller/resource')
const auth = require('../middleware/auth')
const resourceValidator = require('../validator/resource')

const router = express.Router()

router.get(
  '/resource/:resourceId',
  auth,
  resourceValidator.getResource,
  resourceCtrl.getResource
)

router.get(
  '/resource-list',
  auth,
  resourceCtrl.getResourceList
)

router.post(
  '/resource',
  auth,
  resourceValidator.createResource,
  resourceCtrl.createResource
)

router.put(
  '/resource/:resourceId',
  auth,
  resourceValidator.updateResource,
  resourceCtrl.updateResource
)

router.delete(
  '/resource/:resourceId',
  auth,
  resourceValidator.deleteResource,
  resourceCtrl.deleteResource
)

module.exports = router
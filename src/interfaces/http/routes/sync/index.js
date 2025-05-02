const express = require('express');
const { syncController: controller } = require('#root/src/interfaces/http/controllers/index.js');
const { validationHandler } = require('../../middlewares/requests');
const { inventoryArrayValidationSchema } = require('#root/src/shared/validations/inventory.validation.js');
const router = express.Router();

router.post('/', [validationHandler(inventoryArrayValidationSchema, 'body')], controller.syncOfflineData);
module.exports = router;

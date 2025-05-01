const express = require('express');
const {inventoryController: controller} = require('#root/src/interfaces/http/controllers/index.js');
const { validationHandler } = require('../../middlewares/requests');
const { inventoryValidationSchema, updateInventoryValidationSchema, getInventoryValidationSchema, getInventoryByIdValidationSchema, getInventoryByNameValidationSchema, deleteInventoryValidationSchema } = require('#root/src/shared/validations/inventory.validation.js');
// const controller = require('../controllers/inventoryController');
const router = express.Router();

router.post('/', [validationHandler(inventoryValidationSchema, 'body')], controller.createItem);
router.put('/:id', [validationHandler(updateInventoryValidationSchema, 'body')], controller.updateItem);
router.get('/', [validationHandler(getInventoryValidationSchema, 'body')], controller.getAllItems);
router.get('/:id', [validationHandler(getInventoryByIdValidationSchema, 'param')], controller.getItemById);
router.get('/name/:name', [validationHandler(getInventoryByNameValidationSchema, 'query')], controller.getItemByName);
router.delete('/:id', [validationHandler(deleteInventoryValidationSchema, 'param')], controller.deleteItem);

module.exports = router;

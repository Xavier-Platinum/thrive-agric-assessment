const express = require('express');
const controller = require('#root/src/interfaces/http/controllers/inventory/index.js');
// const controller = require('../controllers/inventoryController');
const router = express.Router();

router.post('/', controller.createItem);
router.put('/:id', controller.updateItem);
router.get('/', controller.getAllItems);
router.get('/:id', controller.getItemById);
router.get('/name/:name', controller.getItemByName);
router.delete('/:id', controller.deleteItem);

module.exports = router;

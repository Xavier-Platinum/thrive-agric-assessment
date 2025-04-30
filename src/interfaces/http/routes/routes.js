const express = require('express');
const router = express.Router();
const inventoryRoutes = require('./inventory');
const warehouseRoutes = require('./warehouse');

router.use('/inventory', inventoryRoutes);
router.use('/warehouses', warehouseRoutes);

module.exports = router;

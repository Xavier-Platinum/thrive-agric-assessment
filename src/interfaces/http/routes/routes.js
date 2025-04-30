const express = require('express');
const router = express.Router();
const inventoryRoutes = require('./inventory');
const warehouseRoutes = require('./warehouse');
const syncRoutes = require('./sync');
const aiRoutes = require('./ai');

router.use('/inventory', inventoryRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/sync', syncRoutes);
router.use('/ai', aiRoutes);

module.exports = router;

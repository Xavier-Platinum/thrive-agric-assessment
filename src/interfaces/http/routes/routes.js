const express = require('express');
const router = express.Router();
const inventoryRoutes = require('./inventory');
const warehouseRoutes = require('./warehouse');
const syncRoutes = require('./sync');
const aiRoutes = require('./ai');
const wehbookRoutes = require('./webhook');

router.use('/inventory', inventoryRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/sync', syncRoutes);
router.use('/ai', aiRoutes);
router.use('/webhook', wehbookRoutes);

module.exports = router;

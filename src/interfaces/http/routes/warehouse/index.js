const express = require("express");
const { warehouseController: controller } = require('#root/src/interfaces/http/controllers/index.js');
const router = express.Router();

router.post("/", controller.createWarehouse);
router.put("/:id", controller.updateWarehouse);
router.get("/", controller.getAllWarehouses);
router.get("/:id", controller.getWarehouseById);
router.get("/name/:name", controller.getWarehouseByName);
router.delete("/:id", controller.deleteWarehouse);

module.exports = router;

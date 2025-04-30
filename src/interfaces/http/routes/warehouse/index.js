const express = require("express");
const controller = require("#root/src/interfaces/http/controllers/warehouse/index.js");
const router = express.Router();

router.post("/", controller.createWarehouse);
router.put("/:id", controller.updateWarehouse);
router.get("/", controller.getAllWarehouses);
router.get("/:id", controller.getWarehouseById);
router.get("/name/:name", controller.getWarehouseByName);
router.delete("/:id", controller.deleteWarehouse);

module.exports = router;
// Which is better starting the cluster in the main file or in the cluster file? and which processes are best for primary cluster is db or server itself? and which is best for worker process?
const express = require("express");
const { warehouseController: controller } = require('#root/src/interfaces/http/controllers/index.js');
const { validationHandler } = require("../../middlewares/requests");
const { warehouseValidationSchema, warehouseUpdateValidationSchema, warehouseGetAllValidationSchema, warehouseGetByIdValidationSchema, warehouseGetByNameValidationSchema, warehouseDeleteValidationSchema } = require("#root/src/shared/validations/warehouse.validation.js");
const router = express.Router();

router.post("/", [validationHandler(warehouseValidationSchema, 'body')], controller.createWarehouse);
router.put("/:id", [validationHandler(warehouseUpdateValidationSchema, 'body')], controller.updateWarehouse);
router.get("/", [validationHandler(warehouseGetAllValidationSchema, 'body')], controller.getAllWarehouses);
router.get("/:id", [validationHandler(warehouseGetByIdValidationSchema, 'param')], controller.getWarehouseById);
router.get("/name/:name", [validationHandler(warehouseGetByNameValidationSchema, 'query')], controller.getWarehouseByName);
router.delete("/:id", [validationHandler(warehouseDeleteValidationSchema, 'param')], controller.deleteWarehouse);

module.exports = router;

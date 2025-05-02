const service = require('#root/src/domain/inventory/service.js');
const AppError = require('#root/src/shared/constants/errors/AppError.js');
const { formatResponse } = require('#root/src/shared/utils/http/response.js');
// const Inventory = require('../../../domains/inventory/model');
// const inventoryEvents = require('../../../infrastructure/events/inventory');

exports.createItem = async (req, res, next) => {
  try {
    const item = await service.createInventory(req.body);

    return res.status(201).json(formatResponse({
      success: true,
      statusCode: 201,
      data: item,
      message: 'Inventory Item created successfully',
    }));
  } catch (error) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    // check if item exists
    const itemExists = await service.getInventoryById(req.params.id);

    if (!itemExists) {
      return res.status(404).json(formatResponse({
        success: false,
        statusCode: 404,
        message: 'Inventory Item not found',
      }));
    }

    const item = await service.updateInventory(req.params.id, req.body, { new: true });

    return res.json(formatResponse({
      success: true,
      statusCode: 200,
      data: item,
      message: 'Inventory Item updated successfully',
    }));
  } catch (error) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
};

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await service.getAllInventory(req.query);

    if (!items || items.length === 0) {
      return res.status(404).json(formatResponse({
        success: false,
        statusCode: 404,
        message: 'No inventory items found',
      }));
    }

    return res.json(formatResponse({
      success: true,
      statusCode: 200,
      data: items,
      message: 'Inventory Items retrieved successfully',
    }));
  } catch (error) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
};

exports.getItemById = async (req, res, next) => {
  try {
    const item = await service.getInventoryById(req.params.id);

    if (!item) {
      return res.status(404).json(formatResponse({
        success: false,
        statusCode: 404,
        message: 'Inventory Item not found',
      }));
    }
    res.json(formatResponse({
      success: true,
      statusCode: 200,
      data: item,
      message: 'Inventory Item retrieved successfully',
    }));
  } catch (error) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}

exports.getItemByName = async (req, res, next) => {
  try {
    const item = await service.getInventoryByName(req.params.name);
    if (!item) {
      return res.status(404).json(formatResponse({
        success: false,
        statusCode: 404,
        message: 'Inventory Item not found',
      }));
    }
    res.json(formatResponse({
      success: true,
      statusCode: 200,
      data: item,
      message: 'Inventory Item retrieved successfully',
    }));
  } catch (error) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
};

exports.deleteItem = async (req, res) => {
  try {
    // check if item exists
    const itemExists = await service.getInventoryById(req.params.id);

    if (!itemExists) {
      return res.status(404).json(formatResponse({
        success: false,
        statusCode: 404,
        message: 'Inventory Item not found',
      }));
    }

    const item = await service.deleteInventoryById(req.params.id);

    if (!item) {
      return res.status(404).json(formatResponse({
        success: false,
        statusCode: 404,
        message: 'Inventory Item not found',
      }));
    }

    return res.json(formatResponse({
      success: true,
      statusCode: 200,
      data: item,
      message: 'Inventory Item deleted successfully',
    }));
  } catch (error) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
};

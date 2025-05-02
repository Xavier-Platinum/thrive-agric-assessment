const service = require("#root/src/domain/warehouse/service.js");
const AppError = require("#root/src/shared/constants/errors/AppError.js");
const { formatResponse } = require("#root/src/shared/utils/http/response.js");

exports.createWarehouse = async (req, res, next) => {
    try {
        const warehouse = await service.create(req.body);

        return res.status(201).json(formatResponse({
            success: true,
            statusCode: 201,
            data: warehouse,
            message: 'Warehouse created successfully',
        }));
    } catch (error) {
        next(error instanceof AppError ? error : new AppError(error.message, 500));
    }
}

exports.updateWarehouse = async (req, res, next) => {
    try {
        const warehouse = await service.update(req.params.id, req.body);

        if (!warehouse) {
            return res.status(404).json(formatResponse({
                success: false,
                statusCode: 404,
                message: 'Warehouse not found',
            }));
        }

        return res.json(formatResponse({
            success: true,
            statusCode: 200,
            data: warehouse,
            message: 'Warehouse updated successfully',
        }));
    } catch (error) {
        next(error instanceof AppError ? error : new AppError(error.message, 500));
    }
};

exports.getAllWarehouses = async (req, res, next) => {
    try {
        const warehouses = await service.getAll(req.query);

        if (!warehouses || warehouses.length === 0) {
            return res.status(404).json(formatResponse({
                success: false,
                statusCode: 404,
                message: 'No warehouses found',
            }));
        }
        return res.json(formatResponse({
            success: true,
            statusCode: 200,
            data: warehouses,
            message: 'Warehouses retrieved successfully',
        }));
    } catch (error) {
        next(error instanceof AppError ? error : new AppError(error.message, 500));
    }
};

exports.getWarehouseById = async (req, res, next) => {
    try {
        const warehouse = await service.getById(req.params.id);
        if (!warehouse) {
            return res.status(404).json(formatResponse({
                success: false,
                statusCode: 404,
                message: 'Warehouse not found',
            }));
        }
        return res.json(formatResponse({
            success: true,
            statusCode: 200,
            data: warehouse,
            message: 'Warehouse retrieved successfully',
        }));
    } catch (error) {
        next(error instanceof AppError ? error : new AppError(error.message, 500));
    }
}

exports.getWarehouseByName = async (req, res, next) => {
    try {
        const warehouse = await service.getByName(req.params.name);

        if (!warehouse) {
            return res.status(404).json(formatResponse({
                success: false,
                statusCode: 404,
                message: 'Warehouse not found',
            }));
        }

        return res.json(formatResponse({
            success: true,
            statusCode: 200,
            data: warehouse,
            message: 'Warehouse retrieved successfully',
        }));
    } catch (error) {
        next(error instanceof AppError ? error : new AppError(error.message, 500));
    }
};

exports.deleteWarehouse = async (req, res, next) => {
    try {
        // Check if the warehouse exists
        const warehouseExists = await service.getById(req.params.id);

        if (!warehouseExists) {
            return res.status(404).json(formatResponse({
                success: false,
                statusCode: 404,
                message: 'Warehouse not found',
            }));
        }

        const warehouse = await service.getById(req.params.id);

        if (!warehouse) {
            return res.status(404).json(formatResponse({
                success: false,
                statusCode: 404,
                message: 'Warehouse not found',
            }));
        }

        await service.deleteById(req.params.id);

        return res.status(204).json(formatResponse({
            success: true,
            statusCode: 204,
            message: 'Warehouse deleted successfully',
        }));
    } catch (error) {
        next(error instanceof AppError ? error : new AppError(error.message, 500));
    }
};

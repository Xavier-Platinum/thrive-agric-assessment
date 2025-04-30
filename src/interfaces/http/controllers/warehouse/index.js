const service = require("#root/src/domain/warehouse/service.js");

exports.createWarehouse = async (req, res) => {
    const warehouse = await service.create(req.body);
    res.status(201).json(warehouse);
}

exports.updateWarehouse = async (req, res) => {
    const warehouse = await service.update(req.params.id, req.body);
    res.json(warehouse);
};

exports.getAllWarehouses = async (req, res) => {
    const warehouses = await service.getAll(req.query);
    res.json(warehouses);
};

exports.getWarehouseById = async (req, res) => {
    const warehouse = await service.getById(req.params.id);
    if (!warehouse) {
        return res.status(404).json({ message: 'Warehouse not found' });
    }
    res.json(warehouse);
}

exports.getWarehouseByName = async (req, res) => {
    const warehouse = await service.getByName(req.params.name);
    if (!warehouse) {
        return res.status(404).json({ message: 'Warehouse not found' });
    }
    res.json(warehouse);
};

exports.deleteWarehouse = async (req, res) => {
    const warehouse = await service.getById(req.params.id);
    if (!warehouse) {
        return res.status(404).json({ message: 'Warehouse not found' });
    }
    await service.deleteById(req.params.id);
    res.status(204).send();
};

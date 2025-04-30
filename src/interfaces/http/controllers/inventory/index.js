const service = require('#root/src/domain/inventory/service.js');
// const Inventory = require('../../../domains/inventory/model');
// const inventoryEvents = require('../../../infrastructure/events/inventory');

exports.createItem = async (req, res) => {
  const item = await service.createInventory(req.body);
//   inventoryEvents.emit('stock_in', item);
  res.status(201).json(item);
};

exports.updateItem = async (req, res) => {
  const item = await service.updateInventory(req.params.id, req.body, { new: true });
  res.json(item);
};

exports.getAllItems = async (req, res) => {
  const items = await service.getAllInventory(req.query);
  res.json(items);
};

exports.getItemById = async (req, res) => {
  const item = await service.getInventoryById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
}

exports.getItemByName = async (req, res) => {
  const item = await service.getInventoryByName(req.params.name);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  const item = await service.deleteInventoryById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  await item.remove();
  res.status(204).send();
};

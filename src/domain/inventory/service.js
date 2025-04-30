const repository = require('./repository');
// const { emitInventoryEvent } = require('../../infrastructure/events/inventoryEvents');
const eventEmitter = require('#root/src/infrastructure/events/inventory.js');

module.exports = {
    /**
     * Create a new inventory item
     * @param {Object} data - Data for the new inventory item
     * @returns 
     */
    async createInventory(data) {
        const item = await repository.create(data);
        eventEmitter.emit('stock_in', item);
        return item;
    },

    /**
     * Update inventory item by ID
     * @param {string} id - ID of the inventory item to update
     * @param {Object} data - Data to update the inventory item with
     * @returns 
     */
    async updateInventory(id, data) {
        const item = await repository.update(id, data);
        eventEmitter.emit('stock_out', item);
        return item;
    },

    /**
     * Get all items with optional search, filter, pagination, and sorting
     * @param {*} payload 
     * @param {string} payload.search - Search term for filtering by name
     * @param {Object} payload.filter - Additional filters for the query
     * @param {number} payload.page - Page number for pagination
     * @param {number} payload.limit - Number of items per page
     * @param {Object} payload.sort - Sorting options { field: string, order: string }
     * @returns 
     */
    async getAllInventory(payload) {
        return await repository.getAll(payload);
    },

    /**
     * Get item by name
     * @param {string} name - Name of the item to search for
     * @returns 
     */
    async getInventoryByName(name) {
        return await repository.findByName(name);
    },

    /**
     * Get item by ID
     * @param {string} id - ID of the item to retrieve
     * @returns 
     */
    async getInventoryById(id) {
        return await repository.findById(id);
    },

    /**
     * Delete item by ID
     * @param {string} id - ID of the item to delete
     * @returns 
     */
    async deleteInventoryById(id) {
        const item = await repository.deleteById(id);
        if (!item) {
            return null;
        }
        await item.remove();
        return item;
    }
};

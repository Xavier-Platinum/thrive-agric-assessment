const repository = require('./repository');
// const eventEmitter = require('#root/src/infrastructure/events/.js');

module.exports = {
    /**
     * Create a new warehouse
     * @param {Object} data - Data for the new warehouse
     * @returns 
     */
    async create(data) {
        const item = await repository.create(data);
        return item;
    },

    /**
     * Update warehouse by ID
     * @param {string} id - ID of the warehouse to update
     * @param {Object} data - Data to update the warehouse with
     * @returns 
     */
    async update(id, data) {
        const item = await repository.update(id, data);
        return item;
    },

    /**
     * Get all warehouses with optional search, filter, pagination, and sorting
     * @param {*} payload 
     * @param {string} payload.search - Search term for filtering by name
     * @param {Object} payload.filter - Additional filters for the query
     * @param {number} payload.page - Page number for pagination
     * @param {number} payload.limit - Number of items per page
     * @param {Object} payload.sort - Sorting options { field: string, order: string }
     * @returns 
     */
    async getAll(payload) {
        return await repository.getAll(payload);
    },

    /**
     * Get warehouse by name
     * @param {string} name - Name of the warehouse to search for
     * @returns 
     */
    async getByName(name) {
        return await repository.findByName(name);
    },

    /**
     * Get warehouse by ID
     * @param {string} id - ID of the warehouse to retrieve
     * @returns 
     */
    async getById(id) {
        return await repository.findById(id);
    },

    /**
     * Delete warehouse by ID
     * @param {string} id - ID of the warehouse to delete
     * @returns 
     */
    async deleteById(id) {
        const item = await repository.deleteById(id);
        if (!item) {
            return null;
        }
        await item.remove();
        return item;
    }
};

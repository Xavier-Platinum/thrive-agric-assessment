const AppError = require('#root/src/shared/constants/errors/AppError.js');
const model = require('./model');

module.exports = {
    /**
     * Create a new warehouse
     * @param {Object} data - Data for the new warehouse
     * @returns 
     */
    async create(data) {
        try {
            return await model.create(data);
        } catch (error) {
            if (error.code === 11000) {
                throw new AppError('Duplicate warehouse name', 400);
            }
            throw error;
        }
    },

    /**
     * Update warehouse by ID
     * @param {string} id - ID of the warehouse to update
     * @param {Object} data - Data to update the warehouse with
     * @returns 
     */
    async update(id, data) {
        try {
            return await model.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            if (error.code === 11000) {
                throw new AppError('Duplicate warehouse name', 400);
            }
            throw error;
        }
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
    async getAll({ search = '', filter = {}, page = 1, limit = 10, sort = {} }) {
        try {
            const query = {
                ...filter,
                name: { $regex: search, $options: 'i' } // Case-insensitive search by name
            };
    
            const options = {
                skip: (page - 1) * limit,
                limit: parseInt(limit, 10),
                sort
            };
    
            const results = await model.find(query, null, options).populate('inventory');
            const total = await model.countDocuments(query);
    
            return {
                results,
                total,
                page,
                pages: Math.ceil(total / limit)
            };
        } catch (error) {
            if (error.code === 11000) {
                throw new AppError('Duplicate inventory name', 400);
            }
            throw error;
        }
    },

    /**
     * Get warehouse by name
     * @param {string} name - Name of the warehouse to search for
     * @returns 
     */
    async findByName(name) {
        try {
            return await model.findOne({ name }).populate('inventory');
        } catch (error) {
            if (error.code === 11000) {
                throw new AppError('Duplicate inventory name', 400);
            }
            throw error;
        }
    },

    /**
     * Get warehouse by ID
     * @param {string} id - ID of the warehouse to retrieve
     * @returns 
     */
    async findById(id) {
        try {
            return await model.findById(id).populate('inventory');
        } catch (error) {
            if (error.code === 11000) {
                throw new AppError('Duplicate inventory name', 400);
            }
            throw error;
        }
    },

    /**
     * Delete warehouse by ID
     * @param {string} id - ID of the warehouse to delete
     * @returns 
     */
    async deleteById(id) {
        try {
            return await model.findByIdAndDelete(id);
        } catch (error) {
            if (error.code === 11000) {
                throw new AppError('Duplicate inventory name', 400);
            }
            throw error;
        }
    }
};

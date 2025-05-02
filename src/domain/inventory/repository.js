const AppError = require('#root/src/shared/constants/errors/AppError.js');
const model = require('./model');

module.exports = {
  /**
   * 
   * @param {*} data - 
   * @returns 
   */
  async create(data) {
    try {
      return await model.create(data);
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError('Duplicate inventory name', 400);
      }
      throw error;
    }
  },

  /**
   * 
   * @param {*} id - 
   * @param {*} data - 
   * @returns 
   */
  async update(id, data) {
    try {
      return await model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError('Duplicate inventory name', 400);
      }
      throw error;
    }
  },

  /**
   * 
   * @param {*} payload 
    * @param {string} payload.search - Search term for filtering by name
    * @param {Object} payload.filter - Additional filters for the query
    * @param {number} payload.page - Page number for pagination
    * @param {number} payload.limit - Number of items per page
    * @param {Object} payload.sort - Sorting options
    * @param {string} payload.sort.field - Field to sort by
    * @param {string} payload.sort.order - Order of sorting ('asc' or 'desc')
    // * @param {string} param0.sort.type - Type of sorting ('string', 'number', etc.)
    // * @param {string} param0.sort.value - Value to sort by
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
  
      const results = await model.find(query, null, options).populate('warehouseId');
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
   * 
   * @param {*} name - 
   * @returns 
   */
  async findByName(name) {
    try {
      return await model.findOne({ name }).populate('warehouseId');
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError('Duplicate inventory name', 400);
      }
      throw error;
    }
  },

  /**
   * 
   * @param {*} id - 
   * @returns 
   */
  async findById(id) {
    try {
      return await model.findById(id).populate('warehouseId');
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError('Duplicate inventory name', 400);
      }
      throw error;
    }
  },

  /**
   * 
   * @param {*} id 
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
  },

  /**
   * 
   * @param {*} query - 
   * @returns 
   */
  async findOne(query = {}, projection = null, options = {}) {
    try {
      console.log('Query:', query);
      console.log('Projection:', projection);
      console.log('Options:', options);
      let queryBuilder = model.findOne(query, projection, options);

      // Optional population logic
      if (options.populate) {
        queryBuilder = queryBuilder.populate(options.populate);
      } else {
        queryBuilder = queryBuilder.populate('warehouseId');
      }

      const data = await queryBuilder.lean();

      console.log('Data:>>>>>>', data);

      if (!data) return null;

      return data;
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError('Duplicate inventory name', 400);
      }
      throw new AppError(error.message || 'Internal Server Error', 500);
    }
  },

  /**
   * 
   * @param {*} condition - 
   * @returns 
   */
  async findManyOr(condition = {}) {
    try {
      return await model.find(condition).lean();
    } catch (error) {
      throw new AppError(error.message || 'Failed to fetch inventories', 500);
    }
  },

  /**
   * 
   * @param {*} condition - 
   * @returns 
   */
  async bulkWrite(operations = []) {
    if (!operations.length) return [];
    try {
      return await model.bulkWrite(operations);
    } catch (error) {
      throw new AppError(error.message || 'Bulk sync operation failed', 500);
    }
  }
};

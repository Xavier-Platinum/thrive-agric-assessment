const model = require('./model');

module.exports = {
  /**
   * 
   * @param {*} data - 
   * @returns 
   */
  async create(data) {
    return await model.create(data);
  },

  /**
   * 
   * @param {*} id - 
   * @param {*} data - 
   * @returns 
   */
  async update(id, data) {
    return await model.findByIdAndUpdate(id, data, { new: true });
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
  },

  /**
   * 
   * @param {*} name - 
   * @returns 
   */
  async findByName(name) {
    return await model.findOne({ name }).populate('warehouseId');
  },

  /**
   * 
   * @param {*} id - 
   * @returns 
   */
  async findById(id) {
    return await model.findById(id).populate('warehouseId');
  },

  /**
   * 
   * @param {*} id 
   * @returns 
   */
  async deleteById(id) {
    return await model.findByIdAndDelete(id);
  },

  /**
   * 
   * @param {*} query - 
   * @returns 
   */
  async findOne(query) {
    return await model
      .findOne(query)
      .populate('warehouseId');
  },
};

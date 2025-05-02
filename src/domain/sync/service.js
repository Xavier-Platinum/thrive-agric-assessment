const inventoryRepo = require('#root/src/domain/inventory/repository.js');
const AppError = require('#root/src/shared/constants/errors/AppError.js');
const normalize = str => str.trim().toLowerCase();

module.exports = {
    /**
    * Sync offline inventory data with existing records/create new records for notexisting records.
    * @param {Array<Object>} data - Array of inventory items to sync
    * @returns {Promise<Array<Object>>}
    */
    async syncOfflineData(data) {
        try {
            if (!Array.isArray(data) || data.length === 0) {
                throw new AppError('No data provided for sync', 400);
            }

            const results = [];
            const entriesByName = new Map();

            // name + warehouseId group
            for (const entry of data) {
                if (!entry?.name || !entry?.warehouseId || typeof entry.quantity !== 'number') {
                    Logger.warn('Invalid entry skipped:', entry);
                    continue;
                }

                const key = `${entry.name}_${entry.warehouseId}`;
                if (!entriesByName.has(key)) {
                    entriesByName.set(key, { ...entry, quantity: 0 });
                }
                entriesByName.get(key).quantity += entry.quantity;
            }

            const keys = Array.from(entriesByName.keys());
            const queryFilters = keys.map(key => {
                const [name, warehouseId] = key.split('_');
                return { name, warehouseId };
            });

            // Build a batch query to fetch all existing records
            const existingRecords = await inventoryRepo.findManyOr({ $or: queryFilters });
            const existingMap = new Map(
                existingRecords.map(record => [`${record.name}_${record.warehouseId}`, record])
            );

            const bulkOps = [];

            for (const [key, entry] of entriesByName.entries()) {
                if (existingMap.has(key)) {
                    // Prepare bulk update
                    bulkOps.push({
                        updateOne: {
                            filter: { _id: existingMap.get(key)._id },
                            update: { $inc: { quantity: entry.quantity } }
                        }
                    });
                } else {
                    // Prepare bulk insert
                    bulkOps.push({
                        insertOne: {
                            document: entry
                        }
                    });
                }
            }

            // Execute bulk operation atomically
            const bulkResult = await inventoryRepo.bulkWrite(bulkOps);

            // Return updated and inserted documents
            const updatedData = await inventoryRepo.findManyOr({ $or: queryFilters });
            return updatedData;
        } catch (error) {
            throw new AppError(error.message || 'Sync operations failed', 500);
        }
    }
};

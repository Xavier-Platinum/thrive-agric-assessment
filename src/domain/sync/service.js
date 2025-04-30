const inventoryRepo = require('#root/src/domain/inventory/repository.js');
const normalize = str => str.trim().toLowerCase();

module.exports = {
    async syncOfflineData(data) {
        const results = [];
        const entriesByName = new Map();

        // Group offline data by name for batch processing
        for (const entry of data.offlineData) {
            if (!entriesByName.has(entry.name)) {
                entriesByName.set(entry.name, { ...entry, quantity: 0 });
            }
            entriesByName.get(entry.name).quantity += entry.quantity;
        }

        const names = Array.from(entriesByName.keys());
        const existingRecords = await Promise.all(names.map(name => inventoryRepo.findOne({ name: name, warehouseId: entriesByName.get(name)?.warehouseId })));

        const existingMap = new Map(existingRecords.map(record => [record.name, record]));

        for (const [name, entry] of entriesByName) {
            if (existingMap.has(name)) {
                const existing = existingMap.get(name);
                existing.quantity += entry.quantity;
                await existing.save();
                results.push(existing);
            } else {
                const created = await inventoryRepo.create(entry);
                results.push(created);
            }
        }

        return results;
    }
};

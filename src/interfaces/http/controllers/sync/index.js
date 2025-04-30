const service = require('#root/src/domain/sync/service.js');

exports.syncOfflineData = async (req, res) => {
  try {
    const data = req.body;
    const results = await service.syncOfflineData(data);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

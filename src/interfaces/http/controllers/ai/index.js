const service = require("#root/src/domain/ai/service.js");

// suggest name
exports.suggestName = async (req, res) => {
  try {
    const input = req.body.input;
    const suggestion = await service.suggestName(input);
    res.status(200).json({ suggestion });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

// explain item
exports.explainItem = async (req, res) => {
  try {
    const itemName = req.body.itemName;
    const explanation = await service.explainItem(itemName);
    res.status(200).json({ explanation });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

const express = require('express');
const {aiController} = require('#root/src/interfaces/http/controllers/index.js');
const router = express.Router();

router.post('/suggest', aiController.suggestName);
router.post('/explain', aiController.explainItem);

module.exports = router;

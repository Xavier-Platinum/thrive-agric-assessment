const express = require('express');
const { syncController: controller } = require('#root/src/interfaces/http/controllers/index.js');
const router = express.Router();

router.post('/', controller.syncOfflineData);
module.exports = router;

const express = require("express");
const { webhookController: controller } = require('#root/src/interfaces/http/controllers/index.js');
const router = express.Router();

router.get('/stream', controller.webhook);

module.exports = router;
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/ReportController');

router.post('/:boardId', reportController.procReport);

module.exports = router;
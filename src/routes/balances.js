const express = require('express');
const router = express.Router();
const { getUserBalances } = require('../controllers/balanceController');

router.get('/:userId', getUserBalances);

module.exports = router;

const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');
const { authenticateToken } = require('../utils/jwt');

router.post('/transactions',authenticateToken, transactionController.addTransaction);
router.get('/transactions',authenticateToken, transactionController.getAllTransactions);
router.get('/transactions/:transactionid',authenticateToken, transactionController.getTransaction);
router.delete('/transactions/:transactionid',authenticateToken,transactionController.deleteTransaction);

module.exports = router;

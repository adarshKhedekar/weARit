const express = require('express');
const PaymentController = require('../controller/payment');

const router = express.Router();

router.post('/checkout',PaymentController.checkout)
router.post('/:id/paymentverification/', PaymentController.paymentVerification)

module.exports = router

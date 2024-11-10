const express = require("express");
const paymentController = require("../controller/paymentController");
const {authenticateToken}=require("../utils/jwt")

const router = express.Router();

router.post("/payments",authenticateToken,paymentController.addPayment);

router.get("/payments", authenticateToken,paymentController.getAllPayments);

router.get("/payments/:recordnumber", authenticateToken,paymentController.getPaymentByRecord);

router.delete("/payments/:recordnumber",authenticateToken,paymentController.deletePayment);

module.exports = router;

var express = require('express');
const Payment = require('../../models/payment')
const User = require('../../models/user')
var router = express.Router();
const { paymentPost, allPayment, myPayment } = require('../../controller/paymentController')


// @payment POST ROUTE
// ACCESS public
router.post('/make-payments', paymentPost)

// @all-payment GET ROUTE
// ACCESS PRIVATE
router.get("/all-payments", allPayment);

// @payment status by users payID GET ROUTE
//ACCESS PRIVATE
router.get("/my-payments",myPayment)


module.exports = router;

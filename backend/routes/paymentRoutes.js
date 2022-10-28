const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const Router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

Router.route("/payment/process").post(isAuthenticatedUser, processPayment);

Router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = Router;
